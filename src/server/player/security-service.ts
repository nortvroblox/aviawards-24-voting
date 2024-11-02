import {
    GroupService,
    HttpService,
    MarketplaceService,
    MemoryStoreService,
    Players,
} from "@rbxts/services";

import { $NODE_ENV } from "rbxts-transform-env";
import { Functions } from "../network";
import KickCode from "types/enum/kick-reason";
import type { Logger } from "@rbxts/log";
import type { OnStart } from "@flamework/core";
import type PlayerRemovalService from "./player-removal-service";
import { Service } from "@flamework/core";
import { VerifyHashWithChecksum } from "../../shared/functions/get-fingerprint";

// const AffiliateKeywords = [
const AFFILIATE_KEYWORDS = [
	"avi",
	"airline",
	"tech",
	"airways",
	"air",
	"airport",
	"flight",
	"carrier",
	"A3",
	"Boeing",
	"Airbus",
	"737",
	"787",
	"747",
	"777",
	"A320",
	"A321",
	"A330",
	"A350",
	"A380",
	"A220",
	"A319",
	"A318",
	"flag carrier",
	"star alliance",
	"oneworld",
	"skyteam",
	"aviation",
	"aircraft",
	"airline alliance",
	"airline holding company",
	"airline group",
	"airline company",
	"airline corporation",
];

// in sec, 45 days
// eslint-disable-next-line ts/no-magic-numbers -- jesus do you want me to make a const for everything
const MAX_FINGERPRINT_TIME = 60 * 60 * 24 * 45;
const VERIFIED_HAT_ID = 102611803;
const FINGERPRINT_DUPLICATE_DATABASE = MemoryStoreService.GetHashMap(
	"FingerprintDuplicate"
);

@Service({ loadOrder: 0 })
export class SecurityService implements OnStart {
	constructor(
		private readonly logger: Logger,
		private readonly playerRemovalService: PlayerRemovalService
	) {}

	private readonly isAnyGroupAffiliated = (player: Player): boolean => {
		const playerGroupList = GroupService.GetGroupsAsync(player.UserId);
		for (const group of playerGroupList) {
			const groupInfo = this.getGroupInfo(group.Id);
			const groupAffiliation = this.getGroupAffiliation(
				groupInfo.groupName,
				groupInfo.groupDescription,
				groupInfo.groupAlliesNames,
				groupInfo.groupAlliesDescriptions
			);
			const groupAffiliationThreshold = 0.1;
			this.logger.Debug(
				`Group Affiliation: ${groupAffiliation} for group ${groupInfo.groupName}`
			);
			if (groupAffiliation > groupAffiliationThreshold) {
				this.logger.Info(
					`Player is affiliated with group: ${groupInfo.groupName}`
				);
				return true;
			}
            // does user exist in game anymore?
            if (player.Parent === undefined) {
                return false;
            }
		}

		return false;
	};

	private readonly isGroupTextAffiliated = (groupText: string): number => {
		// how many keywords are in the group text
		let totalHitWordsCombinedLength = 0;
		const affiliateKeywordsCount = AFFILIATE_KEYWORDS.reduce(
			(accumulator, keyword) => {
				if (groupText.lower().find(keyword.lower())[0] !== undefined) {
					const totalHitCombinedLength = keyword
						.lower()
						.split(" ")
						.size();
					totalHitWordsCombinedLength += totalHitCombinedLength;
					return accumulator + 1;
				}

				return accumulator;
			},
			0
		);

		return totalHitWordsCombinedLength / affiliateKeywordsCount;
	};

	private readonly getGroupAffiliation = (
		groupName: string,
		groupDescription: string,
		groupAlliesNames: Array<string>,
		groupAlliesDescriptions: Array<string>
	): number => {
		let groupNameAffiliation = this.isGroupTextAffiliated(groupName);
		let groupDescriptionAffiliation =
			this.isGroupTextAffiliated(groupDescription);
		let groupAlliesAffiliation = groupAlliesNames.reduce(
			(accumulator, allyName) =>
				accumulator + this.isGroupTextAffiliated(allyName),
			0
		);
		let alliesAffiliation = groupAlliesDescriptions.reduce(
			(accumulator, allyDescription) => {
				return (
					accumulator + this.isGroupTextAffiliated(allyDescription)
				);
			},
			0
		);

		// if groupAlliesAffiliation is nan/0, set it to 1
		if (
			groupAlliesAffiliation === 0 ||
			groupAlliesAffiliation !== groupAlliesAffiliation
		) {
			groupAlliesAffiliation = 0;
		}

		if (
			alliesAffiliation === 0 ||
			alliesAffiliation !== alliesAffiliation
		) {
			alliesAffiliation = 0;
		}

		if (
			groupDescriptionAffiliation === 0 ||
			groupDescriptionAffiliation !== groupDescriptionAffiliation
		) {
			groupDescriptionAffiliation = 0;
		}

		if (
			groupNameAffiliation === 0 ||
			groupNameAffiliation !== groupNameAffiliation
		) {
			groupNameAffiliation = 0;
		}

		const groupNameAffiliationWeight = 3;
		const descAffiliationWeight = 1;
		const groupAlliesAffiliationWeight = 2;
		const alliesAffiliationWeight = 1;
		const totalWeight = 7;
		const weightModifier = 10;

		return (
			((groupNameAffiliation * groupNameAffiliationWeight +
				groupDescriptionAffiliation * descAffiliationWeight +
				groupAlliesAffiliation * groupAlliesAffiliationWeight +
				alliesAffiliation * alliesAffiliationWeight) /
				totalWeight) *
			weightModifier
		);
	};

