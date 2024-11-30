import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from '../components/AppContext';
import CasiCartItemComponent from '../components/CasiCartItemComponent';
import CasiButtonComponent from '../components/CasiButtonComponent';
import CasiHeader from '../components/CasiHeader';
import {COLORS, FONTS, height, width} from '../helpers/colors';

export default function () {
  const navigation = useNavigation();
  const {shouldRefresh} = useContext(AppContext);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const storedCart = await AsyncStorage.getItem('cartList');
      setCart(storedCart ? JSON.parse(storedCart) : []);
    };

    fetchCart();
  }, [shouldRefresh]);

  useEffect(() => {
    if (cart.length) {
      const calculatedPrice = cart.reduce(
        (sum, item) => sum + item.price * item.count,
        0,
      );
      setTotalPrice(calculatedPrice);
    } else {
      setTotalPrice(0);
    }
  }, [cart]);

  const handleOrder = () => {
    const destinationScreen = cart.length
      ? 'CasiCartSuccessScreen'
      : 'CasiHomeScreen';
    navigation.navigate('DrawerNavigator', {screen: destinationScreen});
  };

  return (
    <View style={styles.container}>
      <CasiHeader />

      <Text style={styles.title}>Корзина</Text>
      {cart.length ? '' : <Text style={styles.empty}>Корзина пустая</Text>}

      {cart.length ? (
        <View style={{height: height * 0.6}}>
          <ScrollView style={styles.flex} contentContainerStyle={styles.main}>
            {cart.map((item, index) => (
              <CasiCartItemComponent item={item} key={index} />
            ))}
          </ScrollView>
        </View>
      ) : (
        ''
      )}

      {cart.length ? (
        <View style={[styles.row, styles.summaryContainer]}>
          <Text style={styles.sumTitle}>Всего</Text>
          <Text style={styles.sum}>${totalPrice}</Text>
        </View>
      ) : (
        ''
      )}

      <CasiButtonComponent
        text={cart?.length ? 'Перейти к оплате' : 'На главную'}
        style={styles.orderButton}
        onPress={handleOrder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: COLORS.background,
  },
  flex: {
    height: 200,
  },
  title: {
    fontSize: 30,
    fontFamily: FONTS.black,
    color: COLORS.white,
    margin: 20,
  },
  main: {
    paddingBottom: 100,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: 40,
  },
  empty: {
    marginTop: 20,
    marginLeft: 20,
    textAlign: 'left',
    fontSize: 26,
    fontFamily: FONTS.black,
    color: COLORS.white,
    opacity: 0.3,
  },
  subEmpty: {
    textAlign: 'center',
    fontSize: 28,
    fontFamily: FONTS.black,
    color: COLORS.white,
  },
  summaryContainer: {
    justifyContent: 'space-between',
    marginTop: 40,
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    width: width,
    position: 'absolute',
    bottom: 120,
  },
  sumTitle: {
    fontSize: 20,
    fontFamily: FONTS.regular,
    color: COLORS.white,
    textAlign: 'center',
  },
  sum: {
    fontSize: 30,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    textAlign: 'center',
    marginLeft: 20,
  },
  orderButton: {
    position: 'absolute',
    bottom: 50,
  },
});
