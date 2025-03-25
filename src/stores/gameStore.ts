import { create } from "zustand";
import { persist } from "zustand/middleware"

import { useGameSettings } from "./gameSettings";


function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

type Question = {
  num1: number;
  num2: number;
};


interface GameStore {
  cancelSleep: () => void;
  feedbackBox: boolean;
  gameCompleted: boolean;
  generateQuestions: (tables: number[]) => void;
  isCorrect: boolean;
  isWrong: boolean;
  maxScore: number;
  paused: boolean;
  questionIndex: number;
  questions: Array<Question>;
  resetGame: () => void;
  userAnswer: string;
  score: number;
  setCurrentQuestionIndex: (state: number) => void;
  setFeedbackBox: (state: boolean) => void;
  setGameCompleted: (state: boolean) => void;
  setGameStore: (state: Partial<GameStore>) => void;
  setUserAnswer: (state: string) => void;
  setWrongAnswers: (state: Array<{ num1: number; num2: number; correctAnswer: number; userAnswer: number }>) => void;
  sleep: (ms: number) => Promise<void>;
  timeOutRef: number | null;
  tries: number;
  tryAgain: boolean;
  wakeUp: (() => void) | null;
  wrongAnswers: Array<{ num1: number; num2: number; correctAnswer: number; userAnswer: number }>;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      feedbackBox: false,
      gameCompleted: false,
      isCorrect: false,
      isWrong: false,
      maxScore: 0,
      paused: false,
      questionIndex: 0,
      userAnswer: "",
      questions: [],
      score: 0,
      timeOutRef: null,
      tries: 1,
      tryAgain: false,
      wrongAnswers: [],

      cancelSleep: () => {
        const { timeOutRef, wakeUp } = get();
        if (timeOutRef) {
          clearTimeout(timeOutRef);
          set({ timeOutRef: null, paused: false });
          if (wakeUp) wakeUp();
        }
      },

      generateQuestions: (tables: number[]) => {
        const newQuestions: { num1: number; num2: number }[] = [];
        tables.forEach(table => {
          for (let i = 1; i <= 10; i++) {
            newQuestions.push({ num1: table, num2: i });
          }
        }
        );
        shuffleArray(newQuestions);
        set({ maxScore: newQuestions.length, questions: newQuestions });
      },

      resetGame: () => {
        const { generateQuestions } = get();
        const { tables } = useGameSettings.getState();
        set({
          feedbackBox: false,
          isCorrect: false,
          isWrong: false,
          maxScore: 0,
          paused: false,
          questionIndex: 0,
          questions: [],
          wrongAnswers: [],
          score: 0,
          tries: 1,
          tryAgain: false,
          gameCompleted: false,
        });
        generateQuestions(tables);
      },

      setCurrentQuestionIndex: (state) => set({ questionIndex: state }),
      setFeedbackBox: (state) => set({ feedbackBox: state }),
      setGameCompleted: (state) => set({ gameCompleted: state }),
      setGameStore: (state) => set(state),
      setUserAnswer: (state) => set({ userAnswer: state }),
      setWrongAnswers: (state) => set({ wrongAnswers: state }),
      sleep: async (ms: number): Promise<void> => {
        set({ paused: true });
        return new Promise((resolve) => {
          const timeoutId = setTimeout(() => {
            set({ paused: false, timeOutRef: null, wakeUp: null });
            resolve();
          }, ms);

          set({ timeOutRef: timeoutId, wakeUp: resolve });
        });
      },

      wakeUp: null as (() => void) | null,
    }),
    {
      name: "mattesnillet-game",
    }
  ));
