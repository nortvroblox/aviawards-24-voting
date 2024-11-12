interface PropertyTransition {
	IsColorSequence: boolean;
	IsNumberSequence: boolean;
	Name: string;
	SequenceFixed: boolean;
	Value: ColorSequence | NumberSequence;
}

interface Particle2D {
	CurrentAge: number;
	DeterminedLifetime: number;
	DeterminedRotationSpeed: number;
	EmittedBy: ParticleEmitter2D;
	GuiObject: GuiObject;
	InitialSize: UDim2;
	Origin: UDim2;
	Position: Vector2;
	Velocity: Vector2;
	VelocityDirection: Vector2;
}

interface ParticleEmitter2D {
	Acceleration: Vector2;
	AllPropertiesSet: boolean;
	BackgroundColor: -1 | ColorSequence;
	BackgroundTransparency: NumberSequence;
	DoUpdateSize: boolean;
	Drag: number;
	EmitShape: "area" | "point";
	GuiObject: GuiObject;
	Lifetime: NumberRange;
	ParticleCreated: RBXScriptSignal<(particle: Particle2D) => void>;
	Particles: Array<Particle2D>;
	ParticleUpdated: RBXScriptSignal<
		(
			particle: Particle2D,
			deltaTime: number,
			lifetimeProgress: number
		) => void
	>;
	PreRenderConnection: RBXScriptConnection;
	PropertyTransitions: Array<PropertyTransition>;
	Rate: number;
	RateTick: number;
	Rotation: NumberRange;
	RotationSpeed: NumberRange;
	Scale: NumberSequence;
	Speed: NumberRange;
	SpreadAngle: NumberRange;
	TemplateParticle: GuiObject | undefined;

    ApplyDefaultProperties(OVERRIDE?: boolean): ParticleEmitter2D;
    ClearParticles(): ParticleEmitter2D;
    ClearPropertyTransitions(): ParticleEmitter2D;
    Destroy(): void;
    Emit(COUNT?: number): ParticleEmitter2D;
    GetPropertyTransition(PROPERTY_NAME: string): [PropertyTransition, number] | undefined;
    RemovePropertyTransition(PROPERTY_NAME: string): ParticleEmitter2D;
    SetAcceleration(NEW_ACCELERATION: Vector2): ParticleEmitter2D;
    SetDrag(NEW_DRAG: number): ParticleEmitter2D;
    SetEmissionShape(NEW_EMISSION_SHAPE: "point" | "area"): ParticleEmitter2D;
    SetEmitterParticle(PARTICLE: GuiObject | undefined): ParticleEmitter2D;
    SetEmitterRate(NEW_RATE: number): ParticleEmitter2D;
    SetLifetime(MIN_LIFETIME: number, MAX_LIFETIME?: number): ParticleEmitter2D;
    SetPropertyTransition(PROPERTY_NAME: string, TRANSITION_SEQ: ColorSequence | NumberSequence): ParticleEmitter2D;
    SetRotation(MIN_ROTATION: number, MAX_ROTATION?: number): ParticleEmitter2D;
    SetRotationSpeed(MIN_ROT_SPEED: number, MAX_ROT_SPEED?: number): ParticleEmitter2D;
    SetScale(SCALE_SEQ: NumberSequence): ParticleEmitter2D;
    SetSpeed(MIN_SPEED: number, MAX_SPEED?: number): ParticleEmitter2D;
    SetSpreadAngle(MIN_SPREAD_ANGLE: number, MAX_SPREAD_ANGLE?: number): ParticleEmitter2D;
    Update(DELTA_TIME: number): void;
}

interface EmitYourParticleModule {
    newEmitter: (WRAPPED_OBJECT: GuiObject) => ParticleEmitter2D;
    newParticle: (EMITTER: ParticleEmitter2D) => Particle2D;
    ParticleEmitter2D: ParticleEmitter2D;
    Particle2D: Particle2D;
}

declare const EmitYourParticleModule: EmitYourParticleModule;
export = EmitYourParticleModule;