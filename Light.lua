local class = require 'middleclass'
local Vec   = require 'core/Vector'
local Light = require 'core/graphics/Light'


local TypeNameToId =
{
    ambient     = 0,
    directional = 1,
    sphere      = 2,
    tube        = 3,
    spot        = 4
}


local PbrLight = class(here('Light'), Light)

function PbrLight:initialize()
    Light.initialize(self)
end

function PbrLight:_setShaderLightType( typeName )
    self.shaderVariables:set('LightType', TypeNameToId[typeName], 'int')
end

function PbrLight:setValue( value )
    assert(Vec:isInstance(value) and #value == 3, 'Must be a 3D vector.')
    self.shaderVariables:set('LightValue', value)
    Light.setValue(self, value:length())
end

function PbrLight:setRange( range )
    Light.setRange(self, range)
    self.shaderVariables:set('LightRange', range)
end


return PbrLight
