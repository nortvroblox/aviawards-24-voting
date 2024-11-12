import { Controller } from "@flamework/core";
import EmitYourParticleModule from "shared/modules/emit-your-particles";
import type { Logger } from "@rbxts/log";
import type { OnStart } from "@flamework/core";
import { PLAYER_GUI } from "client/constants";

const CONFETTI_COLORS = [
    Color3.fromRGB(255, 64, 64),
    Color3.fromRGB(252, 255, 64),
    Color3.fromRGB(64, 64, 255),
]

const CONFETTI_SIZES = [
    UDim2.fromOffset(7, 12),
]

@Controller({})
export default class ConfettiController implements OnStart {
    emitters: Array<EmitYourParticleModule["ParticleEmitter2D"]> = [];
    templates: Array<Frame> = [];
    constructor(private readonly logger: Logger) {}

    public onStart(): void {
        const particleUI = new Instance("ScreenGui");
        particleUI.Name = "ParticleUI";
        particleUI.Parent = PLAYER_GUI;
        particleUI.DisplayOrder = 10;
        
        for (let index = 0; index < CONFETTI_COLORS.size(); index++) {
            for (const size of CONFETTI_SIZES) {
                const color = CONFETTI_COLORS[index] as Color3;
                const particleUIFrame = new Instance("Frame");
                particleUIFrame.Name = "ParticleUIFrame";
                particleUIFrame.Size = new UDim2(1.5, 0, 0, 0);
                particleUIFrame.Position = new UDim2(-0.25, 0, -0.05, 0);
                particleUIFrame.BackgroundTransparency = 1;
                particleUIFrame.Parent = particleUI;
                
                const templateParticle = new Instance("Frame");
                templateParticle.Name = "TemplateParticle";
                templateParticle.Size = size;
                templateParticle.Position = new UDim2(0.5, 0, 0.5, 50);
                templateParticle.BorderSizePixel = 0;
                templateParticle.BackgroundColor3 = color;
                this.templates.push(templateParticle)
                
                const newEmitter = EmitYourParticleModule.newEmitter(particleUIFrame);
                newEmitter.SetEmitterParticle(templateParticle);
                newEmitter.SetEmissionShape('area')
                newEmitter.SetLifetime(6, 9)
                newEmitter.SetSpeed(150, 300)
                newEmitter.SetDrag(2)
                newEmitter.SetEmitterRate(0)
                newEmitter.SetRotation(index * 45)
                newEmitter.SetRotationSpeed(1)
                newEmitter.SetSpreadAngle(-360, 360)
                newEmitter.SetAcceleration(new Vector2(0, 150))
                
                const bgFadeSequence = new NumberSequence([
                    new NumberSequenceKeypoint(0, 1),
                    new NumberSequenceKeypoint(0.1, 0),
                    new NumberSequenceKeypoint(0.8, 0.05),
                    new NumberSequenceKeypoint(1, 1)
                ])
        
                newEmitter.SetPropertyTransition('BackgroundTransparency', bgFadeSequence)
                this.emitters.push(newEmitter)
            }
        }

        for (const emitter of this.emitters) {
            emitter.SetLifetime(0.01, 0.01)
        }
        this.runConfetti()
        for (const emitter of this.emitters) {
            emitter.SetLifetime(6, 9)
        }
    }

    public runConfetti(): void {
        for (const emitter of this.emitters) {
            emitter.Emit(16)
        }
    }
}
