// @ts-ignore
import {API_KEY} from 'react-native-dotenv';

export const getWeather = (capital: string) => {
  return fetch(
    `http://api.weatherstack.com/current?access_key=${API_KEY.replace(
      /[,;]$/,
      '',
    )}&query=${capital}`,
  )
    .then(res => res.json())
    .then(res => {
      return res;
    });
};
