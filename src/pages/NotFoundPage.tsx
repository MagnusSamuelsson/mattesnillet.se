import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NotFoundContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    background: linear-gradient(to right, #eef2f3, #8e9eab);
    font-family: Arial, sans-serif;
`;

const Title = styled.h1`
    font-size: 3rem;
    color: #e74c3c;
    margin-bottom: 10px;
`;

const Message = styled.p`
    font-size: 1.2rem;
    color: #555;
`;

const HomeButton = styled.button`
    margin-top: 20px;
    background: #3498db;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
    font-family: 'Courier New', monospace;
    text-transform: uppercase;
    box-shadow: inset 0px -4px 0px #2980b9;

    &:hover {
        background: #2980b9;
        box-shadow: inset 0px -2px 0px #1f8c4e;
    }

    &:active {
        background: #1f8c4e;
        box-shadow: inset 0px 2px 0px #1f8c4e;
    }
`;

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Message>Sidan du söker verkar inte finnas.</Message>
      <HomeButton onClick={() => navigate("/")}>⬅ Tillbaka till startsidan</HomeButton>
    </NotFoundContainer>
  );
}