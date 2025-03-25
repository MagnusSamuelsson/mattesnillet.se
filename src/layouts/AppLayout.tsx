import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Main = styled.main`
  padding: 5px;
`;

export function AppLayout() {
  return (
    <>
      <Main>
        <Outlet />
      </Main>
    </>
  );
}
