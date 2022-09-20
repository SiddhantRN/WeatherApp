import * as ActionConstants from './constants';

export function setCountry(item: {}) {
  console.log('country', item);
  return {
    type: ActionConstants.SET_COUNTRY,
    payload: item,
  };
}
export function setUserInputAction(text: string) {
  return {
    type: ActionConstants.SET_USER_INPUT_STATE,
    payload: text,
  };
}
export function setCountryName(name: string) {
  // console.log('country', item);
  return {
    type: ActionConstants.SET_COUNTRY_NAME,
    payload: name,
  };
}
export function searchCountry(query: string) {
  console.log('searchCountry action reached query :', query);
  return {
    type: ActionConstants.COUNTRY_SEARCH,
    payload: query,
  };
}
export function setSearchedResults(results: []) {
  // console.log('searchCountry action reached query :', query);
  return {
    type: ActionConstants.SEARCH_RESULTS,
    payload: results,
  };
}
export function clearSearchedResults() {
  // console.log('searchCountry action reached query :', query);
  return {
    type: ActionConstants.CLEAR_SEARCH_RESULTS,
  };
}
export function fetchWeather(capital: string) {
  return {
    type: ActionConstants.FETCH_WEATHER,
    payload: capital,
  };
}
export function setWeather(weather: {}) {
  // console.log('searchCountry action reached query :', query);
  return {
    type: ActionConstants.SET_WEATHER,
    payload: weather,
  };
}
export function fetchingCountires(value: boolean) {
  // console.log('searchCountry action reached query :', query);
  return {
    type: ActionConstants.FETCHING_COUNTRIES,
    payload: value,
  };
}
export function clearData() {
  // console.log('searchCountry action reached query :', query);
  return {
    type: ActionConstants.CLEAR_DATA,
    // payload: weather,
  };
}
