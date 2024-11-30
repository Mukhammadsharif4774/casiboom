import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import QRCode from 'react-native-qrcode-svg';
import {useNavigation} from '@react-navigation/native';
import CasiHeader from '../components/CasiHeader';
import CasiButtonComponent from '../components/CasiButtonComponent';
import SuccessIcon from '../assets/success_icon.png';

export default function () {
  const navigation = useNavigation();

  const handleNavigateHome = () => {
    navigation.navigate('DrawerNavigator', {screen: 'CasiHomeScreen'});
  };

  return (
    <View style={styles.container}>
      <CasiHeader />

      <Text style={styles.mainTitle}>Корзина</Text>

      <View style={styles.qrContainer}>
        <Image source={SuccessIcon} style={styles.successIcon} />

        <Text style={styles.title}>Ваш заказ успешно {'\n'} размещен</Text>

        <QRCode
          value="https://lambic.uz/"
          size={Dimensions.get('window').width / 2.5}
        />
      </View>

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
  mainTitle: {
    fontSize: 30,
    fontFamily: FONTS.black,
    color: COLORS.white,
    margin: 20,
  },
  title: {
    textAlign: 'center',
    fontFamily: FONTS.black,
    color: COLORS.white,
    fontSize: 24,
    marginTop: 20,
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
  successIcon: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
});
