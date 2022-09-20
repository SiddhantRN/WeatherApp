import {call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ActionConstants from './constants';
import {getCountries} from '../Services/Country/countryServices';
import {getWeather} from '../Services/Weather/weatherServices';
import {
  setSearchedResults,
  fetchWeather,
  setWeather,
  fetchingCountires,
} from './actions';

export default function* watcherSaga() {
  yield takeLatest(ActionConstants.COUNTRY_SEARCH, getCountry);
  yield takeLatest(ActionConstants.FETCH_WEATHER, getWeatherGenerator);
}

export function* getCountry(action: any): Generator<() => {}, void, any> {
  try {
    yield put(fetchingCountires(true));
    const response = yield call(getCountries, action.payload);
    console.log('api response ', response);
    yield put(setSearchedResults(response));
    yield put(fetchingCountires(false));
  } catch (error) {
    console.log('Google login failed');
  }
}
export function* getWeatherGenerator(
  action: any,
): Generator<() => {}, void, any> {
  try {
    const response = yield call(getWeather, action.payload);
    console.log(' getWeather api response ', response);
    yield put(setWeather(response));
  } catch (error) {
    console.log('Google login failed');
  }
}
