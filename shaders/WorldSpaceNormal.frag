#version 150

in vec3 TangentWS;
in vec3 BitangentWS;
in vec3 NormalWS;

vec3 WorldSpaceNormal( vec3 tsNormal )
{
    return TangentWS   * tsNormal.x +
           BitangentWS * tsNormal.y +
           NormalWS    * tsNormal.z;
}
