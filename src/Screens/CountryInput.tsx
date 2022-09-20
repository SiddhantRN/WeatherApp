import React, {type PropsWithChildren, useState, useEffect} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import _ from 'lodash';
import {connect} from 'react-redux';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import DropDown from '../Components/DropDown';
import {height, width} from '../Utils/constants';
import {
  searchCountry,
  setCountryName,
  setUserInputAction,
  clearSearchedResults,
} from '../Redux/actions';
import {RootStackParams} from '../Navigation/stackNavigator';

type ComponentProps = {
  dispatchearchCountry: (query: string) => void;
  dispatchSetCountryName: (query: string) => void;
  dispatchSetUserInputAction: (text: string) => void;
  dispatchClearSearchedResults: () => void;
  SelectedCountry: {};
  SelectedCountryName: string;
  UserInputState: string;
  navigation: NativeStackNavigationProp<RootStackParams, 'CountryInfo'>;
};

const CountryInput = ({
  dispatchearchCountry,
  navigation,
  SelectedCountry,
  SelectedCountryName,
  UserInputState,
  dispatchSetCountryName,
  dispatchClearSearchedResults,
  dispatchSetUserInputAction,
}: ComponentProps) => {
  const [userInput, setUserInput] = useState<string>('');

  useEffect(() => {
    setUserInput('');
  }, []);
  const searchCalls = _.debounce(query => {
    if (UserInputState != '') {
      dispatchClearSearchedResults();
      dispatchearchCountry(query);
    }
  }, 3000);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={SelectedCountryName}
        placeholder={'Enter Country'}
        onChangeText={text => {
          dispatchSetUserInputAction(text);
          dispatchSetCountryName(null);
          if (text !== '') {
            searchCalls(text);
          }
        }}></TextInput>
      {UserInputState == '' || SelectedCountryName != null ? null : (
        <DropDown />
      )}
      <TouchableOpacity
        disabled={UserInputState == '' || SelectedCountryName == null}
        style={[
          styles.submitButton,
          {
            backgroundColor:
              UserInputState == '' || SelectedCountryName == null
                ? 'grey'
                : '#af2541',
          },
        ]}
        onPress={() => navigation.navigate('CountryInfo')}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={{height: 50, width: 50, backgroundColor: 'pink'}}
        onPress={() =>
          console.log(UserInputState, SelectedCountryName)
        }></TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'pink',
    alignItems: 'center',
  },
  input: {
    height: height * 0.08,
    width: width * 0.9,
    marginTop: height * 0.2,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#F48FB1',
  },
  submitButton: {
    position: 'absolute',
    bottom: 10,
    height: height * 0.08,
    width: width * 0.9,
    borderRadius: 10,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const mapStateToProps: any = (state: any) => ({
  SelectedCountry: state.appReducer.SelectedCountry,
  SelectedCountryName: state.appReducer.SelectedCountryName,
  UserInputState: state.appReducer.UserInputState,
});

const mapDispatchToProps: any = (dispatch: any) => {
  return {
    dispatchearchCountry: (query: string) => {
      dispatch(searchCountry(query));
    },
    dispatchSetCountryName: (capital: string) => {
      dispatch(setCountryName(capital));
    },
    dispatchClearSearchedResults: () => {
      dispatch(clearSearchedResults());
    },
    dispatchSetUserInputAction: (text: string) => {
      dispatch(setUserInputAction(text));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryInput);
