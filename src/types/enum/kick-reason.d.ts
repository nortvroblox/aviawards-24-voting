declare const enum KickCode {
	// Player data related
	PlayerProfileUndefined,
	PlayerProfileReleased,
	PlayerInstantiationError,

	// Game related
	PlayerFullServer,

	// Security related
	PlayerInvalidFingerprint,
	PlayerFingerprintTimeout,
	PlayerFingerprintDuplicate,
	PlayerNoAffiliatedGroup,
	PlayerNotVerifiedId,
	PlayerNotVerified,
	PlayerAccountAge,
}

export default KickCode;
