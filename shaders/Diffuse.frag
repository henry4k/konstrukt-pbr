#version 150

#ifdef FROSTBITE
// Half angle formula :
// cos (2 theta ) = 2 cos ^2( theta ) - 1
float cosD = sqrt (( dot (V , L ) + 1.0 f ) * 0.5) ;
float NdotV = saturate ( dot ( data . worldNormal , V ) ) ;
float NdotL_sat = saturate ( NdotL ) ;
// Disney diffuse BRDF operates in linear roughness ,
// which is the sqrt of the GGX alpha roughness term
float fd90 = 0.5 + 2 * cosD * cosD * sqrt ( data . roughness ) ;
float lightScatter = 1 + ( fd90 -1) * pow (1 - NdotL_sat , 5) ;
float viewScatter = 1 + ( fd90 -1) * pow (1 - NdotV , 5) ;
f = lightScatter * viewScatter ;
#endif

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
    float fd = l*v;

    return diffuseFactor * fd;
}
