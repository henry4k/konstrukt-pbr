#version 120

vec3 CalcSpecularReflection( const in vec3 specularFactor,
                             const in float roughness,
                             const in float NdotL,
                             const in float NdotH,
                             const in float NdotV,
                             const in float VdotH ); // from Specular.frag

vec3 CalcDiffuseReflection( const in vec3 diffuseFactor,
                            const in float roughness,
                            const in float NdotL,
                            const in float NdotV,
                            const in float VdotH ); // from Diffuse.frag

void CalcSphereLight( out vec3 lightDirection,
                      out float NdotL,
                      out float attenuation,
                      const in vec3 normal,
                      const in vec3 reflection,
                      const in vec3 lightPosition,
                      const in float lightRadius,
                      const in float lightRange ); // from SphereLight.frag

vec3 CalcReflectedLight( const in vec3 normal,
                         const in vec3 specularFactor,
                         const in vec3 diffuseFactor,
                         const in float roughness,
                         const in vec3 cameraDirectionTS,
                         const in vec3 lightDirectionTS,
                         const in float NdotL,
                         const in float NdotV );


const int AmbientLightType     = 0;
const int DirectionalLightType = 1;
const int SphereLightType      = 2;
const int TubeLightType        = 3;
const int SpotLightType        = 4;

const int MaxLightCount = 4;


uniform int LightCount;
uniform int   LightType  [MaxLightCount];
uniform vec3  LightValue [MaxLightCount];
uniform float LightRadius[MaxLightCount];
uniform float LightRange [MaxLightCount];


varying vec3 LightPositionTS[MaxLightCount];
varying vec3 CameraDirectionTS;


/**
 * @param specularFactor (or surfaceReflectionFactor)
 * Fraction of incoming light which is reflected by the surface.
 * The opposite is the albedo, which is the fraction that penetrates the
 * surface and diffuses in the material.
 *
 * @param diffuseFactor (or subsurfaceRemissionFactor)
 * Fraction of diffused light, which is not absorbed but leaves the material
 * again.
 *
 * @param roughness
 * Roughness of the microscopic surface features.
 * Affects the scattering of light reflected by the surface.
 * (Penetrating light rays are hardly influenced by this.)
 */
vec3 CalcIlluminance( const in vec3 normal_,
                      const in vec3 specularFactor,
                      const in vec3 diffuseFactor,
                      const in float roughness_ )
{
    vec3 normal = normalize(normal_);
    vec3 cameraDirectionTS = normalize(CameraDirectionTS);
    vec3 reflection = reflect(-cameraDirectionTS, normal);
    float roughness = max(roughness_, 0.02);
    float NdotV = max(0, dot(normal, cameraDirectionTS));

    vec3 outgoingIlluminance = vec3(0);

    for(int i = 0; i < LightCount; i++)
    {
        vec3 lightDirectionTS;
        float NdotL;
        float attenuation;

        if(LightType[i] == SphereLightType)
            CalcSphereLight(lightDirectionTS,
                            NdotL,
                            attenuation,
                            normal,
                            reflection,
                            LightPositionTS[i],
                            LightRadius[i],
                            LightRange[i]);

        if(attenuation > 0)
        {
            outgoingIlluminance += LightValue[i] * attenuation *
                                   CalcReflectedLight(normal,
                                                      specularFactor,
                                                      diffuseFactor,
                                                      roughness,
                                                      cameraDirectionTS,
                                                      lightDirectionTS,
                                                      NdotL,
                                                      NdotV);
        }
    }

    return outgoingIlluminance;
}

vec3 CalcReflectedLight( const in vec3 normal,
                         const in vec3 specularFactor,
                         const in vec3 diffuseFactor,
                         const in float roughness,
                         const in vec3 cameraDirectionTS,
                         const in vec3 lightDirectionTS,
                         const in float NdotL,
                         const in float NdotV )
{
    vec3 halfWayDirectionTS = normalize(cameraDirectionTS + lightDirectionTS);
    float NdotH = max(0, dot(normal, halfWayDirectionTS));
    float VdotH = dot(cameraDirectionTS, halfWayDirectionTS);

    vec3 diffuseReflection = CalcDiffuseReflection(diffuseFactor,
                                                   roughness,
                                                   NdotL,
                                                   NdotV,
                                                   VdotH);

    vec3 specularReflection = CalcSpecularReflection(specularFactor,
                                                     roughness,
                                                     NdotL,
                                                     NdotH,
                                                     NdotV,
                                                     VdotH);

    return diffuseReflection * (1 - specularFactor) +
           specularReflection;
}


const vec3 NonMetallicSpecularFactor = vec3(0.04);
const vec3 MetallicDiffuseFactor     = vec3(0);

uniform float Metallic;
uniform float Roughness;

/**
 * @param color
 * Defines albedo/diffuse color for insulators (non-metals)
 * and reflectivity for conductors (metals).
 *
 * @param metallic
 * 0: diffuse = color, specular = 0.04 (linear)
 * 1: diffuse = 0,     specular = color
 */
vec3 CalcIlluminanceMetallic( const in vec3 normal,
                              const in vec3 color,
                              const in float roughness_,
                              const in float metallic_ )
{
    float roughness = Roughness;
    float metallic = Metallic;

    vec3 specularFactor = mix(NonMetallicSpecularFactor, color, metallic);
    // TODO: f0 = 0.16 reflectance² (1 − metallic) + color metallic
    vec3 diffuseFactor  = mix(    color, MetallicDiffuseFactor, metallic);
    return CalcIlluminance(normal, specularFactor, diffuseFactor, roughness);
}
