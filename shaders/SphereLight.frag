#version 130

uniform float Time;

varying vec3 LightPositionTS;

const float LightRadius = 0.4;
const float PI = 3.14159;

vec3 CalcSphereLight( const in vec3 normal,
                      const in vec3 cameraDirectionTS )
{
    float LightRadius = (sin(Time*.5)*.5+.5) * 0.4;
    vec3 reflection = reflect(cameraDirectionTS, normal);
    vec3 centerToRay = dot(LightPositionTS, reflection) * reflection - LightPositionTS;
    vec3 closestPoint = LightPositionTS + centerToRay *
                        clamp(LightRadius/length(centerToRay), 0.0, 1.0);
    return normalize(closestPoint);
}
