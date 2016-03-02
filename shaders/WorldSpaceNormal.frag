#version 120
varying vec3 TangentWS;
varying vec3 BitangentWS;
varying vec3 NormalWS;

vec3 WorldSpaceNormal( vec3 tsNormal )
{
    return TangentWS   * tsNormal.x +
           BitangentWS * tsNormal.y +
           NormalWS    * tsNormal.z;
}