	private readonly getGroupInfo = (
		groupId: number
	): {
		groupAlliesDescriptions: Array<string>;
		groupAlliesNames: Array<string>;
		groupDescription: string;
		groupName: string;
	} => {
		let groupName = "";
		let groupDescription = "";
		const groupAlliesNames = [];
		const groupAlliesDescriptions = [];
		try {
			const groupInfoData = GroupService.GetGroupInfoAsync(groupId);
			groupName = groupInfoData.Name;
			groupDescription = groupInfoData.Description;
		} catch (err) {
			this.logger.Warn(`Error: ${err}`);
		}

		try {
			const groupAlliesPages = (
				HttpService.JSONDecode(
					HttpService.GetAsync(
						`https://groups.roproxy.com/v1/groups/${groupId}/relationships/allies?maxRows=50&sortOrder=Asc&startRowIndex=0`
					)
				) as {
					relatedGroups: Array<{ description: string; name: string }>;
				}
			).relatedGroups;
			for (const ally of groupAlliesPages) {
				groupAlliesNames.push(ally.name);
				groupAlliesDescriptions.push(ally.description);
			}
		} catch (err) {
			this.logger.Warn(`Error: ${err}`);
		}

		return {
			groupAlliesDescriptions,
			groupAlliesNames,
			groupDescription,
			groupName,
		};
	};

	private readonly fingerprintDuplicateCheck = (
		fingerprint: string,
		userId: number
	): boolean => {
		const fingerprintQuery =
			FINGERPRINT_DUPLICATE_DATABASE.GetAsync(fingerprint);
		if (fingerprintQuery !== undefined && fingerprintQuery !== userId) {
			this.logger.Warn(`Fingerprint is a duplicate: ${fingerprint}`);
			return false;
		}

		return true;
	};

	private readonly fingerprintCheck = async (
		player: Player
	): Promise<KickCode | string> => {
		const awaitFingerprintStart = os.clock();
		return new Promise((resolve, reject) => {
			Functions.GetFingerprint.invoke(player)
				.then((fingerprint) => {
					const awaitFingerprintEnd = os.clock();
					const isFingerprintValid =
						VerifyHashWithChecksum(fingerprint);
					if (!isFingerprintValid) {
						// $print(`Fingerprint is invalid: ${fingerprint}`);
						this.logger.Warn(
							`Fingerprint is invalid: ${fingerprint}`
						);
						reject(KickCode.PlayerInvalidFingerprint);
						return;
					}

					const fingerprintQuery = this.fingerprintDuplicateCheck(
						fingerprint,
						player.UserId
					);
					if (!fingerprintQuery) {
						reject(KickCode.PlayerInstantiationError);
						return;
					}

					FINGERPRINT_DUPLICATE_DATABASE.SetAsync(
						fingerprint,
						player.UserId,
						MAX_FINGERPRINT_TIME
					);

					this.logger.Info(`Fingerprint: ${fingerprint}`);
					this.logger.Info(
						`Awaited for ${awaitFingerprintEnd - awaitFingerprintStart} seconds`
					);
					// return fingerprint;
					resolve(fingerprint);
				})
				.catch((err) => {
					this.logger.Warn(`Failed to get fingerprint: ${err}`);
					reject(KickCode.PlayerFingerprintTimeout);
				});
		});
	};

	public onStart(): void {
		Players.PlayerAdded.Connect((player) => {
			void (async () => {
				// wait for 5s
				this.logger.Info(`Player ${player.UserId} joined the game`);
				// Fingerprint check
				print("Fingerprint check");
				const fingerprint = await this.fingerprintCheck(player).catch(
					() => {
						this.logger.Warn(
							`Fingerprint check failed: ${fingerprint}`
						);
						this.playerRemovalService.removeForSecurity(
							player,
							fingerprint as unknown as KickCode
						);
					}
				);

				// --- Security Score --- //
				// 1. At least one group that is affiliated, threshold is 0.1
				const anyGroupAffiliated = this.isAnyGroupAffiliated(player);

				if (!anyGroupAffiliated) {
					this.playerRemovalService.removeForSecurity(
						player,
						KickCode.PlayerNoAffiliatedGroup
					);
				}

				const friendsThreshold = 10;
				const playerFriends = Players.GetFriendsAsync(player.UserId);
				try {
					const firstPageFriends = playerFriends.GetCurrentPage();
					if (firstPageFriends.size() < friendsThreshold) {
						this.logger.Info(`Player has less than 10 friends`);
					}
				} catch (err) {
					this.logger.Warn(`Failed to get friends: ${err}`);
				}

				const isPlayerVerified =
					player.IsVerified() || $NODE_ENV === "development";
				if (!isPlayerVerified) {
					this.playerRemovalService.removeForSecurity(
						player,
						KickCode.PlayerNotVerified
					);
				}

				const ageThreshold = 30;
				const accountAge = player.AccountAge;
				if (accountAge < ageThreshold) {
					this.playerRemovalService.removeForSecurity(
						player,
						KickCode.PlayerAccountAge
					);
				}

				if (
					!MarketplaceService.PlayerOwnsAsset(player, VERIFIED_HAT_ID)
				) {
					this.playerRemovalService.removeForSecurity(
						player,
						KickCode.PlayerNotVerifiedId
					);
				}

				this.logger.Info(
					`Player ${player.UserId} passed security checks`
				);
			})();
		});
	}
}
