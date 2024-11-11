import Object from "@rbxts/object-utils";
import { useViewport } from "@rbxts/pretty-react-hooks";
import React, { useState } from "@rbxts/react";

import { Events, Functions } from "client/network";
import categories from "shared/categories";

import type { LoadedController } from "../player/loaded-controller";
import AviawardsBackground from "./components/avi-background";
import Card from "./components/card";
import CurrentCategoryHero from "./components/current-category-hero";
import Popup from "./components/popup";
import Group from "./components/primitive/group";
import Layer from "./components/primitive/layer";
import Sidebar from "./components/sidebar";
import type ConfettiController from "./confetti-controller";
import { useMotion } from "./hooks";
import { usePlayerDataStore } from "./store/player-data-store";
import { usePopupStore } from "./store/popup-store";
import { useSelectedCategoryStore } from "./store/selected-category-store";

const CardHolder = React.memo(
	(
		props: Readonly<{
			category: keyof typeof categories;
			confettiController: ConfettiController;
			Native: Partial<React.InstanceProps<Frame>>;
		}>,
	): React.ReactNode => {
		const setCategoryVotePref = usePlayerDataStore(state => state.setCategoryVotePref);
		const playerData = usePlayerDataStore(state => state.playerData);
		const setPopupMessage = usePopupStore(state => state.setPopupMessage);
		const [lastCategory, setLastCategory] = useState<string | undefined>(undefined);
		const selectedCategory = useSelectedCategoryStore(state => state.selectedCategory);
		const categoryData = categories[props.category];

		const cards = Object.entries(categoryData.options).map(([cardName, cardData], index) => {
			return (
				<Card
					key={`${props.category}-${cardName}`}
					ButtonTweenDelay={index * 0.035}
					Description={cardData.description}
					Hidden={props.category !== selectedCategory}
					Native={{
						LayoutOrder: index,
					}}
					OnClick={() => {
						print(`Clicked on ${cardName}`);
						let isFirstVote = true;
						// is any category not false? if so, then it's not the first vote
						for (const category of Object.keys(playerData.voted)) {
							if (playerData.voted[category] !== false) {
								isFirstVote = false;
								break;
							}
						}

						if (isFirstVote) {
							setPopupMessage(`You've made your first vote 🎉,  Keep going!`);
							props.confettiController.runConfetti();
						}

						print("Setting category vote pref", props.category, cardName);
						setCategoryVotePref(props.category, cardName);
					}}
					Selected={playerData.voted[props.category] === cardName}
					Thumbnail={cardData.image}
					Title={cardName}
				/>
			);
		});

		React.useEffect(() => {
			if (selectedCategory === lastCategory) {
				return;
			}

			setLastCategory(selectedCategory);
		}, [lastCategory, selectedCategory]);

		return (
			<frame
				BackgroundTransparency={1}
				Size={new UDim2(1, 0, 1, 0)}
				{...props.Native}
				Visible={props.category === selectedCategory || props.category === lastCategory}
			>
				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalFlex={Enum.UIFlexAlignment.Fill}
					Padding={new UDim(0, 10)}
					SortOrder={Enum.SortOrder.LayoutOrder}
					VerticalFlex={Enum.UIFlexAlignment.Fill}
					Wraps={true}
				/>
				{cards}
			</frame>
		);
	},
);

const MenuUI = React.memo(
	(
		props: Readonly<{
			confettiController: ConfettiController;
			Native?: Partial<React.InstanceProps<Frame>>;
		}>,
	) => {
		const viewportSize = useViewport();
		const [padding, setPadding] = useState(new UDim(0, 60));

		React.useEffect(() => {
			const paddingValue = viewportSize.getValue().Y < 800 ? 30 : 60;
			setPadding(new UDim(0, paddingValue));
		}, [viewportSize]);

		return (
			<>
				<Group Native={{ ...props.Native, ZIndex: 2 }}>
					<uipadding
						PaddingBottom={padding}
						PaddingLeft={padding}
						PaddingRight={padding}
						PaddingTop={padding}
					/>
					<uilistlayout FillDirection={Enum.FillDirection.Horizontal} />
					<Sidebar />
					<frame BackgroundTransparency={1} Size={new UDim2(1, -300, 1, 0)}>
						<uilistlayout FillDirection={Enum.FillDirection.Vertical} />
						<CurrentCategoryHero Native={{ Size: new UDim2(1, 0, 0, 100) }} />
						<frame BackgroundTransparency={1} Size={new UDim2(1, 0, 1, -100)}>
							<frame BackgroundTransparency={1} Size={new UDim2(1, 0, 1, 0)}>
								{Object.entries(categories).map(([category]) => {
									return (
										<CardHolder
											key={category}
											category={category}
											confettiController={props.confettiController}
											Native={{
												key: category,
												Size: new UDim2(1, 0, 1, 0),
											}}
										/>
									);
								})}
							</frame>
						</frame>
					</frame>
				</Group>
				<Popup Native={{ ZIndex: 3 }} />
			</>
		);
	},
);

export function App({
	env,
}: Readonly<{
	env: { confettiController: ConfettiController; loadedController: LoadedController };
}>): React.ReactNode {
	const setPlayerData = usePlayerDataStore(state => state.setPlayerData);
	const playerData = usePlayerDataStore(state => state.playerData);
	const [backgroundTransparency, backgroundTransparencyMotion] = useMotion(1);
	const [isUsingReal, switchToReal] = useState(false);

	React.useEffect(() => {
		void env.loadedController.waitForLoad().then(() => {
			backgroundTransparencyMotion.spring(0, {
				damping: 10,
				friction: 100,
			});
			switchToReal(true);
		});
	}, [backgroundTransparencyMotion, env.loadedController]);

	React.useEffect(() => {
		void Functions.GetPlayerData().then(data => {
			setPlayerData(data);
		});
	}, [setPlayerData]);

	React.useEffect(() => {
		// we don't need any validation
		// if you ruin your own data, that's on you lol
		// you can't modify other people's data and we aren't storing any sensitive information
		Events.SetPlayerData(playerData);
	}, [playerData]);

	return (
		<Layer key="app">
			<AviawardsBackground
				Native={{
					BackgroundTransparency: backgroundTransparency.map(value => value + 0.4),
					ImageTransparency: backgroundTransparency.map(value =>
						math.clamp(value + 0.1, 0, 0.99),
					),
					Position: new UDim2(-0.2, 0, 0, 0),
					Size: new UDim2(1.4, 0, 1, 0),
				}}
			/>
			{isUsingReal && (
				<MenuUI
					confettiController={env.confettiController}
					Native={{ Visible: isUsingReal, ZIndex: 4 }}
				/>
			)}
		</Layer>
	);
}