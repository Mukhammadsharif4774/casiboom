import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import CasiHeader from '../components/CasiHeader';
import EventImage from '../assets/events_background.png';
import Dance from '../assets/dance_night.png';
import Mexica from '../assets/mexica.png';
import OlimpBranch from '../assets/olimp_branch.png';
import Basketball from '../assets/basketball.png';
import {useNavigation} from '@react-navigation/native';

export default function () {
  const navigation = useNavigation();
  return (
    <ImageBackground style={styles.container} source={EventImage}>
      <CasiHeader />

      <Text style={styles.title}>События {'\n'} ресторана</Text>

      <View style={styles.main}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('DrawerNavigator', {
              screen: 'CasiEventDetailScreen',
              params: {image: Dance},
            })
          }>
          <Text style={styles.name}>Танцевальный Вечер</Text>
          <Text style={styles.time}>17 января {'\n'} в 19:00</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('DrawerNavigator', {
              screen: 'CasiEventDetailScreen',
              params: {image: Mexica},
            })
          }>
          <Text style={styles.name}>Вечер Мексиканской Кухни</Text>
          <Text style={styles.time}>19 января {'\n'} в 18:00</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('DrawerNavigator', {
              screen: 'CasiEventDetailScreen',
              params: {image: Basketball},
            })
          }>
          <Text style={styles.name}>Ночь Баскетбола</Text>
          <Text style={styles.time}>26 января {'\n'} в 20:00</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('DrawerNavigator', {
              screen: 'CasiEventDetailScreen',
              params: {image: OlimpBranch},
            })
          }>
          <Text style={styles.name}>Олимпийский бранч</Text>
          <Text style={styles.time}>30 января {'\n'} в 19:00</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
  },
  title: {
    fontSize: 30,
    fontFamily: FONTS.black,
    color: COLORS.white,
    margin: 20,
  },
  image: {
    width: '100%',
    height: height * 0.5,
    objectFit: 'contain',
  },
  button: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 15,
  },
  name: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.black,
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingVertical: 12,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: COLORS.main,
    borderRadius: 25,
    width: '75%',
  },
  time: {
    fontSize: 15,
    fontFamily: FONTS.regular,
    color: COLORS.white,
    width: '25%',
    marginLeft: 15,
  },
  main: {
    position: 'absolute',
    bottom: 100,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
});
