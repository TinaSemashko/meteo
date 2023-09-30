import { Typography } from "@mui/material";
import { ForecastDataRaw } from "./types";
import CodeWeather from "./codeWeather";

import * as S from "./prevision.styled";

const Prevision: React.FC<ForecastDataRaw> = ({ values, time }) => {
  return (
    <S.MainContainer>
      <Typography variant="h5" fontFamily="Handlee, cursive">
        {time.slice(0, 10)}
      </Typography>
      <S.ContainerWeather>
        <CodeWeather
          codeIcon={
            values?.weatherCodeMax === undefined
              ? "0"
              : values?.weatherCodeMax.toString()
          }
        />
        <Typography variant="body1">
          temperature: {values?.temperatureAvg};
        </Typography>
        <Typography variant="body1">
          humidity: {values?.humidityAvg};
        </Typography>
        <Typography variant="body1">
          precipitation probability: {values?.precipitationProbabilityAvg};
        </Typography>
        <Typography variant="body1">
          pressure surface: {values?.pressureSurfaceLevelAvg};
        </Typography>
        <Typography variant="body1">
          wind speed: {values?.windSpeedAvg};
        </Typography>
        <Typography variant="body1">
          visibilit: {values?.visibilityAvg};
        </Typography>
      </S.ContainerWeather>
    </S.MainContainer>
  );
};
export default Prevision;
