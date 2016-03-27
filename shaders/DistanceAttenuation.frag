#version 120

const float ProximitnityAttenuation = 0;

float CalcDistanceAttenuation( const in float lightDistance,
                               const in float maxLightDistance )
{
    float distRatio = lightDistance/maxLightDistance;
    float distRatio4 = distRatio*distRatio*distRatio*distRatio;
    float a = clamp(1.0-distRatio4, 0, 1);
    return a*a / (lightDistance*lightDistance+ProximitnityAttenuation);
}
