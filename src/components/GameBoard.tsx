import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import styled from "styled-components";

import { useGameSettings } from "../stores/gameSettings";
import { useGameStore } from "../stores/gameStore";

const BoardContainer = styled.div`
    align-items: center;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    max-width: 300px;
    min-height: 280px;
    padding: 0 20px;
    width: 100%;

    @media (max-height: 776px) {
        margin-bottom: 10px;
        min-height: 240px;
    }
`;

const QuestionText = styled.h3`
    color: #2c3e50;
    font-size: 2.5rem;
    font-weight: bold;
    margin: 10px 0;

    @media (max-height: 776px) {
        font-size: 2rem;
        margin: 10px 0 0;
    }
`;

const AnswerDisplay = styled.div<{
  $isCorrect: boolean,
  $isWrong: boolean,
}>`
    background: #ecf0f1;
    background: ${({ $isCorrect }) => ($isCorrect ? "#2ecc7040" : "#inherit")};
    background: ${({ $isWrong }) => ($isWrong ? "#e74d3c6c" : "#inherit")};
    border-radius: 8px;
    box-shadow: inset 0px 2px 5px rgba(0, 0, 0, 0.1);
    color: ${({ $isCorrect }) => ($isCorrect ? "white" : "#inherit")};
    color: ${({ $isWrong }) => ($isWrong ? "white" : "inherit")};
    font-size: 1.8rem;
    margin-top: 10px;
    min-width: 80px;
    padding: 15px;
    text-align: center;
`;

const AnswerDisplayContainer = styled.div`
    align-items: baseline;
    display: grid;
    gap: 20px 0;
    grid-template-columns: 1fr 2fr 1fr;
    justify-content: center;
    justify-items: stretch;
    width: 100%;
`;

const EmptyColumn = styled.div`
`;

const TryAgain = styled.div`
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    color: #2c3e50;
    font-family: 'Courier New', monospace;
    font-size: 1.5rem;
    grid-column: 1 / span 3 ;
    padding: 0.25em;

`;

const FeedbackBox = styled.div`
    color: #2c3e50;
    font-size: 2.5rem;
    font-weight: bold;
    margin: 10px 0;

`;

const ThumbWrapper = styled.div`
    align-items: center;
    align-self: center;
    display: flex;
    justify-content: center;
`;

const QuestionNumber = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    margin: 10px 0;

    @media (max-height: 776px) {
        font-size: 1.2rem;
        margin: 0;
    }
`;

interface Question {
  num1: number;
  num2: number;
}

interface GameBoardProps {
  question: Question;
  userAnswer: string | null;
  operator?: string;
}

export default function GameBoard({
  operator = "×",
  question,
  userAnswer,
}: GameBoardProps) {
  const gameSettings = useGameSettings();
  const {
    maxTries
  } = gameSettings;

  const gameStore = useGameStore();
  const {
    feedbackBox,
    isCorrect,
    isWrong,
    maxScore,
    questionIndex,
    tries,
    tryAgain,

  } = gameStore;

  return (
    <BoardContainer>
      <QuestionNumber>
        Fråga {questionIndex + 1} av {maxScore}
      </QuestionNumber>
      {feedbackBox &&
        <FeedbackBox aria-live="polite">
          {question.num1} {operator} {question.num2} = {question.num1 * question.num2}
        </FeedbackBox>
      }
      {!feedbackBox &&
        <QuestionText>
          {question.num1} {operator} {question.num2} = ?
        </QuestionText>
      }
      <AnswerDisplayContainer>
        <EmptyColumn />
        <AnswerDisplay $isCorrect={isCorrect} $isWrong={isWrong} >{userAnswer || "..."}</AnswerDisplay>
        <ThumbWrapper>
          {isCorrect && <FaRegThumbsUp size={50} color="#2ecc71" />}
          {isWrong && <FaRegThumbsDown size={50} color="#e20707" />}
        </ThumbWrapper>
        {tryAgain &&
          <TryAgain aria-live="polite">
            Försök igen!<br />
            {maxTries - tries + 1} av {maxTries} försök kvar.
          </TryAgain>
        }
      </AnswerDisplayContainer>
    </BoardContainer>
  );
}