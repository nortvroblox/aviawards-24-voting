import { Controller } from "@flamework/core";
import { Functions } from "../network";
import { GetFingerprint } from "../../shared/functions/get-fingerprint";
import type { OnInit } from "@flamework/core";

@Controller({ loadOrder: 0 })
export class SecurityController implements OnInit {
	public Fingerprint = "";
	public onInit(): void {
		Functions.GetFingerprint.setCallback(() => this.getFingerprint());

		this.getFingerprint();
	}

	public getFingerprint(): string {
		this.Fingerprint =
			this.Fingerprint.size() > 0 ? this.Fingerprint : GetFingerprint();
		return this.Fingerprint;
	}
}
