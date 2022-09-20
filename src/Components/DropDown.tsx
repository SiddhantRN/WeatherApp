import React, {type PropsWithChildren, useState} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import {height, width} from '../Utils/constants';
import {countryArray} from '../Utils/countryArray';
import {connect} from 'react-redux';

import {setCountry, fetchWeather, setCountryName} from '../Redux/actions';

type ComponentDispatchProps = {
  dispatchSetCountry?: (item: string) => void;
  dispatchFetchWeather?: (item: string) => void;
  dispatchSetCountryName?: (item: string) => void;
};

type ComponentStateProps = {
  FetchedCountries: [];
  FetchingCountries: boolean;
};

type ComponentProps = ComponentDispatchProps & ComponentStateProps;

const DropDown = ({
  dispatchSetCountry,
  FetchedCountries,
  dispatchFetchWeather,
  FetchingCountries,
  dispatchSetCountryName,
}: ComponentProps) => {
  return (
    <View style={styles.container}>
      {FetchingCountries ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            // flex: 1,
            width: width * 0.9,
            height: height * 0.2,
          }}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={FetchedCountries}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.countryItem}
              onPress={() => {
                dispatchSetCountry ? dispatchSetCountry(item) : null;
                dispatchSetCountryName
                  ? dispatchSetCountryName(item.name.common)
                  : null;
                dispatchFetchWeather(item.capital[0]);
              }}
              // onPress={() => console.log(FetchingCountries)}
            >
              <Text style={styles.optionText}>{item.name.common}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: height * 0.2,
    // minHeight: height * 0.2,
    width: width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    marginTop: 5,
    padding: 5,
  },
  countryItem: {
    height: height * 0.05,
    width: '100%',
    // borderBottomColor: '#BDBDBD',
    // borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
    // fontWeight: 'bold',
    color: '#000',
  },
});

const mapStateToProps: any = (state: any) => ({
  FetchedCountries: state.appReducer.FetchedCountries,
  FetchingCountries: state.appReducer.FetchingCountries,
});

const mapDispatchToProps: any = (dispatch: any) => {
  return {
    dispatchSetCountry: (country: string) => {
      dispatch(setCountry(country));
    },
    dispatchFetchWeather: (capital: string) => {
      dispatch(fetchWeather(capital));
    },
    dispatchSetCountryName: (capital: string) => {
      dispatch(setCountryName(capital));
    },
    // pubnubKeys: () => dispatch(pubnubKeys()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DropDown);

// export default DropDown;
