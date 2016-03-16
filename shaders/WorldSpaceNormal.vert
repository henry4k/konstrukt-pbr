#version 150

in vec3 VertexNormal;
in vec3 VertexTangent;
in vec3 VertexBitangent;

out vec3 TangentWS;
out vec3 BitangentWS;
out vec3 NormalWS;

uniform mat4 Model;

void CalcWorldSpaceNormal()
{
    mat3 modelRotation = mat3(Model);
    TangentWS   = normalize(modelRotation * VertexTangent);
    BitangentWS = normalize(modelRotation * VertexBitangent);
    NormalWS    = normalize(modelRotation * VertexNormal);
}
