local ShaderProgram = require 'core/graphics/ShaderProgram'

local brdf = ShaderProgram:load(here('Lighting.vert'),
                                here('Lighting.frag'),
                                here('SphereLight.vert'),
                                here('SphereLight.frag'),
                                here('Specular.frag'),
                                here('Diffuse.frag'),
                                here('Debug.frag'),
                                here('DistanceAttenuation.frag'),
                                here('Brdf.vert'),
                                here('Brdf.frag'))

return {brdf = brdf}
