import React from "@rbxts/react";

import AviawardsLogo from "./avi-logo";
import CategoriesSelector from "./categories-selector";
import SponsoredByClearly from "./sponsored-by-clearly";

const Sidebar = React.memo(() => {
	return (
		<frame
			AutomaticSize={Enum.AutomaticSize.X}
			BackgroundTransparency={1}
			Position={new UDim2(0, 30, 0, 30)}
			Size={new UDim2(0, 261, 1, 0)}
		>
			<uilistlayout
				SortOrder={Enum.SortOrder.LayoutOrder}
				VerticalFlex={Enum.UIFlexAlignment.SpaceBetween}
			/>
			<AviawardsLogo />
			<CategoriesSelector />
			<SponsoredByClearly />
		</frame>
	);
});

export default Sidebar;
