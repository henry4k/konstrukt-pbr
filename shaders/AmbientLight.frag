#version 150

uniform vec3 AmbientLightValue;
uniform sampler2D AmbientBrdfLutSampler;

vec3 CalcAmbientIlluminance( const vec3 diffuseFactor,
                             const vec3 specularFactor,
                             const in float roughness,
                             const in float NdotV )
{
    vec3 diffuseReflection = AmbientLightValue * diffuseFactor;

    vec2 ambientBrdf = texture(AmbientBrdfLutSampler, vec2(roughness, NdotV)).xy;
    float scale = ambientBrdf.x;
    float bias  = ambientBrdf.y;
    vec3 specularReflection = AmbientLightValue *
                              (specularFactor * scale + bias);

    return diffuseReflection * (1 - specularFactor) +
           specularReflection;
}
