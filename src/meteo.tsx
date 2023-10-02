import { InputAdornment, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { APIKey } from "./config";
import axios from "axios";
import Prevision from "./prevision";
import { MeteoData, ForecastDataRaw } from "./types";
import CodeWeather from "./codeWeather";

import * as S from "./meteo.styled";

const Meteo: React.FC = () => {
  const [searchCity, setSearchCity] = useState("Paris");
  const [weatherData, setWeatherData] = useState<MeteoData>();
  const [forecastData, setForecastData] = useState<ForecastDataRaw[]>([]);

  const APIUrl = `https://api.tomorrow.io/v4/weather/realtime?location=${searchCity}&apikey=${APIKey}`;
  const APIUrlForecast = `https://api.tomorrow.io/v4/weather/forecast?location=${searchCity}&timesteps=daily&apikey=${APIKey}`;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setSearchCity(event.target.value);
  };

  useEffect(() => {
    const fetchGet = async () => {
      await axios
        .get(APIUrl)
        .then((response) => {
          setWeatherData(response.data.data.values as MeteoData);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    fetchGet();
  }, [searchCity]);

  useEffect(() => {
    const fetchGet = async () => {
      await axios
        .get(APIUrlForecast)
        .then((response) => {
          setForecastData(response.data.timelines.daily as ForecastDataRaw[]);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    fetchGet();
  }, [searchCity]);

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
        sx={{ width: 600 }}
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
        <CodeWeather
          codeIcon={
            weatherData?.weatherCode === undefined
              ? "0"
              : weatherData?.weatherCode.toString()
          }
        />
        <S.Day>
          <Typography variant="h6" color="secondary">
            temperature: {weatherData?.temperature}
          </Typography>
          <Typography variant="h6" color="secondary">
            cloud: {weatherData?.cloudBase};
          </Typography>
          <Typography variant="h6" color="secondary">
            humidity: {weatherData?.humidity}
          </Typography>
          <Typography variant="h6" color="secondary">
            visibility: {weatherData?.visibility}
          </Typography>
          <Typography variant="h6" color="secondary">
            pressure:{weatherData?.pressureSurfaceLevel}
          </Typography>
          <Typography variant="h6" color="secondary">
            wind speed:{weatherData?.windSpeed}
          </Typography>
        </S.Day>
        {forecastData
          .filter((el, index) => index > 0)
          .map((item, index) => (
            <div key={index}>
              <Prevision values={item.values} time={item.time} />;
            </div>
          ))}
      </S.ContainerWeather>
      <footer>
        <p className="text-center mt-5">
          <em>
            This website was coded by Tina Semashko, and is&nbsp;
            <a
              href="https://github.com/TinaSemashko/meteo"
              target="_blank"
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
