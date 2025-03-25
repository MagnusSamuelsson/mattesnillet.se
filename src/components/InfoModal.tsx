import { VscChromeClose } from "react-icons/vsc";
import styled from "styled-components";

const ModalContainer = styled.div`
    background: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
    color: white;
    padding: 20px;
    position: absolute;
    text-align: center;
    top: 30px;
    width: 70vw;
    max-width: 768px;
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

const H1 = styled.h1`
    font-size: 2rem;
    margin-bottom: 20px;
`;
const H2 = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 20px;
`;
const H3 = styled.h3`
    font-size: 1.2rem;
    margin-bottom: 20px;
`;
const P = styled.p`
    font-size: 1.2rem;
    margin-bottom: 20px;
`;

const UL = styled.ul`
  font-size: 1.2rem;
  margin-bottom: 20px;
  text-align: left;
  padding-left: 20px;
`;

const LI = styled.li`
  margin-bottom: 12px;
  list-style-type: none;
`;

const Copyright = styled.p`
  font-size: 0.8rem;
  color: #ccc;
  margin-top: 40px;
  text-align: center;
`;

const A = styled.a`
  color: white;
  font-weight: bold;
  font-size: 0.8rem;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px white;
  }
`;



interface SettingsModalProps {
  closeInfo: () => void;
}

export default function InfoModal({ closeInfo }: SettingsModalProps) {




  return (
    <ModalContainer>
      <CloseButton
        aria-label="Stäng Informationsrutan"
        onClick={closeInfo}
      >
        <VscChromeClose size={55} color="red" />
      </CloseButton>

      <H1>Välkommen till Mattesnillet!</H1>
      <P>
        Mattesnillet är ett roligt och lärorikt spel för dig som vill träna huvudräkning på ett enkelt och effektivt sätt.
      </P>
      <P>
        Spelet anpassar du själv efter din nivå och hjälper dig att bli snabbare på multiplikation och division.
        Perfekt för barn, vuxna och alla som vill hålla hjärnan i form!
      </P>

      <H2>Hur vi hanterar din information</H2>

      <H3>Vi tar din integritet på största allvar:</H3>
      <UL>
        <LI>Vi använder inga cookies. Du slipper alltså allt krångel med "acceptera-knappar".</LI>
        <LI>Vi samlar inte in någon personlig information.</LI>
        <LI>Dina framsteg sparas bara på din egen enhet, i det som kallas localStorage. Det betyder att:</LI>
        <LI>Dina resultat stannar på din dator, mobil eller surfplatta.</LI>
        <LI>Ingen annan har tillgång till dem – inte ens vi.</LI>
        <LI>Du kan rensa informationen när du vill genom att tömma webbläsarens lagrade data.</LI>
        <LI>Detta sätt att lagra information är helt anonymt och kräver inte att du skapar något konto.</LI>
      </UL>
      <H2> Vill du spela på flera enheter?</H2>
      <P>
        Eftersom datan sparas lokalt, följer dina resultat inte med mellan oLika enheter eller webbläsare.
        Men det gör också att du slipper logga in eller lämna ut något om dig själv.
      </P>
      <Copyright>© {new Date().getFullYear()}
        Mattesnillet.se – Skapat med ❤️ av Magnus Samuelsson
        – Licensierad under GNU GPL v3.
        <br />
        Ingen garanti. <A href="https://www.gnu.org/licenses/" target="_blank" rel="noopener noreferrer">Läs mer</A>
      </Copyright>
    </ModalContainer>
  );
}
