#version 120

const float PI = 3.14159;

float pow2( const in float v )
{
    return v * v;
}

/** Attenuation of the light due to the microfacets shadowing each other.
 */
float Geometry( const in float NdotL,
                const in float NdotH,
                const in float NdotV,
                const in float VdotH,
                const in float roughness )
{
    // Cook-Torrance:
    //float NH2 = 2 * NdotH;
    //float g1 = (NH2 * NdotV) / VdotH;
    //float g2 = (NH2 * NdotL) / VdotH;
    //return min(1, min(g1, g2)) / (NdotV*NdotL);

    // Modified Schlick (from UE4):
    float k = pow2(roughness + 1.0) / 8.0;
    float g1 = NdotL / (NdotL*(1.0-k)+k);
    float g2 = NdotV / (NdotV*(1.0-k)+k);
    return (g1*g2) / (NdotV*NdotL);

    // SmithGGX (from Frostbite):
    //float r2 = roughness * roughness;
    //float v = NdotL * sqrt((-NdotV * r2 + NdotV) * NdotV + r2);
    //float l = NdotV * sqrt((-NdotL * r2 + NdotL) * NdotL + r2);
    //return 0.5 / (v+l);

    // Schlick-Smith (from BlackOps):
    //float a = pow(8192, 1-roughness);
    //float k = 2 / sqrt(PI*(a+2));
    //return 1 / ((NdotL*(1-k)+k) * (NdotV*(1-k)+k));

    // Beckmann/Smith:
    //float r2 = roughness * roughness;
    //float vc = NdotV/(r2*sqrt(1-NdotV*NdotV));
    //float gv = vc < 1.6 ? ((3.535*vc+2.181*vc*vc)/(1+2.276*vc+2.577*vc*vc)) : 1;
    //float lc = NdotL/(r2*sqrt(1-NdotL*NdotL));
    //float gl = lc < 1.6 ? ((3.535*lc+2.181*lc*lc)/(1+2.276*lc+2.577*lc*lc)) : 1;
    //return gl*gv;
}

/** Attenuation of the light due to (statistical) distribution of microfacets.
 */
float Distribution( const in float roughness,
                    const in float NdotH )
{
    // GGX/Trowbridge-Reitz:
    float r4 = roughness * roughness * roughness * roughness;
    return r4 / (PI * pow2(pow2(NdotH)*(r4-1.0)+1.0));

    // GGX (from Frostbite):
    //float r2 = roughness * roughness;
    //float f = (NdotH * r2 - NdotH) * NdotH + 1;
    //return (r2 / (f*f))/PI;

    // Blinn-Phong (from BlackOps):
    //float a = pow(8192, 1-roughness);
    //return ((a+2)/8)*pow(NdotH, a);
}

/** Defines what fraction of the incoming light is reflected and what fraction
 * is transmitted.
 *
 * @param f0
 * Reflection coefficient for light incoming parallel to the surface normal.
 * In other words: the minimal reflection.
 */
vec3 Fresnel( const in vec3 f0,
              const in float VdotH )
{
    // Schlick approximation
    //return (f0 + (1 - f0)*pow(1 - VdotH, 5)) / 4;

    // UE4: Spherical Gaussian approximation (slightly more efficient)
    return (f0 + (1.0 - f0)*pow(2.0, (-5.55473*VdotH-6.98316)*VdotH)) / 4.0;
}

/**
 * See Lighting.frag for parameter explanation.
 */
vec3 CalcSpecularReflection( const in vec3 specularFactor,
                             const in float roughness,
                             const in float NdotL,
                             const in float NdotH,
                             const in float NdotV,
                             const in float VdotH )
{
    vec3  f = Fresnel(specularFactor, VdotH);
    float d = Distribution(roughness, NdotH);
    float g = Geometry(NdotL, NdotH, NdotV, VdotH, roughness);
    return f*d*g;
}
