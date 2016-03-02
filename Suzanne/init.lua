local class = require 'middleclass'
local Mesh  = require 'core/graphics/Mesh'
local Texture = require 'core/graphics/Texture'

local mesh = Mesh:load(here('Scene.json'), 'Suzanne')
local normal    = Texture:load{fileName=here('Normal.png')}
local color     = Texture:load{fileName=here('Color.png')}
local roughness = Texture:load{fileName=here('Roughness.png')}
local metallic  = Texture:load{fileName=here('Metallic.png')}

local Suzanne = class(here())

function Suzanne:initialize( modelWorld )
    self.model = modelWorld:createModel('world')
    self.model:setMesh(mesh)
    self.model:setProgramFamily('brdf')
    self.model:setTexture(0, normal)
    self.model:setTexture(1, color)
    self.model:setTexture(2, roughness)
    self.model:setTexture(3, metallic)
    self.model:setUniform('NormalSampler',    0, 'int')
    self.model:setUniform('ColorSampler',     1, 'int')
    self.model:setUniform('RoughnessSampler', 2, 'int')
    self.model:setUniform('MetallicSampler',  3, 'int')
end

return Suzanne
