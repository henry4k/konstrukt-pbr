#version 120

void CalcSphereLight( const in mat3 csToTS );

uniform mat4 View;
uniform mat4 ModelView;

attribute vec3 VertexPosition;
attribute vec3 VertexNormal;
attribute vec3 VertexTangent;
attribute vec3 VertexBitangent;

varying vec3 CameraDirectionTS;

uniform float Time;

void CalcLight()
{
    mat3 viewRotation      = mat3(View);
    mat3 modelViewRotation = mat3(ModelView);

    vec3 tangentCS   = modelViewRotation * normalize(VertexTangent);
    vec3 bitangentCS = modelViewRotation * normalize(VertexBitangent);
    vec3 normalCS    = modelViewRotation * normalize(VertexNormal);
    mat3 csToTS = transpose(mat3(tangentCS, bitangentCS, normalCS));

    vec3 positionCS = vec3(ModelView * vec4(VertexPosition, 1.0));

    vec3 cameraDirectionCS = normalize(-positionCS);
    CameraDirectionTS = csToTS * cameraDirectionCS;

    CalcSphereLight(csToTS);
}
