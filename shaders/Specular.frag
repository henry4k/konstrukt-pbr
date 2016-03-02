const float PI = 3.14159;

float pow2( float v )
{
    return v * v;
}

/** Attenuation of the light due to the microfacets shadowing each other.
 */
float Geometry( float NdotL, float NdotH, float NdotV, float VdotH, float roughness )
{
    //float NH2 = 2.0 * NdotH;
    //float g1 = (NH2 * NdotV) / VdotH;
    //float g2 = (NH2 * NdotL) / VdotH;
    //return min(1.0, min(g1, g2)) / (NdotV*NdotL);

    // Modified Schlick (from UE4):
    float k = pow2(roughness + 1.0) / 8.0;
    float g1 = NdotL / ((NdotL)*(1.0-k)+k);
    float g2 = NdotV / ((NdotV)*(1.0-k)+k);
    return g1*g2 / (NdotV*NdotL);

    // Schlick-Smith (from BlackOps):
    //float a = pow(8192.0, 1.0-roughness);
    //float k = 2.0 / sqrt(PI*(a+2.0));
    //return 1.0 / ((NdotL*(1.0-k)+k) * (NdotV*(1.0-k)+k));
}

/** Attenuation of the light due to (statistical) distribution of microfacets.
 */
float Distribution( float roughness, float NdotH )
{
    // GGX/Trowbridge-Reitz:
    float r = roughness * roughness * roughness * roughness;
    return r / (PI * pow2(pow2(NdotH)*(r-1.0)+1.0));

    // Blinn-Phong: (from BlackOps)
    //float a = pow(8192.0, 1.0-roughness);
    //return ((a+2.0)/8.0)*pow(NdotH, a);
}

/** Defines what fraction of the incoming light is reflected and what fraction
 * is transmitted.
 *
 * @param f0
 * Reflection coefficient for light incoming parallel to the surface normal.
 * In other words: the minimal reflection.
 */
vec3 Fresnel( vec3 f0, float VdotH )
{
    // Schlick approximation
    //return (f0 + (1.0 - f0)*pow(1.0 - VdotH, 5.0)) / 4.0;

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
