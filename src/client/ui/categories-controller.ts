import type { OnStart } from "@flamework/core";
import { Controller } from "@flamework/core";
import type { Logger } from "@rbxts/log";
import { RunService } from "@rbxts/services";
import { Functions } from "client/network";
import { Categories } from "shared/categories";

@Controller({})
export default class CategoriesController implements OnStart {
    categories: Categories = {};
	constructor(private readonly logger: Logger) {}

	public onStart(): void {
        this.logger.Info("CategoriesController started");
        let lastUpdate = 0;
        RunService.Heartbeat.Connect(async () => {
            if (os.clock() - lastUpdate < 2) return;
            lastUpdate = os.clock();
            const categories = await Functions.GetCategories();
            this.categories = categories;
        });
    }

	public getCategories(): Categories {
        return this.categories;
	}
}
