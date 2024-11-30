import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import {useNavigation} from '@react-navigation/native';
import CasiHeader from '../components/CasiHeader';
import CasiButtonComponent from '../components/CasiButtonComponent';
import Logo from '../assets/logo.png';
import SuccessIcon from '../assets/success_icon.png';

export default function () {
  const navigation = useNavigation();

  const handleNavigateHome = () => {
    navigation.navigate('DrawerNavigator', {screen: 'CasiHomeScreen'});
  };

  return (
    <View style={styles.container}>
      <CasiHeader />

      <Image
        source={SuccessIcon}
        style={{
          alignSelf: 'center',
          width: width * 0.6,
          height: width * 0.6,
          objectFit: 'contain',
          marginTop: 40,
        }}
      />

      <Text style={styles.title}>Спасибо!{'\n'} Зарезервированный стол!</Text>

      <CasiButtonComponent
        text="На главную"
        style={styles.button}
        onPress={handleNavigateHome}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: COLORS.background,
  },
  title: {
    textAlign: 'center',
    fontFamily: FONTS.black,
    color: COLORS.white,
    fontSize: 30,
    marginTop: Dimensions.get('window').height * 0.1,
    paddingVertical: 30,
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    position: 'absolute',
    bottom: 50,
  },
});
