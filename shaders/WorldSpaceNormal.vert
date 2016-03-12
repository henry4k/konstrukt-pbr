#version 120

uniform mat4 Model;

attribute vec3 VertexNormal;
attribute vec3 VertexTangent;
attribute vec3 VertexBitangent;

varying vec3 TangentWS;
varying vec3 BitangentWS;
varying vec3 NormalWS;

void CalcWorldSpaceNormal()
{
    mat3 modelRotation = mat3(Model);
    TangentWS   = normalize(modelRotation * VertexTangent);
    BitangentWS = normalize(modelRotation * VertexBitangent);
    NormalWS    = normalize(modelRotation * VertexNormal);
}
