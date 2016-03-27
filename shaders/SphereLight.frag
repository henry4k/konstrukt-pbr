#version 120

float CalcDistanceAttenuation( const in float lightDistance,
                               const in float maxLightDistance ); // from DistanceAttenuation.frag

void CalcSphereLight( out vec3 lightDirection,
                      out float NdotL,
                      out float attenuation,
                      const in vec3 normal,
                      const in vec3 reflection,
                      const in vec3 lightPosition,
                      const in float lightRadius,
                      const in float lightRange )
{
    vec3 centerToRay = dot(lightPosition, reflection) * reflection - lightPosition;
    vec3 closestPoint = lightPosition + centerToRay *
                        clamp(lightRadius/length(centerToRay), 0, 1);
    lightDirection = normalize(closestPoint);

    NdotL = max(dot(normal, lightDirection), 0);

    float distanceAttenuation =
        CalcDistanceAttenuation(length(closestPoint), lightRange);
    attenuation = NdotL * distanceAttenuation;
}
