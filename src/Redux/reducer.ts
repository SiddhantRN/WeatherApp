import * as ActionConstants from './constants';

interface LoginStateInterface {
  SelectedCountry: {};
  FetchedCountries: [];
  CapitalWeather: {};
  FetchingCountries: boolean;
  SelectedCountryName: string | null;
  UserInputState: string;
}

const initialState: LoginStateInterface = {
  SelectedCountry: {},
  FetchedCountries: [],
  CapitalWeather: {},
  FetchingCountries: false,
  SelectedCountryName: null,
  UserInputState: '',
};

export default (
  state: LoginStateInterface = initialState,
  action,
): LoginStateInterface => {
  switch (action.type) {
    case ActionConstants.SET_COUNTRY:
      return {
        ...state,
        SelectedCountry: action.payload,
      };
    case ActionConstants.SET_COUNTRY_NAME:
      return {
        ...state,
        SelectedCountryName: action.payload,
      };
    case ActionConstants.CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        FetchedCountries: [],
      };
    case ActionConstants.SEARCH_RESULTS:
      return {
        ...state,
        FetchedCountries: action.payload,
      };
    case ActionConstants.SET_WEATHER:
      return {
        ...state,
        CapitalWeather: action.payload,
      };
    case ActionConstants.FETCHING_COUNTRIES:
      return {
        ...state,
        FetchingCountries: action.payload,
      };
    case ActionConstants.SET_USER_INPUT_STATE:
      return {
        ...state,
        UserInputState: action.payload,
      };
    case ActionConstants.CLEAR_DATA:
      return {
        ...state,
        SelectedCountryName: null,
        UserInputState: '',
      };

    default:
      return state;
  }
};
