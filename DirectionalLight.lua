local class = require 'middleclass'
local Light = require(here('Light'))


local DirectionalLight = class(here('DirectionalLight'), Light)

DirectionalLight.static.lightType = 'global'

function DirectionalLight:initialize()
    Light.initialize(self)
    self:_setShaderLightType('directional')
end

function DirectionalLight:setRadius( radius )
    assert(radius >= 0, 'Must be positive or zero.')
    self.shaderVariables:set('LightRadius', radius)
end

function DirectionalLight:setDirection( dir )
    self.shaderVariables:set('LightPositionWS', dir)
end


return DirectionalLight
