#version 130
in vec3 LightPositionTS;
uniform float Time;
in vec3 CameraDirectionTS;
uniform float Metallic;
uniform float Roughness;
uniform sampler2D NormalSampler;
uniform sampler2D ColorSampler;
in vec2 TexCoord;
void main ()
{
  vec4 tmpvar_1;
  tmpvar_1 = texture (ColorSampler, TexCoord);
  vec3 specularFactor_2;
  specularFactor_2 = mix (vec3(0.04, 0.04, 0.04), tmpvar_1.xyz, Metallic);
  vec3 diffuseFactor_3;
  diffuseFactor_3 = (tmpvar_1.xyz * (1.0 - Metallic));
  vec3 tmpvar_4;
  vec3 tmpvar_5;
  tmpvar_5 = normalize(((texture (NormalSampler, TexCoord).xyz * 2.0) - 1.0));
  vec3 tmpvar_6;
  tmpvar_6 = normalize(CameraDirectionTS);
  float tmpvar_7;
  tmpvar_7 = sqrt(dot (LightPositionTS, LightPositionTS));
  float tmpvar_8;
  tmpvar_8 = mix (0.01, 1.0, ((
    sin((Time * 0.5))
   * 0.5) + 0.5));
  vec3 tmpvar_9;
  vec3 I_10;
  I_10 = -(tmpvar_6);
  tmpvar_9 = (I_10 - (2.0 * (
    dot (tmpvar_5, I_10)
   * tmpvar_5)));
  vec3 tmpvar_11;
  tmpvar_11 = ((dot (LightPositionTS, tmpvar_9) * tmpvar_9) - LightPositionTS);
  vec3 tmpvar_12;
  tmpvar_12 = normalize((LightPositionTS + (tmpvar_11 *
    clamp ((tmpvar_8 / sqrt(dot (tmpvar_11, tmpvar_11))), 0.0, 1.0)
  )));
  float tmpvar_13;
  tmpvar_13 = max (dot (tmpvar_5, tmpvar_12), 0.0);
  if ((tmpvar_13 > 0.0)) {
    float incidentLight_14;
    vec3 diffuseReflection_15;
    float tmpvar_16;
    tmpvar_16 = max (Roughness, 0.02);
    vec3 tmpvar_17;
    tmpvar_17 = normalize((tmpvar_6 + tmpvar_12));
    float tmpvar_18;
    tmpvar_18 = max (0.0, dot (tmpvar_5, tmpvar_17));
    float tmpvar_19;
    tmpvar_19 = max (0.0, dot (tmpvar_5, tmpvar_6));
    float tmpvar_20;
    tmpvar_20 = dot (tmpvar_6, tmpvar_17);
    float tmpvar_21;
    tmpvar_21 = ((tmpvar_16 * tmpvar_16) * (tmpvar_16 * tmpvar_16));
    float v_22;
    v_22 = (((tmpvar_18 * tmpvar_18) * (tmpvar_21 - 1.0)) + 1.0);
    float v_23;
    v_23 = (tmpvar_16 + 1.0);
    float tmpvar_24;
    tmpvar_24 = ((v_23 * v_23) / 8.0);
    float tmpvar_25;
    tmpvar_25 = sqrt(((tmpvar_20 + 1.0) * 0.5));
    float tmpvar_26;
    tmpvar_26 = (0.5 + ((
      (2.0 * tmpvar_25)
     * tmpvar_25) * sqrt(tmpvar_16)));
    vec3 tmpvar_27;
    tmpvar_27 = (1.0 - specularFactor_2);
    diffuseReflection_15 = ((diffuseFactor_3 * (
      (1.0 + ((tmpvar_26 - 1.0) * pow ((1.0 -
        clamp (tmpvar_13, 0.0, 1.0)
      ), 5.0)))
     *
      (1.0 + ((tmpvar_26 - 1.0) * pow ((1.0 -
        clamp (tmpvar_19, 0.0, 1.0)
      ), 5.0)))
    )) * tmpvar_27);
    diffuseReflection_15 = (diffuseReflection_15 * 0.3183101);
    incidentLight_14 = (0.9549304 * tmpvar_13);
    float tmpvar_28;
    tmpvar_28 = (tmpvar_7 / 100.0);
    float tmpvar_29;
    tmpvar_29 = clamp ((1.0 - (
      (tmpvar_28 * tmpvar_28)
     *
      (tmpvar_28 * tmpvar_28)
    )), 0.0, 1.0);
    incidentLight_14 = (incidentLight_14 * ((tmpvar_29 * tmpvar_29) / (tmpvar_7 * tmpvar_7)));
    tmpvar_4 = pow (((vec3(0.3015113, 0.3015113, 0.904534) *
      (diffuseReflection_15 + (((
        (specularFactor_2 + (tmpvar_27 * exp2((
          ((-5.55473 * tmpvar_20) - 6.98316)
         * tmpvar_20))))
       / 4.0) * (tmpvar_21 /
        (3.14159 * (v_22 * v_22))
      )) * ((
        (tmpvar_13 / ((tmpvar_13 * (1.0 - tmpvar_24)) + tmpvar_24))
       *
        (tmpvar_19 / ((tmpvar_19 * (1.0 - tmpvar_24)) + tmpvar_24))
      ) / (tmpvar_19 * tmpvar_13))))
    ) * mix (incidentLight_14,
      (((12.0 / (
        (39.47836 * tmpvar_8)
       * tmpvar_8)) * 3.14159) * (((tmpvar_8 * tmpvar_8) / (tmpvar_7 * tmpvar_7)) * tmpvar_13))
    ,
      roundEven(((sin(
        (Time * 4.0)
      ) * 0.5) + 0.5))
    )), vec3(0.4545454, 0.4545454, 0.4545454));
  } else {
    tmpvar_4 = vec3(0.0, 0.0, 0.0);
  };
  gl_FragColor.xyz = tmpvar_4;
  gl_FragColor.w = 1.0;
}

