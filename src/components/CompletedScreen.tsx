import styled from "styled-components";

import { useGameStore } from "../stores/gameStore";

const CompletedContainer = styled.div`
    background: white;
    color: black;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
    text-align: center;
    max-width: 400px;
    margin: auto;
`;

const Title = styled.h2`
    color: #2ecc71;
`;

const ScoreText = styled.p`
    font-size: 1.2rem;
    margin: 10px 0;
`;

const WrongAnswerList = styled.ul`
    list-style: none;
    padding: 0;
`;

const WrongAnswerItem = styled.li`
    margin: 10px 0;
`;

const RestartButton = styled.button`
    background: #6c7a89;
    color: white;
    border: 2px solid #3b4d61;
    padding: 15px 20px;
    font-size: 1.2rem;
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

export default function CompletedScreen() {
  const gameStore = useGameStore();
  const { maxScore, resetGame, score, wrongAnswers } = gameStore;

  return (
    <CompletedContainer>
      <Title>Spelet är klart!</Title>
      <ScoreText>Din poäng: {score} av {maxScore}</ScoreText>
      {wrongAnswers.length > 0 && (
        <div>
          <h3>Felaktiga svar:</h3>
          <WrongAnswerList>
            {wrongAnswers.map((entry, index) => (
              <WrongAnswerItem key={index}>{entry.num1} × {entry.num2} = {entry.correctAnswer} (du svarade {entry.userAnswer})</WrongAnswerItem>
            ))}
          </WrongAnswerList>
        </div>
      )}
      <RestartButton onClick={resetGame}>Spela igen</RestartButton>
    </CompletedContainer>
  );
}
