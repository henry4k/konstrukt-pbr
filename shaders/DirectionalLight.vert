#version 120

uniform mat4 View;


attribute vec3 VertexPosition;


void CalcDirectionalLight( out vec3 lightDirectionTS,
                           const in vec3 lightDirectionWS,
                           const in mat3 csToTS )
{
    mat3 viewRotation = mat3(View);
    vec3 lightDirectionCS = viewRotation * lightDirectionWS;
    lightDirectionTS = csToTS * lightDirectionCS;
}
