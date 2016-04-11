local class = require 'middleclass'
local Texture    = require 'core/graphics/Texture'
local LightWorld = require 'core/graphics/LightWorld'
local DirectionalLight = require(here('DirectionalLight'))
local SphereLight = require(here('SphereLight'))

local AmbientBrdfLut = Texture:load{fileName=here('AmbientBrdfLut.png')}


local PbrLightWorld = class(here('LightWorld'), LightWorld)

PbrLightWorld.static.lightTypes =
{
    directional = DirectionalLight,
    sphere      = SphereLight
}

function PbrLightWorld:initialize()
    LightWorld.initialize(self, 'LightCount', 'LightPositionWS')
    self:setMaxActiveLightCount(4)
    self.shaderVariables:set('AmbientBrdfLutSampler', AmbientBrdfLut)
    self:setAmbientLightValue(0)
end

function PbrLightWorld:setAmbientLightValue( value )
    self.shaderVariables:set('AmbientLightValue', value)
end

function PbrLightWorld:createLight( typeName, ... )
    local klass = self.class.lightTypes[typeName]
    assert(klass, 'No implementation for this light type available.')
    return self:_createLight(klass, ...)
end


return PbrLightWorld
