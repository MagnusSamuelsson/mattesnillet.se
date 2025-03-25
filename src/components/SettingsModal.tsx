import { MdOutlineExpandMore } from "react-icons/md";
import { VscChromeClose } from "react-icons/vsc";
import { useState } from "react";
import styled from "styled-components";

import { useGameSettings } from "../stores/gameSettings";

const ModalContainer = styled.div`
    background: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
    color: white;
    padding: 20px;
    position: absolute;
    text-align: center;
    top: 30px;
`;

const TableGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 10px;
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

const TableOption = styled.button<{ selected: boolean }>`
    all: unset;
    background: ${({ selected }) => (selected ? "#2ecc71" : "#EB0000")};
    padding: 15px;
    border-radius: 8px;
    cursor: pointer;
    color: ${({ selected }) => (selected ? "black" : "white")};;
    font-weight: bold;
    transition: background 0.3s;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-family: 'Courier New', monospace;
    box-shadow: inset 0px -4px 0px rgba(0, 0, 0, 0.2);

    &:hover {
        background: ${({ selected }) => (selected ? "#27ae60" : "#e74c3c")};
    }

    &:active {
        background: ${({ selected }) => (selected ? "#1f8c4e" : "#c0392b")};
        box-shadow: inset 0px 2px 0px rgba(0, 0, 0, 0.2);
    }
`;

const MaxAttemptsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
`;

const MaxAttemptsLabel = styled.label`
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #fefbfb;
`;

const MaxAttemptsInput = styled.input`
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 3rem;
    padding: 0.1em 0.5em;
    text-align: center;
    width: 50px;
`;

const AdvancedSettingsToggle = styled.h2`
    cursor: pointer;
`;

const AdvancedSettings = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
`;

interface SettingsModalProps {
  closeSettings: () => void;
}

export default function SettingsModal({ closeSettings }: SettingsModalProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const gameSettings = useGameSettings();
  const {
    tables,
    setGameSettings,
    instantFeedback,
    maxTries,
    shouldShowCorrectAnswer
  } = gameSettings;

  const toggleTable = (table: number) => {
    if (tables.includes(table)) {
      setGameSettings({ tables: tables.filter((t) => t !== table) });
    } else {
      setGameSettings({ tables: [...tables, table] });
    }
  }

  const handleMaxTriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) < 0 || parseInt(e.target.value) > 3) {
      return;
    }
    setGameSettings({ maxTries: parseInt(e.target.value) });
  }

  return (
    <ModalContainer>
      <CloseButton
        aria-label="Stäng inställningar"
        onClick={closeSettings}
      >
        <VscChromeClose size={55} color="red" />
      </CloseButton>
      <h2>Välj tabeller</h2>
      <TableGrid>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((table) => (
          <>
            <TableOption
              aria-pressed={tables.includes(table)}
              key={table}
              selected={tables.includes(table)}
              onClick={() => toggleTable(table)}>
              {table}
            </TableOption>
          </>
        ))}
      </TableGrid>
      <AdvancedSettingsToggle onClick={() => setShowAdvanced(!showAdvanced)}>Avancerade Inställningar
        <MdOutlineExpandMore size={30}/>
      </AdvancedSettingsToggle>
      {showAdvanced && (
        <AdvancedSettings >
          <TableOption
            aria-pressed={instantFeedback}
            selected={instantFeedback}
            onClick={() => {
              setGameSettings({ instantFeedback: !instantFeedback });
            }}>
            Visa feedback direkt
          </TableOption>
          <TableOption
            aria-pressed={shouldShowCorrectAnswer}
            selected={shouldShowCorrectAnswer}
            onClick={() => {
              setGameSettings({ shouldShowCorrectAnswer: !shouldShowCorrectAnswer });
            }}>
            Visa rätt svar
          </TableOption>
          <MaxAttemptsContainer>
            <MaxAttemptsLabel htmlFor="maxTries">
              Max antal försök per fråga
            </MaxAttemptsLabel>
            <MaxAttemptsInput
              type="number"
              id="maxTries"
              value={maxTries}
              onChange={(e) => { handleMaxTriesChange(e) }}
            />
          </MaxAttemptsContainer>
        </AdvancedSettings>
      )}
    </ModalContainer>
  );
}
