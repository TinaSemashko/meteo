import { styled } from "@mui/material/styles";
import img from "./images/pexels-johannes-plenio-1118873.jpg";

export const MainContainer = styled("div")`
  background-image: url(${img});
  background-size: cover;
  width: 100%;
  min-height: 100vh;
  color: maroon;
`;

export const ContainerWeather = styled("div")`
  display: grid;
  grid-template-columns: repeat(1fr, 5);
  grid-template-rows: 3;

  @media (max-width: 750px) {
    grid-template-columns: 1fr;
    grid-template-rows: 7;
  }
`;

export const Day = styled("div")`
  grid-column: 1 / span 5;
  display: grid;
  grid-template-columns: 50% 50%;
  padding-bottom: 2vh;
  padding-top: 2vh;
  color: #360404;

  @media (max-width: 750px) {
    grid-column: 1;
    display: flex;
    flex-direction: column;
  }
`;

export const Title = styled("div")`
  grid-column: 1 / span 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 750px) {
    grid-column: 1;
  }
`;
