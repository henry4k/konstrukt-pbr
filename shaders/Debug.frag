#version 120

uniform float Time;

float T( float m )
{
    return sin(Time*m)*.5+.5;
}
