#version 120

vec3 CalcIlluminanceMetallic( const in vec3 normal,
                              const in vec3 color,
                              const in float roughness,
                              const in float metallic ); // from Lighting.frag

uniform sampler2D NormalSampler;
uniform sampler2D ColorSampler;
uniform sampler2D RoughnessSampler;
uniform sampler2D MetallicSampler;

varying vec2 TexCoord;

void main()
{
    vec3 normal     = texture2D(NormalSampler,    TexCoord).rgb * 2 - 1;
    vec3 color      = texture2D(ColorSampler,     TexCoord).rgb;
    float roughness = texture2D(RoughnessSampler, TexCoord).r;
    float metallic  = texture2D(MetallicSampler,  TexCoord).r;

    vec3 illuminance = CalcIlluminanceMetallic(normal, color, roughness, metallic);
    gl_FragColor.rgb = pow(illuminance, vec3(1.0/2.2));
    gl_FragColor.a = 1;
}
