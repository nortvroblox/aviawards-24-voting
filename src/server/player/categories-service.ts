import type { OnStart, OnInit } from "@flamework/core";
import { Service } from "@flamework/core";
import type { Logger } from "@rbxts/log";
import { HttpService } from "@rbxts/services";
import { $env } from "rbxts-transform-env";
import { Functions } from "server/network";
import { Categories, Category } from "shared/categories";

const BACKEND_URL = $env.string("BACKEND_URL") ?? "";
const AUTH_TOKEN = $env.string("AUTH_TOKEN") ?? "";

type APIResponse = {
    data: {
        [key: string]: {
            createdAt: string;
            description: string | undefined;
            documentId: string;
            group: string;
            id: number;
            name: string;
            votable: boolean;
            order: number | undefined;
            nominations: [
                {
                    organization: {
                        description: string | undefined;
                        id: number;
                        name: string;
                        thumbnails: [
                            {
                                rbxAssetId: string;
                            }
                        ];
                        updatedAt: string;
                    }
                }
            ];
            publishedAt: string;
            updatedAt: string;
        }
    }
}

@Service({})
export default class CategoriesService implements OnInit {
    categories: Categories = {};
    constructor(private readonly logger: Logger) {}

    private fetchCategories() {
        return HttpService.JSONDecode(HttpService.RequestAsync({
            Url: BACKEND_URL + "/api/categories?populate[nominations][populate][organization][populate][thumbnails][populate]=*&populate[nominations][populate][organization][populate][logo][populate]=*",
            Method: "GET",
            Headers: {
                Authorization: AUTH_TOKEN,
            },
        }).Body) as APIResponse;
    }

    private processCategories(categories: APIResponse) {
        const newCategories: { [key: string]: Category } = {};
        for (const [_, value] of pairs(categories.data)) {
            if (value.votable === false) continue;
            const category = {
                description: value.description ?? "",
                options: {} as Category["options"],
                order: value.order ?? 0,
            };
            for (const nomination of value.nominations) {
                category.options[nomination.organization.name] = {
                    description: nomination.organization.description ?? "",
                    image: `rbxassetid://${nomination.organization.thumbnails[0].rbxAssetId}`,
                };
            }
            newCategories[value.name] = category;
        }
        return newCategories;
    }


    public onInit(): void {
        const categories = this.fetchCategories();
        this.categories = this.processCategories(categories);

        this.logger.Info("Categories fetched", this.categories);
        Functions.GetCategories.setCallback((player) => {
            return this.categories;
        });
    }
}
