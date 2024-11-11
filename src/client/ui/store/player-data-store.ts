import { DATA_TEMPLATE, type Data } from '../../../shared/data-template';
import { create } from "../../../shared/modules/zustand";

type PlayerDataStore = {
    playerData: Data;
    setPlayerData: (data: Data) => void;
    setCategoryVotePref: (category: string, vote: string | false) => void;
};

export const usePlayerDataStore = create<PlayerDataStore>(
    (set) => ({
        playerData: DATA_TEMPLATE,
        // setPlayerData: (data: Data) => set({ playerData: data }),
        setPlayerData: (data: Data) => {
            print("Setting player data", data);
            set({ playerData: data });
        },
        setCategoryVotePref: (category: string, vote: string | false) => {
            set((state) => {
                const newPlayerData = { ...state.playerData, voted: { ...state.playerData.voted, [category]: vote } };
                return { playerData: newPlayerData };
            });
        },
	})
);
