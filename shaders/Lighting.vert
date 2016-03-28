#version 120

void CalcDirectionalLight( out vec3 lightDirectionTS,
                           const in vec3 lightDirectionWS,
                           const in mat3 csToTS ); // from DirectionalLight.vert

void CalcSphereLight( out vec3 lightPositionTS,
                      const in vec3 lightPositionWS,
                      const in mat3 csToTS ); // from SphereLight.vert


const int AmbientLightType     = 0;
const int DirectionalLightType = 1;
const int SphereLightType      = 2;
const int TubeLightType        = 3;
const int SpotLightType        = 4;

const int MaxLightCount = 4;


uniform mat4 View;
uniform mat4 ModelView;
uniform int LightCount;
uniform int  LightType[MaxLightCount];
uniform vec3 LightPositionWS[MaxLightCount];


attribute vec3 VertexPosition;
attribute vec3 VertexNormal;
attribute vec3 VertexTangent;
attribute vec3 VertexBitangent;


varying vec3 LightPositionTS[MaxLightCount];
varying vec3 CameraDirectionTS;


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

    for(int i = 0; i < LightCount; i++)
    {
        if(LightType[i] == DirectionalLightType)
            CalcDirectionalLight(LightPositionTS[i],
                                 LightPositionWS[i],
                                 csToTS);
        else if(LightType[i] == SphereLightType)
            CalcSphereLight(LightPositionTS[i],
                            LightPositionWS[i],
                            csToTS);
    }
}
