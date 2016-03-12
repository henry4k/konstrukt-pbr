#version 120

vec3 CalcSphereLight( const in vec3 normal,
                      const in vec3 cameraDirectionTS );

vec3 CalcSpecularReflection( const in vec3 specularFactor,
                             const in float roughness,
                             const in float NdotL,
                             const in float NdotH,
                             const in float NdotV,
                             const in float VdotH ); // from Specular.frag

varying vec3 CameraDirectionTS;

const vec3 LightColor = vec3(1.0, 1.0, 1.0);


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
vec3 CalcLightContribution( vec3 normal,
                            vec3 specularFactor,
                            vec3 diffuseFactor,
                            float roughness )
{
    normal = normalize(normal);
    vec3 cameraDirectionTS = normalize(CameraDirectionTS);

    vec3 lightDirectionTS = CalcSphereLight(normal, cameraDirectionTS);

    // do the lighting calculation for each fragment.
    float NdotL = max(dot(normal, lightDirectionTS), 0.0);

    if(NdotL > 0.0)
    {
        roughness = max(roughness, 0.02);
        // calculate intermediary values
        vec3 halfWayDirectionTS = normalize(cameraDirectionTS + lightDirectionTS);
        float NdotH = max(0.0, dot(normal, halfWayDirectionTS));
        float NdotV = max(0.0, dot(normal, cameraDirectionTS)); // note: this could also be NdotL, which is the same value
        float VdotH = max(0.0, dot(cameraDirectionTS, halfWayDirectionTS));

        vec3 specularReflection = CalcSpecularReflection(specularFactor,
                                                         roughness,
                                                         NdotL,
                                                         NdotH,
                                                         NdotV,
                                                         VdotH);
        //float a = roughness * roughness;
        //float ggx = 1.0 / (3.14159*a*a);
        //a = ggx/a;
        //a = a*a;

        // diffuse reflection:
        // In order for light to be diffused, light must first penetrate the
        // surface:  This is easy to enforce in a shading system: one simply
        // subtracts reflected light before allowing the diffuse shading to occur.
        //vec3 diffuseReflection = (1.0 - specularReflection) * diffuseFactor;
        vec3 diffuseReflection = diffuseFactor * (1.0 - specularFactor);
        //vec3 diffuseReflection = diffuseFactor;

        return LightColor * NdotL * (specularReflection+diffuseReflection);
    }
    else
    {
        return vec3(0.0, 0.0, 0.0);
    }
}

const vec3 NonMetallicSpecularFactor = vec3(1.0, 1.0, 1.0) * 0.22; // sRGB
const vec3 MetallicDiffuseFactor     = vec3(0.0, 0.0, 0.0);

uniform float Metallic;
uniform float Roughness;

/**
 * @param color
 * Defines albedo/diffuse color for insulators (non-metals)
 * and reflectivity for conductors (metals).
 *
 * @param metallic
 * 0: diffuse = color, specular = 0.22 sRGB
 * 1: diffuse = 0,     specular = color
 */
vec3 CalcLightContributionMetallic( vec3 normal,
                                    vec3 color,
                                    float roughness,
                                    float metallic )
{
    metallic = Metallic;
    roughness = Roughness;
    vec3 specularFactor = mix(NonMetallicSpecularFactor, color, metallic);
    vec3 diffuseFactor  = mix(color, MetallicDiffuseFactor, metallic);
    return CalcLightContribution(normal, specularFactor, diffuseFactor, roughness);
}
