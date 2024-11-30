import React, {useContext, useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from './AppContext';
import {COLORS, FONTS} from '../helpers/colors';
import {useNavigation} from '@react-navigation/native';

export default function ({item}) {
  const {shouldRefresh, toggleRefresh} = useContext(AppContext);
  const navigation = useNavigation();
  const [added, setAdded] = useState(false);

  const updateCart = useCallback(async () => {
    const cartList = await AsyncStorage.getItem('cartList');
    const cartArray = cartList ? JSON.parse(cartList) : [];
    const isProductInCart = cartArray.some(cart => cart.name === item.name);
    setAdded(isProductInCart);
  }, [item.name]);

  const handleCartUpdate = async action => {
    const cartList = await AsyncStorage.getItem('cartList');
    let cartArray = cartList ? JSON.parse(cartList) : [];

    if (action === 'add') {
      if (!cartArray.some(cart => cart.name === item.name)) {
        cartArray.push({...item, count: 1});
      }
    } else if (action === 'remove') {
      cartArray = cartArray.filter(cart => cart.name !== item.name);
    }

    await AsyncStorage.setItem('cartList', JSON.stringify(cartArray));
    toggleRefresh(prev => !prev);
  };

  const toggleCart = () => {
    added ? handleCartUpdate('remove') : handleCartUpdate('add');
  };

  useEffect(() => {
    updateCart();
  }, [updateCart, shouldRefresh]);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.main}
      onPress={() => {
        navigation.navigate('DrawerNavigator', {
          screen: 'CasiProductDetailScreen',
          params: {item: item},
        });
        toggleRefresh(!shouldRefresh);
      }}>
      <Image source={item?.image} style={styles.image} />

      <Text style={styles.title}>{item?.name}</Text>

      <View style={styles.row}>
        <Text style={styles.price}>{item?.price} $</Text>

        <TouchableOpacity style={styles.statusContainer} onPress={toggleCart}>
          <Text style={styles.status}>{added ? 'УБРАТЬ' : 'ЗАКАЗАТЬ'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '45%',
    alignSelf: 'center',
    height: 270,
    marginTop: 15,
    borderRadius: 25,
    elevation: 5,
    backgroundColor: COLORS.white,
  },
  container: {
    width: '100%',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: '95%',
    height: 110,
    objectFit: 'contain',
    marginTop: 15,
    alignSelf: 'center',
  },
  leftContainer: {
    width: '95%',
  },
  title: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 20,
  },
  statusContainer: {
    backgroundColor: COLORS.yellow,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 25,
    marginLeft: 10,
  },
  status: {
    color: COLORS.black,
    fontFamily: FONTS.bold,
  },
  priceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  price: {
    fontSize: 15,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderRadius: 25,
    borderColor: COLORS.main,
    borderWidth: 1,
  },
});
