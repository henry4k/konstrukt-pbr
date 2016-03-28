#version 120

const float PI = 3.14159265358979323846;
const float DiffuseNormalizationFactor = 1 / PI;

/**
 * Schlicks approximation:
 */
float Fresnel( const in float u )
{
    float m = clamp(1-u, 0, 1);
    float m2 = m*m;
    return m2*m2*m; // pow(m,5)
}

/**
 * Disneys/Burleys diffuse model:
 */
vec3 CalcDiffuseReflection( const in vec3 diffuseFactor,
                            const in float roughness,
                            const in float NdotL,
                            const in float NdotV,
                            const in float VdotH )
{
    //float fd90 = 0.5 + 2.0 * VdotH*VdotH * roughness;
    //float l = Fresnel(NdotL);
    //float v = Fresnel(NdotV);
    //float fd = mix(1.0, fd90, l) * mix(1.0, fd90, v);

    //float l = 1 + (fd90+1) * pow(1-NdotL, 5);
    //float v = 1 + (fd90+1) * pow(1-NdotV, 5);
    float cosD = sqrt((VdotH+1) * 0.5);
    float NdotVs = clamp(NdotV, 0, 1);
    float NdotLs = clamp(NdotL, 0, 1);
    float fd90 = 0.5 + 2 * cosD * cosD * sqrt(roughness) ;
    float l = 1 + (fd90-1) * pow(1-NdotLs, 5);
    float v = 1 + (fd90-1) * pow(1-NdotVs, 5);
    float fd = l * v * DiffuseNormalizationFactor;

    return diffuseFactor * fd;
}
