import {createStackNavigator} from '@react-navigation/stack';

import CountryInput from '../Screens/CountryInput';
import CountryInfo from '../Screens/CountryInfo';
import CountryWeather from '../Screens/CountryWeather';

export type RootStackParams = {
  CountryInput: undefined;
  CountryInfo: undefined;
  CountryWeather: undefined;
};
const {Navigator, Screen} = createStackNavigator<RootStackParams>();

const NavigationStack = () => {
  return (
    <Navigator initialRouteName="CountryInput">
      <Screen
        component={CountryInput}
        name={'CountryInput'}
        options={{headerShown: false}}
      />
      <Screen
        component={CountryInfo}
        name={'CountryInfo'}
        options={{headerShown: false}}
      />
      <Screen
        component={CountryWeather}
        name={'CountryWeather'}
        options={{headerShown: false}}
      />
    </Navigator>
  );
};
export default NavigationStack;
