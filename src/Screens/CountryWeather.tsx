import React, {type PropsWithChildren, useState} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import _ from 'lodash';
import {connect} from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {height, width} from '../Utils/constants';
import {searchCountry, clearData} from '../Redux/actions';
import {RootStackParams} from '../Navigation/stackNavigator';

type ComponentProps = {
  CapitalWeather: {};
  dispatchClearData: () => void;
  navigation: NativeStackNavigationProp<RootStackParams, 'CountryInfo'>;
};

const CountryWeather = ({
  CapitalWeather,
  navigation,
  dispatchClearData,
}: ComponentProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <Ionicons name="md-arrow-back-sharp" size={27} color={'#af2541'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logout}
          onPress={() => {
            navigation.navigate('CountryInput');
            dispatchClearData();
          }}>
          <SimpleLineIcons name="logout" size={25} color={'#af2541'} />
        </TouchableOpacity>
      </View>
      {/* <Text>Country Info</Text> */}
      <View style={styles.elementsContainer}>
        <Image
          style={{
            height: height * 0.1,
            width: width * 0.3,
            borderRadius: 5,
          }}
          resizeMode={'stretch'}
          source={{uri: CapitalWeather.current.weather_icons[0]}}></Image>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            color: '#af2541',
            marginTop: 10,
          }}>
          Weather Info for:
        </Text>
        <Text style={styles.cityName}>{CapitalWeather.location.name}:</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Temperature : {CapitalWeather.current.temperature}
          </Text>
          <Text style={styles.infoText}>
            Precipitation :<Text>{CapitalWeather.current.precip} %</Text>
          </Text>
          <Text style={styles.infoText}>
            Wind Speed : {CapitalWeather.current.wind_speed}{' '}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  elementsContainer: {
    height: height * 0.9,
    width: width,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    height: height * 0.08,
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 8,
    width: width,
    backgroundColor: '#fff',
  },
  input: {
    height: height * 0.1,
    width: width * 0.9,
    marginTop: height * 0.2,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#000',
  },
  submitButton: {
    height: height * 0.1,
    width: width * 0.9,
    backgroundColor: 'yellow',
    borderRadius: 10,
    marginTop: 15,
  },
  flag: {
    height: height * 0.2,
    width: width * 0.6,
    backgroundColor: 'pink',
  },
  cityName: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#000',
  },
  infoCard: {
    // height: height * 0.15,
    width: width * 0.95,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#BDBDBD',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 8,
    backgroundColor: '#fff',
    padding: 5,
    paddingVertical: 10,
  },
  infoText: {
    fontWeight: 'bold',
    fontSize: 18,
    // color: '#000',
    color: '#af2541',
    marginVertical: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#af2541',
  },
  logout: {
    position: 'absolute',
    right: 10,
    alignSelf: 'center',
  },
  back: {
    position: 'absolute',
    left: 10,
    alignSelf: 'center',
  },
});

const mapStateToProps: any = (state: any) => ({
  CapitalWeather: state.appReducer.CapitalWeather,
});

const mapDispatchToProps: any = (dispatch: any) => {
  return {
    dispatchSetCountry: (query: string) => {
      dispatch(searchCountry(query));
    },
    dispatchClearData: () => {
      dispatch(clearData());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryWeather);
