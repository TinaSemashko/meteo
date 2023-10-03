import { Typography } from "@mui/material";
import { ForecastDataRaw } from "./types";
import CodeWeather from "./getIcon";
import { weatherCodeDay } from "./codeWeather";

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
          {weatherCodeDay(values?.weatherCodeMax ? values?.weatherCodeMax : 0)}
        </Typography>
        <Typography variant="body1">
          temperature: {Math.round(values?.temperatureAvg)}°C;
        </Typography>
        <Typography variant="body1">
          humidity: {Math.round(values?.humidityAvg)}% ;
        </Typography>
        <Typography variant="body1">
          pressure surface: {values?.pressureSurfaceLevelAvg}mm;
        </Typography>
        <Typography variant="body1">
          wind speed: {values?.windSpeedAvg}km/h;
        </Typography>
      </S.ContainerWeather>
    </S.MainContainer>
  );
};
export default Prevision;
