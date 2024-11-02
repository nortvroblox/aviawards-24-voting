import { UserInputService } from "@rbxts/services";
import { md5 } from "@rbxts/rbxts-hashlib";

const GetFingerprintElements = () => {
	const cpuStart = math.round((tick() - os.clock()) / 100) * 100;
	const timezone = os.date("%Z");
	const isDST = os.date("*t").isdst;
	const hasAccelerometer = UserInputService.AccelerometerEnabled;
	const hasTouchscreen = UserInputService.TouchEnabled;

	return {
		cpuStart,
		timezone,
		isDST,
		hasAccelerometer,
		hasTouchscreen,
	};
};

// check digit, but multiple characters
const createHashWithChecksum = (hash: string) => {
	const hashArray = hash.split("");
	const avgCharCode =
		hashArray.reduce((acc, char) => {
			const charCode = string.byte(char)[0] || 0;
			return acc + charCode;
		}, 0) / hashArray.size();
	const checkDigit = math.floor(avgCharCode % 10);
	return `${hash}${checkDigit}`;
};

const VerifyHashWithChecksum = (hash: string) => {
	const hashArray = hash.split("");
	const checkDigit = tonumber(hashArray.pop());
	const avgCharCode =
		hashArray.reduce((acc, char) => {
			const charCode = string.byte(char)[0] || 0;
			return acc + charCode;
		}, 0) / hashArray.size();
	const expectedCheckDigit = math.floor(avgCharCode % 10);
	return checkDigit === expectedCheckDigit;
};

const GetFingerprint = () => {
	const fingerprintElements = GetFingerprintElements();
	const fingerprintString = `CPU-${fingerprintElements.cpuStart}-TZ-${fingerprintElements.timezone}-DST-${fingerprintElements.isDST}-ACCEL-${fingerprintElements.hasAccelerometer}-TOUCH-${fingerprintElements.hasTouchscreen}`;
	const fingerprintHash = md5(fingerprintString);
	const newHashWithChecksum = createHashWithChecksum(fingerprintHash);

	return newHashWithChecksum;
};

export { GetFingerprint, VerifyHashWithChecksum };
