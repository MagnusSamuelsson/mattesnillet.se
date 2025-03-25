import { create } from "zustand";
import { persist } from "zustand/middleware"

const randomArray = (length: number) => {
  const uniqueNumbers = new Set<number>();

  while (uniqueNumbers.size < length) {
    uniqueNumbers.add(Math.floor(Math.random() * 10) + 1);
  }

  return Array.from(uniqueNumbers);
};

interface GameSettings {
  instantFeedback: boolean;
  maxTries: number;
  setGameSettings: (state: Partial<GameSettings>) => void;
  shouldShowCorrectAnswer: boolean;
  tables: Array<number>;
}
export const useGameSettings = create<GameSettings>()(
  persist(
    (set) => ({
      instantFeedback: true,
      maxTries: 3,
      setGameSettings: (state) => set(state),
      shouldShowCorrectAnswer: true,
      tables: randomArray(3),
    }),
    {
      name: "mattesnillet-settings",
    }
  )
);