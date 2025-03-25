import { VscChromeClose, VscDebugRestart } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import CompletedScreen from "../components/CompletedScreen";
import GameBoard from "../components/GameBoard";
import NumberPad from "../components/NumberPad";
import { useGameLogic } from "../hooks/gameLogic";
import { useGameStore } from "../stores/gameStore";

const Header = styled.h1`
    font-size: 2rem;
    margin: 20px;

    @media (max-height: 776px) {
        font-size: 1.5rem;
        margin: 10px 0 0;

    }
`;

const RestartButton = styled.button`
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1.5rem;
    position: absolute;
    right: 10px;
    top: 10px;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.2);
    }
`;

const GameContainer = styled.div`
    align-items: center;
    background: linear-gradient(to right, #eef2f3, #8e9eab);
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    font-family: Arial, sans-serif;
    margin: auto;
    max-width: 400px;
    padding: 20px;
    position: relative;
    text-align: center;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    left: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: white;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.2);
    }
`;

export default function MultiplicationGame() {
  const gameStore = useGameStore();
  const {
    gameCompleted,
    questionIndex,
    questions,
    userAnswer,
    resetGame
  } = gameStore;
  const {
    handleAnswer,
  } = useGameLogic();

  const navigate = useNavigate();

  const checkAnswer = (): boolean => {
    const { num2 } = questions[questionIndex];
    const correctAnswer = num2;
    if (parseInt(userAnswer) === correctAnswer) {
      return true;
    } else {
      return false;

    }
  }

  return (
    <GameContainer>
      <CloseButton
        aria-label="Stäng spelet"
        onClick={() => navigate("/")
        }>
        <VscChromeClose size={55} color="red" />
      </CloseButton>
      <RestartButton
        aria-label="Starta om spelet"
        onClick={() => resetGame()}
      >
        <VscDebugRestart size={55} />
      </RestartButton>
      <Header>Division</Header>
      {gameCompleted ? (
        <CompletedScreen />
      ) : (
        <>
          {questions.length > 0 && questions[questionIndex] ? (
            <GameBoard
              question={{
                num1: questions[questionIndex].num2 * questions[questionIndex].num1,
                num2: questions[questionIndex].num1
              }}
              userAnswer={userAnswer}
              operator="÷"
            />
          ) : (
            <p>Välj minst en tabell i inställningarna</p>
          )}
          <NumberPad
            checkAnswer={() => handleAnswer(checkAnswer())}
          />
        </>
      )}
    </GameContainer>
  );
}