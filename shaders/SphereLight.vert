#version 150

uniform mat4 View;
uniform mat4 Model;


in vec3 VertexPosition;


void CalcSphereLight( out vec3 lightPositionTS,
                      const in vec3 lightPositionWS,
                      const in mat3 csToTS )
{
    vec3 positionWS = vec3(Model * vec4(VertexPosition, 1));
    vec3 vecToLightPositionWS = lightPositionWS-positionWS;
    vec3 vecToLightPositionCS = vec3(View * vec4(vecToLightPositionWS, 1));
    lightPositionTS = csToTS * vecToLightPositionCS;
}
