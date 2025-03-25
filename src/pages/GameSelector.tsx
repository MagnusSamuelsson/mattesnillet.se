import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { VscInfo, VscSettings } from "react-icons/vsc";

import { useGameStore } from "../stores/gameStore";
import InstallButton from "../components/InstallButton";
import SettingsModal from "../components/SettingsModal";
import InfoModal from "../components/InfoModal";

const SelectionContainer = styled.div`
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

const Title = styled.h1`
    color: #2c3e50;
    margin-bottom: 20px;
`;

const GameCard = styled.div`
    background: white;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    margin: 10px;
    padding: 15px;
    text-align: center;
    width: 80%;
`;

const SettingsButton = styled.button`
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

const InfoButton = styled.button`
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1.5rem;
    position: absolute;
    left: 10px;
    top: 10px;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.2);
    }
`;

const GameButton = styled.button`
    background: #525A60;
    border-radius: 8px;
    border: 2px solid #3b4d61;
    box-shadow: inset 0px -4px 0px #3b4d61;
    color: white;
    cursor: pointer;
    font-family: 'Courier New', monospace;
    font-size: 1.2rem;
    margin-top: 10px;
    padding: 15px 20px;
    text-transform: uppercase;
    transition: all 0.2s;

    &:hover {
        background: #556270;
        box-shadow: inset 0px -2px 0px #3b4d61;
    }

    &:active {
        background: #2f3b46;
        box-shadow: inset 0px 2px 0px #3b4d61;
    }
`;

const Description = styled.p`
    color: #555;
    font-size: 1rem;
    margin-bottom: 10px;
`;

export default function GameSelection() {
  const navigate = useNavigate();
  const { resetGame } = useGameStore();
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <SelectionContainer>
      <Title>Välj ett spel</Title>
      <InfoButton
        aria-label="Information"
        onClick={() => setShowInfo(!showInfo)}
      >
        <VscInfo size={55} color="#141219" />
      </InfoButton>

      {showInfo && <InfoModal closeInfo={() => setShowInfo(false)} />}
      <SettingsButton
        aria-label="Inställningar"
        onClick={() => setShowSettings(!showSettings)}
      >
        <VscSettings size={55} color="#141219" />
      </SettingsButton>
      {showSettings && <SettingsModal closeSettings={() => setShowSettings(false)} />}
      <GameCard>
        <h2>Multiplikation</h2>
        <Description>Träna på multiplikationstabellerna och bli ett mattesnille!</Description>
        <GameButton onClick={() => {
          resetGame();
          navigate("/multiplication");
        }}>Spela Multiplikation</GameButton>
      </GameCard>
      <GameCard>
        <h2>Division</h2>
        <Description>Testa dina kunskaper i division och lär dig räkna snabbare!</Description>
        <GameButton onClick={() => {
          resetGame();
          navigate("/division");
        }}>Spela Division</GameButton>
      </GameCard>
      <InstallButton />
    </SelectionContainer>
  );
}
