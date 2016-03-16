#version 150

void CalcSphereLight( const in mat3 csToTS );

in vec3 VertexPosition;
in vec3 VertexNormal;
in vec3 VertexTangent;
in vec3 VertexBitangent;

out vec3 CameraDirectionTS;

uniform mat4 View;
uniform mat4 ModelView;
uniform float Time;

void CalcLight()
{
    mat3 viewRotation      = mat3(View);
    mat3 modelViewRotation = mat3(ModelView);

    vec3 tangentCS   = modelViewRotation * normalize(VertexTangent);
    vec3 bitangentCS = modelViewRotation * normalize(VertexBitangent);
    vec3 normalCS    = modelViewRotation * normalize(VertexNormal);
    mat3 csToTS = transpose(mat3(tangentCS, bitangentCS, normalCS));

    vec3 positionCS = vec3(ModelView * vec4(VertexPosition, 1));

    vec3 cameraDirectionCS = normalize(-positionCS);
    CameraDirectionTS = csToTS * cameraDirectionCS;

    CalcSphereLight(csToTS);
}
