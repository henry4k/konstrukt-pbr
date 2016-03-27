#version 120

uniform mat4 View;
uniform mat4 Model;
uniform mat4 ModelView;

const vec3 PlaneOriginWS    = vec3(0, 0, 2);
const vec3 PlaneTangentWS   = normalize(vec3(1, 0, 0));
const vec3 PlaneBitangentWS = normalize(vec3(0, 1, 0));

attribute vec3 VertexPosition;

//varying float PlaneOffsetDotNormal;
varying vec3 PositionTS;
varying vec3 PlaneOriginTS;
varying vec3 PlaneTangentTS;
varying vec3 PlaneBitangentTS;
varying vec3 PlaneNormalTS;

void CalcAreaLight( const in mat3 csToTS )
{
    mat3 viewRotation  = mat3(View);
    vec3 planeNormalWS = cross(PlaneTangentWS, PlaneBitangentWS);

    vec3 positionWS = vec3(Model * vec4(VertexPosition, 1));
    //vec3 planeOffsetWS = PlaneOriginWS - positionWS;
    //PlaneOffsetDotNormal = dot(planeOffsetWS, planeNormalWS);

    vec3 positionCS       = vec3(View * vec4(positionWS, 1));
    vec3 planeOriginCS    = vec3(View * vec4(PlaneOriginWS, 1));
    vec3 planeTangentCS   = viewRotation * PlaneTangentWS;
    vec3 planeBitangentCS = viewRotation * PlaneBitangentWS;
    vec3 planeNormalCS    = viewRotation * planeNormalWS;

    PositionTS       = csToTS * positionCS;
    PlaneOriginTS    = csToTS * planeOriginCS;
    PlaneTangentTS   = csToTS * planeTangentCS;
    PlaneBitangentTS = csToTS * planeBitangentCS;
    PlaneNormalTS    = csToTS * planeNormalCS;
}
