#version 120

//varying float PlaneOffsetDotNormal;
varying vec3 PositionTS;
varying vec3 PlaneOriginTS;
varying vec3 PlaneTangentTS;
varying vec3 PlaneBitangentTS;
varying vec3 PlaneNormalTS;

const vec2 LightSize = vec2(2.0, 1.0);

uniform sampler2D LightSampler;

float CalcIntersectionDistance( const int vec3 direction )
{
    return dot(PlaneOriginTS-PositionTS, PlaneNormalTS) /
           dot(direction, PlaneNormalTS);
}

vec2 GetPlaneCoordinates( const in vec3 direction,
                          const in float intersectionDistance )
{
    vec3 intersection = PositionTS + direction*intersectionDistance;
    vec3 intersectionOffset = intersection - PlaneOriginTS;
    return vec2(dot(intersectionOffset, PlaneTangentTS),
                dot(intersectionOffset, PlaneBitangentTS));
}

bool TryGetAreaUV( const in vec3 direction, out vec2 uv )
{
    float intersectionDistance = CalcIntersectionDistance(direction);
    vec2 planeCoords = GetPlaneCoordinates(direction, intersectionDistance);
    uv = planeCoords / LightSize;
    return intersectionDistance > 0 &&
           all(bvec4(greaterThanEqual(uv, vec2(0.0, 0.0)),
                        lessThanEqual(uv, vec2(1.0, 1.0))));
}

vec3 GetAreaLightColor( vec3 direction )
{
    /*
    float intersectionDistance = CalcIntersectionDistance(direction);
    vec3 intersection = PositionTS + direction*intersectionDistance;
    vec3 intersectionOffset = intersection - PlaneOriginTS;
    vec2 uv = vec2(dot(intersectionOffset, PlaneTangentTS),
                   dot(intersectionOffset, PlaneBitangentTS)) / LightSize;
    if(intersectionDistance > 0 &&
           all(bvec4(greaterThanEqual(uv, vec2(0.0, 0.0)),
                        lessThanEqual(uv, vec2(1.0, 1.0)))))
    {
        return vec3(1,1,1) * intersectionDistance * 0.5;
    }
    else
    {
        return vec3(0,0,0.1);
    }
    */
    vec2 uv;
    if(TryGetAreaUV(direction, uv))
        return texture2D(LightSampler, uv).rgb;
    else
        return vec3(0.0, 0.0, 0.0);
}

vec3 CalcAreaLightDiffuse( vec3 direction )
{
    float d = CalcIntersectionDistance(direction);

    // Integrate(A)[L * cos(fi) * cos(fo) * dA / d²]
    float cosFi = dot(vec3(0,0,1), direction);
    float cosFo = dot(PlaneNormalTS, -direction);
    float lightArea = ;
    float luminance = ;
    float DA = luminance * cosFi * cosFo * dA / (d*d);

}

vec3 CalcAreaLightSpecular( vec3 direction, float roughness )
{
    float d = CalcIntersectionDistance(direction);
    if(d > 0)
    {
        float alpha = PI * roughness;
        vec2 planeCoords = GetPlaneCoordinates(direction, d);

    }
    else
    {
    }
}
