import { create } from "../../../shared/modules/zustand";

type PopupStore = {
    popupMessage: string;
    popupStartTime: number;
    setPopupMessage: (message: string) => void;
    dismissPopup: () => void;
};

export const usePopupStore = create<PopupStore>(
	(set) => ({
        popupMessage: "",
        popupStartTime: 0,
        setPopupMessage: (message: string) => set({ popupMessage: message, popupStartTime: os.clock() }),
        dismissPopup: () => set({ popupMessage: "", popupStartTime: 0 }),
	})
);
