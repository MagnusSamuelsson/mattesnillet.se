import { useGameSettings } from "../stores/gameSettings";
import { useGameStore } from "../stores/gameStore";

export function useGameLogic() {
  const {
    paused,
    tries,
    questionIndex,
    userAnswer,
    questions,
    maxScore,
    score,
    wrongAnswers,
    setGameStore,
    setWrongAnswers,
    sleep,
    cancelSleep,
    generateQuestions,
    resetGame,
  } = useGameStore();
  const {
    instantFeedback,
    maxTries,
    shouldShowCorrectAnswer,
  } = useGameSettings();

  const handleAnswer = async (answer: boolean): Promise<void> => {

    if (paused) return;
    if (tries === maxTries + 1) return;
    if (userAnswer === "") return;

    if (answer) {
      await handleCorrectAnswer();
    } else {
      await handleWrongAnswer();
    }

  };

  const handleCorrectAnswer = async (): Promise<void> => {
    setGameStore({ isCorrect: instantFeedback });
    setGameStore({ feedbackBox: false });
    setGameStore({ score: score + 1 })
    moveOn();
  }
  const handleWrongAnswer = async (): Promise<boolean> => {

    setGameStore({ isWrong: instantFeedback });

    const { num1, num2 } = questions[questionIndex];
    const correctAnswer = num1 * num2;
    if (tries < maxTries && instantFeedback) {
      tryAgain();
      return true;
    }

    setGameStore({ tries: tries + 1 });

    if (shouldShowCorrectAnswer) {
      setGameStore({ feedbackBox: true });
      await sleep(5000);
    } else if (instantFeedback) {
      await sleep(1000);
    }
    setWrongAnswers([
      ...wrongAnswers,
      {
        num1,
        num2,
        correctAnswer,
        userAnswer: parseInt(userAnswer)
      }
    ]);
    moveOn(true);
    return false;
  }

  const tryAgain: () => Promise<void> = async () => {
    setGameStore({ tries: tries + 1 });
    setGameStore({ tryAgain: true });
    await sleep(1000);

    setGameStore({ isCorrect: false, isWrong: false, userAnswer: "" });
  }

  const moveOn = async (instant: boolean = !instantFeedback): Promise<void> => {
    if (!instant) await sleep(1000);
    setGameStore({
      feedbackBox: false,
      isCorrect: false,
      isWrong: false,
      tries: 1,
      tryAgain: false,
      userAnswer: "",
    });
    if (questionIndex < maxScore - 1) {
      setGameStore({
        questionIndex: questionIndex + 1
      });
    } else {
      setGameStore({
        gameCompleted: true
      });
    }
  };

  const randomArray = (length: number) => {
    const uniqueNumbers = new Set<number>();

    while (uniqueNumbers.size < length) {
      uniqueNumbers.add(Math.floor(Math.random() * 10) + 1);
    }

    return Array.from(uniqueNumbers);
  };

  return {
    cancelSleep,
    generateQuestions,
    handleAnswer,
    moveOn,
    randomArray,
    resetGame,
    setWrongAnswers,
    sleep,
  };
}
