#version 120

void CalcDirectionalLight( out vec3 lightDirection,
                           out float NdotL,
                           out float incidentLuminanceFactor,
                           const in vec3 normal,
                           const in vec3 reflection,
                           const in vec3 lightDirectionIn,
                           const in float lightRadius )
{
    float r = sin(lightRadius); // Disk radius
    float d = cos(lightRadius); // Distance to disk

    // Closest point to a disk ( since the radius is small , this is
    // a good approximation
    float DdotR = dot(lightDirectionIn, reflection);
    vec3 S = reflection - DdotR * lightDirectionIn;
    lightDirection = DdotR<d ? normalize(d * lightDirectionIn + normalize(S) * r) : reflection;

    NdotL = max(dot(normal, lightDirection), 0);

    incidentLuminanceFactor = NdotL;
}
