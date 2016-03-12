#version 120

uniform mat4 View;
uniform mat4 ModelView;
uniform mat4 Model;
uniform float Time;

attribute vec3 VertexPosition;

varying vec3 LightPositionTS;

const vec3 LightPositionWS = vec3(0, 0, 2);

void CalcSphereLight( const in mat3 csToTS )
{
    //vec3 LightPositionWS = vec3(0, 0, 2+sin(Time)*2);
    //vec3 LightPositionWS = vec3(sin(Time)*2, 0, 1-sin(Time*0.5));

    //vec3 positionCS = vec3(ModelView * vec4(VertexPosition, 1.0));
    //vec3 lightPositionCS = vec3(View * vec4(LightPositionWS, 1.0));
    //LightPositionTS = csToTS * (positionCS-lightPositionCS);
    vec3 positionWS = vec3(Model * vec4(VertexPosition, 1));
    vec3 vecToLightPositionWS = LightPositionWS-positionWS;
    vec3 vecToLightPositionCS = vec3(View * vec4(vecToLightPositionWS, 1.0));
    LightPositionTS = csToTS * vecToLightPositionCS;
}
