local ShaderProgram = require 'core/graphics/ShaderProgram'

local brdf = ShaderProgram:load(here('Lighting.vert'),
                                here('Lighting.frag'),
                                here('WorldSpaceNormal.vert'),
                                here('WorldSpaceNormal.frag'),
                                here('Specular.frag'),
                                here('Brdf.vert'),
                                here('Brdf.frag'))

return {brdf = brdf}
