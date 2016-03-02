#version 120
vec3 CalcLightContributionMetallic( vec3 normal, vec3 color, float roughness, float metallic ); // from Lighting.frag

uniform sampler2D NormalSampler;
uniform sampler2D ColorSampler;
uniform sampler2D RoughnessSampler;
uniform sampler2D MetallicSampler;

varying vec2 TexCoord;

void main()
{
    vec3 normal     = texture2D(NormalSampler,    TexCoord).rgb * 2.0 - 1.0;
    vec3 color      = texture2D(ColorSampler,     TexCoord).rgb;
    float roughness = texture2D(RoughnessSampler, TexCoord).r;
    float metallic  = texture2D(MetallicSampler,  TexCoord).r;

    gl_FragColor.rgb = CalcLightContributionMetallic(normal, color, roughness, metallic);
    gl_FragColor.a = 1.0;
}
