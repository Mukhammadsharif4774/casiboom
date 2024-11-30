import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import {AppContext} from '../components/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {allCasiProducts} from '../helpers/casiProducts';
import CasiHeader from '../components/CasiHeader';
import CasiButtonComponent from '../components/CasiButtonComponent';

export default function ({route}) {
  const {item} = route.params;
  const {shouldRefresh, toggleRefresh} = useContext(AppContext);
  const [carts, setCarts] = useState([]);
  const [added, setAdded] = useState(false);

  const updateCart = async updatedCarts => {
    await AsyncStorage.setItem('cartList', JSON.stringify(updatedCarts));
    setCarts(updatedCarts);
    toggleRefresh(!shouldRefresh);
  };
  const increment = () => {
    const updatedCarts = carts.map(product =>
      product.name === item.name
        ? {...product, count: product.count + 1}
        : product,
    );
    updateCart(updatedCarts);
  };

  const decrement = () => {
    const updatedCarts = carts
      .map(product => {
        if (product.name === item.name) {
          const newCount = Math.max(product.count - 1, 0);
          return {...product, count: newCount};
        }
        return product;
      })
      .filter(product => product.count > 0);
    updateCart(updatedCarts);
  };

  const deleteItem = () => {
    const updatedCarts = carts.filter(product => product.name !== item.name);
    updateCart(updatedCarts);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartList = await AsyncStorage.getItem('cartList');
      setCarts(cartList ? JSON.parse(cartList) : []);
      const cartArray = cartList ? JSON.parse(cartList) : [];
      const isProductInCart = cartArray.some(cart => cart.name === item.name);
      setAdded(isProductInCart);
    };
    fetchCartItems();
  }, [shouldRefresh]);

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

  return (
    <View style={styles.container}>
      <CasiHeader back={true} />

      <View style={styles.imageContainer}>
        <Image source={item?.image} style={styles.image} />
      </View>

      <Text style={styles.name}>{item?.name}</Text>

      <Text style={styles.subTitle}>Общая цена</Text>

      <View style={styles.row}>
        <Text style={styles.currencyText}>{`${
          item.price *
          (carts.find(product => product.name === item.name)?.count
            ? carts.find(product => product.name === item.name)?.count
            : 1)
        } $`}</Text>

        {added ? (
          <View style={styles.countContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                carts.find(product => product.name === item.name)?.count > 1
                  ? decrement()
                  : null
              }>
              <Text style={styles.plusMinus}>-</Text>
            </TouchableOpacity>

            <Text style={styles.count}>
              {carts.find(product => product.name === item.name)?.count || 0}
            </Text>

            <TouchableOpacity style={styles.actionButton} onPress={increment}>
              <Text style={styles.plusMinus}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          ''
        )}
      </View>

      <CasiButtonComponent
        text={added ? 'УБРАТЬ' : 'ЗАКАЗАТЬ'}
        style={styles.button}
        onPress={toggleCart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: '#262A2B',
  },
  imageContainer: {
    width: '90%',
    height: 250,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginTop: 50,
  },
  image: {
    height: 240,
    alignSelf: 'center',
    objectFit: 'contain',
  },
  name: {
    marginTop: 20,
    marginLeft: 20,
    fontFamily: FONTS.black,
    fontSize: 36,
    color: COLORS.white,
  },
  subTitle: {
    marginTop: 10,
    marginLeft: 20,
    fontFamily: FONTS.regular,
    fontSize: 28,
    color: COLORS.white,
  },
  currencyText: {
    fontSize: 25,
    fontFamily: FONTS.black,
    color: COLORS.white,
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.main,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 20,
    marginLeft: 20,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.main,
    marginLeft: 15,
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  count: {
    fontSize: 25,
    fontFamily: FONTS.bold,
    marginHorizontal: 10,
    color: COLORS.white,
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
  },
  plusMinus: {
    textAlign: 'center',
    fontFamily: FONTS.black,
    color: COLORS.white,
    fontSize: 25,
  },
  button: {
    position: 'absolute',
    bottom: 50,
  },
});
