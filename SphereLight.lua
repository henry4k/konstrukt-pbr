local class = require 'middleclass'
local Light = require(here('Light'))


local SphereLight = class(here('SphereLight'), Light)

SphereLight.static.lightType = 'point'

function SphereLight:initialize()
    Light.initialize(self)
    self:_setShaderLightType('sphere')
end

function SphereLight:setRadius( radius )
    assert(radius >= 0, 'Must be positive or zero.')
    self.shaderVariables:set('LightRadius', radius)
end


return SphereLight
