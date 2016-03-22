#version 150

float T( float m );

in vec3 LightPositionTS;

const float LightRadius = 0.4;

vec3 CalcSphereLight( const in vec3 normal,
                      const in vec3 cameraDirectionTS,
                      out float dist,
                      out float radius )
{
    dist = length(LightPositionTS);
    float LightRadius = mix(0.01, 1, T(0.5));
    radius = LightRadius;

    vec3 reflection = reflect(-cameraDirectionTS, normal);
    vec3 centerToRay = dot(LightPositionTS, reflection) * reflection - LightPositionTS;
    vec3 closestPoint = LightPositionTS + centerToRay *
                        clamp(LightRadius/length(centerToRay), 0, 1);
    return normalize(closestPoint);
}
