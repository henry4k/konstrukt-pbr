#version 150

const float PI = 3.14159265358979323846;

float CalcDistanceAttenuation( const in float lightDistance,
                               const in float maxLightDistance ); // from DistanceAttenuation.frag

void CalcSphereLight( out vec3 lightDirection,
                      out float NdotL,
                      out float incidentLuminanceFactor,
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

    float dist = length(lightPosition);

    // From Frostbite:
    //float formFactor = ((lightRadius*lightRadius) / (dist*dist)) * NdotL;
    //float bla = 1.0 / (4.0 * PI*PI *  lightRadius*lightRadius);
    //incidentLuminanceFactor = bla*PI*formFactor;

    // From Unreal Engine 4:
    float distanceAttenuation =
        CalcDistanceAttenuation(dist, lightRange);
    incidentLuminanceFactor =
        NdotL * distanceAttenuation * (1.0 / (4.0*PI));
}
