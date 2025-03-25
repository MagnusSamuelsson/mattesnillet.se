import { useCallback, useEffect } from "react";
import styled from "styled-components";

import { useGameStore } from "../stores/gameStore";

const NumberPadContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    max-width: 300px;
    min-width: 220px;
    margin: auto;
    background: #2c3e50;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;

const NumberButton = styled.button`
    background: #6c7a89;
    color: white;
    border: 2px solid #3b4d61;
    padding: 15px;
    font-size: 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Courier New', monospace;
    text-transform: uppercase;
    box-shadow: inset 0px -4px 0px #3b4d61;
    text-align: center;

    &:hover {
        background: #556270;
        box-shadow: inset 0px -2px 0px #3b4d61;
    }

    &:active {
        background: #2f3b46;
        box-shadow: inset 0px 2px 0px #3b4d61;
    }
`;

const BackspaceButton = styled(NumberButton)`
    background: #f39c12;
    border-color: #d68910;
    color: #404040;
    box-shadow: inset 0px -4px 0px #d68910;

    &:hover {
        background: #e67e22;
        box-shadow: inset 0px -2px 0px #d68910;
    }

    &:active {
        background: #ba6a15;
        box-shadow: inset 0px 2px 0px #d68910;
    }
`;

const SubmitButton = styled(NumberButton)`
    background: #2ecc71;
    border-color: #27ae60;
    color: #404040;
    box-shadow: inset 0px -4px 0px #27ae60;

    &:hover {
        background: #27ae60;
        box-shadow: inset 0px -2px 0px #1f8c4e;
    }

    &:active {
        background: #1f8c4e;
        box-shadow: inset 0px 2px 0px #1f8c4e;
    }
`;

interface NumberPadProps {
  checkAnswer: () => void;
}

export default function NumberPad({ checkAnswer }: NumberPadProps) {
  const gameStore = useGameStore();
  const {
    userAnswer,
    setUserAnswer,
    cancelSleep,
  } = gameStore;

  const handleButtonClick = useCallback((value: number) => {
    if (userAnswer.length >= 3) return;

    if (userAnswer.length === 0 && value === 0) return;

    if (gameStore.paused) {
      cancelSleep();
      return;
    }
    setUserAnswer(userAnswer + value);
  }, [gameStore.paused, setUserAnswer, userAnswer, cancelSleep]);

  const backspace = useCallback(() => {
    if (gameStore.paused) return;
    setUserAnswer(userAnswer.slice(0, -1));
  }, [gameStore.paused, setUserAnswer, userAnswer]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key >= "0" && event.key <= "9") {
      handleButtonClick(Number(event.key));
    }
    if (event.key === "Backspace") {
      if (gameStore.paused) {
        cancelSleep();
        return;
      }
      backspace();
    }
    if (event.key === "Enter") {
      if (gameStore.paused) {
        cancelSleep();
        return;
      }
      checkAnswer();
    }
  }, [handleButtonClick, backspace, checkAnswer, gameStore.paused, cancelSleep]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <NumberPadContainer>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
        <NumberButton
          key={num}
          onClick={() => handleButtonClick(num)}
        >
          {num}
        </NumberButton>
      ))}
      <BackspaceButton onClick={backspace}>⌫</BackspaceButton>
      <SubmitButton onClick={checkAnswer}>✔</SubmitButton>
    </NumberPadContainer>
  );
}
