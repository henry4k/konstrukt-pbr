#version 150

const float LightMaxDistance = 100;
const float ProximitnityAttenuation = 0;

float GetDistanceAttenuation( const in float lightDistance )
{
    float distRatio = lightDistance/LightMaxDistance;
    float distRatio4 = distRatio*distRatio*distRatio*distRatio;
    float a = clamp(1.0-distRatio4, 0, 1);
    return a*a / (lightDistance*lightDistance+ProximitnityAttenuation);
}
