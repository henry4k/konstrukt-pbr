#version 150

vec3 CalcIlluminanceMetallic( const in vec3 normal,
                              const in vec3 color,
                              const in float roughness,
                              const in float metallic ); // from Lighting.frag

uniform sampler2D NormalSampler;
uniform sampler2D ColorSampler;
uniform sampler2D RoughnessSampler;
uniform sampler2D MetallicSampler;

in vec2 TexCoord;

out vec4 FragmentColor;

void main()
{
    vec3 normal     = texture(NormalSampler,    TexCoord).rgb * 2 - 1;
    vec3 color      = texture(ColorSampler,     TexCoord).rgb;
    float roughness = texture(RoughnessSampler, TexCoord).r;
    float metallic  = texture(MetallicSampler,  TexCoord).r;

    vec3 illuminance = CalcIlluminanceMetallic(normal, color, roughness, metallic);
    FragmentColor.rgb = illuminance;
    FragmentColor.a = 1;
}
