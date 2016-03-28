local Vec        = require 'core/Vector'
local Mat4       = require 'core/Matrix4'
local Control    = require 'core/Control'
--local GlobalControls = require 'core/GlobalControls'
local SetupUtils = require 'base-game/SetupUtils'
local Background = require 'base-game/Background'
local GhostActor = require 'base-game/world/GhostActor'
local Model      = require(here('Orbot/init'))
local Programs   = require(here('shaders/Programs'))
local DefaultShaderProgramSet = require 'base-game/shaders/DefaultShaderProgramSet'

local function SetCustomShaderPrograms()
    for name, program in pairs(Programs) do
        DefaultShaderProgramSet:setFamily(name, program)
    end
end

--[[
local function UniformSlider( name, start, model )
    local value = start
    print(name, value)
    local function control( controlName, valueDelta )
        GlobalControls:mapControl(controlName, function( self, absolute, delta )
            if delta > 0 then
                value = math.min(1, math.max(0, value + valueDelta))
                model:setUniform(name, value, 'float')
                print(name, value)
            end
        end)
    end
    control('test1', -.1)
    control('test2', .1)
end
]]

local Lights =
{
    {
      type = 'sphere',
      position = Vec(0,0,2),
      value = Vec(1,1,1)*100,
      radius = 0.1,
      range = 100
    },
    {
      type = 'directional',
      position = Vec(0,1,0),
      value = Vec(1,1,0)*1,
      radius = 0.0094,
      range = 0
    },
    {
      type = 'directional',
      position = Vec(0,0,1),
      value = Vec(1,1,1)*0.01,
      radius = math.deg(100),
      range = 0
    }
}

local TypeId =
{
    ambient     = 0,
    directional = 1,
    sphere      = 2,
    tube        = 3,
    spot        = 4
}

local function SetupLight( target, index )
    local light = Lights[index]

    target:setUniform(string.format('LightType[%d]', index-1),
                      TypeId[light.type], 'int')
    target:setUniform(string.format('LightPositionWS[%d]', index-1),
                      light.position)
    target:setUniform(string.format('LightValue[%d]', index-1),
                      light.value)
    target:setUniform(string.format('LightRadius[%d]', index-1),
                      light.radius, 'float')
    target:setUniform(string.format('LightRange[%d]', index-1),
                      light.range, 'float')
end

local function SetupLights( target )
    target:setUniform('LightCount', #Lights, 'int')
    for i = 1, #Lights do
        SetupLight(target, i)
    end
end

local function CreateUniformChart( modelWorld )
    local xcount = 5
    local ycount = 1
    for y = 0, ycount do
    for x = 0, xcount do
        local model = Model(modelWorld).model
        local position = Vec(x - xcount/2, y - ycount/2, 3)
        model:setTransformation(Mat4():translate(position))
        model:setUniform('Roughness', x/xcount, 'float')
        model:setUniform('Metallic',  y/ycount, 'float')
        SetupLights(model)
    end
    end
end

local function start()
    local renderTarget = require 'core/graphics/DefaultRenderTarget'

    SetupUtils.setupRenderTarget(renderTarget)
    SetCustomShaderPrograms()
    Background.setup(renderTarget)

    local actor = GhostActor(renderTarget)
    Control.pushControllable(actor)

    local worldModelWorld = renderTarget:getCameraByName('world'):getModelWorld()
    CreateUniformChart(worldModelWorld)
end


return { start=start }
