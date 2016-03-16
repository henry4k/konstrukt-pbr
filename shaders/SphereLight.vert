#version 150

in vec3 VertexPosition;

out vec3 LightPositionTS;

uniform mat4 View;
uniform mat4 ModelView;
uniform mat4 Model;
uniform float Time;

const vec3 LightPositionWS = vec3(0, 0, 2);

void CalcSphereLight( const in mat3 csToTS )
{
    //vec3 LightPositionWS = vec3(0, 0, 2+sin(Time)*2);
    //vec3 LightPositionWS = vec3(sin(Time)*2, 0, -sin(Time*0.5));

    //vec3 positionCS = vec3(ModelView * vec4(VertexPosition, 1));
    //vec3 lightPositionCS = vec3(View * vec4(LightPositionWS, 1));
    //LightPositionTS = csToTS * (positionCS-lightPositionCS);
    vec3 positionWS = vec3(Model * vec4(VertexPosition, 1));
    vec3 vecToLightPositionWS = LightPositionWS-positionWS;
    vec3 vecToLightPositionCS = vec3(View * vec4(vecToLightPositionWS, 1));
    LightPositionTS = csToTS * vecToLightPositionCS;
}
