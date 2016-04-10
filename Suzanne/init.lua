local class = require 'middleclass'
local Mesh  = require 'core/graphics/Mesh'
local Texture = require 'core/graphics/Texture'

local mesh = Mesh:load(here('Scene.json'), 'Suzanne')
local normal    = Texture:load{fileName=here('Normal.png')}
local color     = Texture:load{fileName=here('Color.png'), colorSpace='srgb'}
local roughness = Texture:load{fileName=here('Roughness.png')}
local metallic  = Texture:load{fileName=here('Metallic.png')}

local Suzanne = class(here())

function Suzanne:initialize( modelWorld )
    self.model = modelWorld:createModel('world')
    self.model:setMesh(mesh)
    self.model:setProgramFamily('brdf')
    self.model.shaderVariables:set('NormalSampler',    normal)
    self.model.shaderVariables:set('ColorSampler',     color)
    self.model.shaderVariables:set('RoughnessSampler', roughness)
    self.model.shaderVariables:set('MetallicSampler',  metallic)
end

return Suzanne
