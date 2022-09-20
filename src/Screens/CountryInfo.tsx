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
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import DropDown from '../Components/DropDown';
import {height, width} from '../Utils/constants';
import {searchCountry,clearData} from '../Redux/actions';
import { RootStackParams } from "../Navigation/stackNavigator";


type ComponentProps = {
  dispatchClearData: () => void;
  SelectedCountry: {};
  navigation:NativeStackNavigationProp<
  RootStackParams,
  'CountryInfo'
>;
};

const CountryInfo = ({
  SelectedCountry,
  navigation,
  dispatchClearData
}: ComponentProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.logout} onPress={()=>{
          navigation.navigate('CountryInput')
          dispatchClearData();
        }}>
          <SimpleLineIcons name="logout" size={25} color={'#af2541'} />
        </TouchableOpacity>
      </View>
      {/* <Text>Country Info</Text> */}
      <View style={styles.elementsContainer}>
        <Image
          style={styles.flag}
          resizeMode={'stretch'}
          source={{uri: SelectedCountry.flags.png}}></Image>
        <Text style={styles.cityName}>{SelectedCountry.name.common}</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Capital : {SelectedCountry.capital[0]}
          </Text>
          <Text style={styles.infoText}>
            Population : {SelectedCountry.population}
          </Text>
          <Text style={styles.infoText}>
            Latitude : {SelectedCountry.latlng[0]}
          </Text>
          <Text style={styles.infoText}>
            Longitude : {SelectedCountry.latlng[1]}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CountryWeather')}>
          <Text style={styles.buttonText}>Weather Info for {SelectedCountry.capital[0]} ></Text>

        </TouchableOpacity>
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
    flexDirection:'row',
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
    // backgroundColor: 'pink',
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
  buttonText:{
    fontWeight:'bold',
    fontSize:18,
    color:'#fff'
  },
  logout:{
    position:'absolute',
    right:10,
    alignSelf:'center'
  },
  button:{marginTop:20,paddingVertical:10,backgroundColor:'#af2541',borderRadius:5,justifyContent:'center',alignItems:'center'}
});

const mapStateToProps: any = (state: any) => ({
  SelectedCountry: state.appReducer.SelectedCountry,
});

const mapDispatchToProps: any = (dispatch: any) => {
  return {
    dispatchClearData: () => {
      dispatch(clearData());
    },
    // pubnubKeys: () => dispatch(pubnubKeys()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryInfo);

// export default CountryInput;
