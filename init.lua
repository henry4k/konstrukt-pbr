local Vec        = require 'core/Vector'
local Mat4       = require 'core/Matrix4'
local Control    = require 'core/Control'
local ModelWorld = require 'core/graphics/ModelWorld'
local PerspectiveCamera = require 'core/graphics/PerspectiveCamera'
local Background = require 'base-game/Background'
local GhostActor = require 'base-game/world/GhostActor'
local LightWorld = require(here('LightWorld'))
local Model      = require(here('Orbot/init'))
local Programs   = require(here('shaders/Programs'))
local DefaultShaderProgramSet = require 'base-game/shaders/DefaultShaderProgramSet'

local function SetCustomShaderPrograms()
    for name, program in pairs(Programs) do
        DefaultShaderProgramSet:setFamily(name, program)
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
        model.shaderVariables:set('Roughness', x/xcount)
        model.shaderVariables:set('Metallic',  y/ycount)
    end
    end
end

local function SetupRenderTarget()
    local foregroundModelWorld = ModelWorld()
    local worldModelWorld      = ModelWorld()
    local backgroundModelWorld = ModelWorld()

    local localLightWorld = LightWorld()
    local backgroundLightWorld = LightWorld()

    local foregroundCamera = PerspectiveCamera(foregroundModelWorld, localLightWorld)
    local worldCamera      = PerspectiveCamera(worldModelWorld,      localLightWorld)
    local backgroundCamera = PerspectiveCamera(backgroundModelWorld, backgroundLightWorld)

    local defaultRT = require 'core/graphics/DefaultRenderTarget'
    defaultRT:setCamera(0, 'foreground', foregroundCamera)
    defaultRT:setCamera(2,      'world',      worldCamera)
    defaultRT:setCamera(1, 'background', backgroundCamera)
    defaultRT:setShaderProgramSet(DefaultShaderProgramSet)
end

local function start()
    local renderTarget = require 'core/graphics/DefaultRenderTarget'

    SetupRenderTarget(renderTarget)
    SetCustomShaderPrograms()
    Background.setup(renderTarget)

    local actor = GhostActor(renderTarget)
    Control.pushControllable(actor)

    local camera = renderTarget:getCameraByName('world')
    local modelWorld = camera:getModelWorld()
    local lightWorld = camera:getLightWorld()
    CreateUniformChart(modelWorld)

    local ambient = Vec(122.731, 176.601, 271.599)/65535 -- calculated from skybox
    lightWorld:setAmbientLightValue(ambient*2) -- brighten a little bit

    local light = lightWorld:createLight('directional')
    light:setRadius(math.rad(40))
    light:setValue(Vec(0.5,0.5,1):normalize()*0.2)
    light:setDirection(Vec(0,0,1))

    light = lightWorld:createLight('sphere')
    light:setRadius(0.3)
    light:setValue(Vec(1,1,1)*60)
    light:setRange(10)
    light:setAttachmentTarget(camera:getAttachmentTarget())

end


return { start=start }
