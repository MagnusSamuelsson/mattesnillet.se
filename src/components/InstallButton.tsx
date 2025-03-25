import { useEffect, useState } from "react";
import styled from "styled-components";

const InstallButtonStyled = styled.button`
    background: #2ecc71;
    color: #262626;
    border: none;
    padding: 10px 15px;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;
    font-family: 'Courier New', monospace;
    text-transform: uppercase;
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

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handler = (event: any) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setShowButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("Användaren installerade PWA:n");
        } else {
          console.log("Användaren avbröt installationen");
        }
        setDeferredPrompt(null);
        setShowButton(false);
      });
    }
  };

  if (!showButton) return null;

  return <InstallButtonStyled onClick={handleInstallClick}>📲 Installera appen</InstallButtonStyled>;
}
