import {
  Alert,
  AlertTitle,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { APIKey } from "./config";
import axios from "axios";
import Prevision from "./prevision";
import { MeteoData, ForecastDataRaw } from "./types";
import CodeWeather from "./getIcon";
import { Errors } from "./errors";
import { weatherCode } from "./codeWeather";

import * as S from "./meteo.styled";

const Meteo: React.FC = () => {
  const [searchCity, setSearchCity] = useState("Paris");
  const [weatherData, setWeatherData] = useState<MeteoData>();
  const [forecastData, setForecastData] = useState<ForecastDataRaw[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorStatus, setErrorStatus] = useState("");
  const [errorMessage, setIsErrorMessage] = useState("");

  const APIUrl = `https://api.tomorrow.io/v4/weather/realtime?location=${searchCity}&apikey=${APIKey}`;
  const APIUrlForecast = `https://api.tomorrow.io/v4/weather/forecast?location=${searchCity}&timesteps=daily&apikey=${APIKey}`;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setSearchCity(event.target.value);
  };

  const showError = (status: number, message: string) => {
    setIsError(true);
    setErrorStatus(Errors(status));
    setIsErrorMessage(message);
  };

  useEffect(() => {
    const fetchGet = async () => {
      await axios
        .get(APIUrl)
        .then((response) => {
          setWeatherData(response.data.data.values as MeteoData);
        })
        .catch((err) => {
          showError(err.response.status, err.response.data.status_message);
        });
    };
    fetchGet();
  }, [searchCity, APIUrl]);

  useEffect(() => {
    const fetchGet = async () => {
      await axios
        .get(APIUrlForecast)
        .then((response) => {
          setForecastData(response.data.timelines.daily as ForecastDataRaw[]);
        })
        .catch((err) => {
          showError(err.response.status, err.response.data.status_message);
        });
    };
    fetchGet();
  }, [searchCity, APIUrlForecast]);

  return (
    <S.MainContainer>
      <Typography variant="h3" fontFamily="Handlee, cursive" color="yellow">
        Choisissez une ville
      </Typography>
      <TextField
        id="search"
        type="search"
        label="Search"
        value={searchCity}
        onChange={handleChange}
        sx={{ width: "50vw" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Typography variant="h2" fontFamily="Handlee, cursive" color="primary">
        {searchCity}
      </Typography>
      <S.ContainerWeather>
        <S.Title>
          <CodeWeather
            codeIcon={
              weatherData?.weatherCode === undefined
                ? "0"
                : weatherData?.weatherCode.toString()
            }
          />
          <Typography variant="h6" color="gold" sx={{ textAlign: "center" }}>
            {weatherCode(
              weatherData?.weatherCode ? weatherData?.weatherCode : 0
            )}
          </Typography>
        </S.Title>
        <S.Day>
          <Typography variant="h6" color="secondary">
            temperature:
            {Math.round(
              weatherData?.temperature ? weatherData?.temperature : 0
            )}
            °C
          </Typography>

          <Typography variant="h6" color="secondary">
            humidity:
            {Math.round(weatherData?.humidity ? weatherData?.humidity : 0)}%
          </Typography>
          <Typography variant="h6" color="secondary">
            pressure:{weatherData?.pressureSurfaceLevel}mm
          </Typography>
          <Typography variant="h6" color="secondary">
            wind speed:{weatherData?.windSpeed}km/h
          </Typography>
        </S.Day>
        {forecastData
          .filter((el, index) => index > 0)
          .map((item, index) => (
            <div key={index}>
              <Prevision values={item.values} time={item.time} />;
            </div>
          ))}
        {isError ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <Typography variant="h6" color="red">
              Status: {errorStatus}
            </Typography>
            <Typography variant="h6">{errorMessage}</Typography>
          </Alert>
        ) : (
          ""
        )}
      </S.ContainerWeather>
      <footer>
        <p className="text-center mt-5">
          <em>
            This website was coded by Tina Semashko, and is&nbsp;
            <a
              href="https://github.com/TinaSemashko/meteo"
              rel="noreferrer"
              title="github link that project"
            >
              open-sourced
            </a>
          </em>
        </p>
      </footer>
    </S.MainContainer>
  );
};
export default Meteo;
