import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {COLORS, FONTS} from './helpers/colors';
import CasiHomeScreen from './pages/CasiHomeScreen';
import CasiCartScreen from './pages/CasiCartScreen';
import CasiCartSuccessScreen from './pages/CasiCartSuccessScreen';
import CasiReservationScreen from './pages/CasiReservationScreen';
import CasiReserveSuccessScreen from './pages/CasiReserveSuccessScreen';
import CasiContactsScreen from './pages/CasiContactsScreen';
import CasiEventsScreen from './pages/CasiEventsScreen';
import CasiEventDetailScreen from './pages/CasiEventDetailScreen';
import CloseIcon from './assets/close_icon.png';
import CartIcon from './assets/cart_drawer_icon.png';
import Logo from './assets/logo.png';
import BackgroundImage from './assets/main_background.png';
import CasiProductDetailScreen from './pages/CasiProductDetailScreen';

const {width, height} = Dimensions.get('window');
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width,
          height,
        },
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {drawerScreens.map(({name, component}) => (
        <Drawer.Screen key={name} name={name} component={component} />
      ))}
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  const navigation = useNavigation();

  const drawerItems = [
    {label: 'МАГАЗИН', screen: 'CasiHomeScreen'},
    {label: 'БРОНЬ', screen: 'CasiReservationScreen'},
    {label: 'КОНТАКТЫ', screen: 'CasiContactsScreen'},
    {label: 'СОБЫТИЯ РЕСТОРАНА', screen: 'CasiEventsScreen'},
  ];

  const navigateToScreen = screen => {
    navigation.navigate('DrawerNavigator', {screen});
  };

  return (
    <ImageBackground style={styles.container} source={BackgroundImage}>
      <View style={styles.closeIconContainer}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <Image source={CloseIcon} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <View style={styles.mainContainer}>
        {drawerItems.map(({label, screen}) => (
          <TouchableOpacity
            key={screen}
            onPress={() => navigateToScreen(screen)}
            style={styles.drawerItem}>
            <Text style={styles.itemText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={() => navigateToScreen('Casi')}>
        <Image source={CartIcon} style={styles.cartIcon} />
      </TouchableOpacity>
    </ImageBackground>
  );
}

const drawerScreens = [
  {name: 'CasiHomeScreen', component: CasiHomeScreen},
  {name: 'CasiCartScreen', component: CasiCartScreen},
  {name: 'CasiCartSuccessScreen', component: CasiCartSuccessScreen},
  {name: 'CasiReservationScreen', component: CasiReservationScreen},
  {name: 'CasiReserveSuccessScreen', component: CasiReserveSuccessScreen},
  {name: 'CasiContactsScreen', component: CasiContactsScreen},
  {name: 'CasiEventsScreen', component: CasiEventsScreen},
  {name: 'CasiEventDetailScreen', component: CasiEventDetailScreen},
  {name: 'CasiProductDetailScreen', component: CasiProductDetailScreen},
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60,
    height: height,
    width: width,
  },
  closeIconContainer: {
    position: 'absolute',
    left: 20,
    bottom: 40,
  },
  closeIcon: {
    width: 25,
    height: 25,
  },
  logoContainer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.8,
    height: 150,
    resizeMode: 'contain',
  },
  mainContainer: {
    marginTop: height * 0.1,
    alignItems: 'center',
    width: width,
  },
  drawerItem: {
    justifyContent: 'center',
    width: '75%',
    marginTop: 20,
    backgroundColor: COLORS.main,
    height: 55,
    borderRadius: 25,
  },
  itemText: {
    fontSize: 18,
    fontFamily: FONTS.black,
    color: COLORS.white,
    textAlign: 'center',
  },
  cartIcon: {
    width: 60,
    height: 70,
    alignSelf: 'center',
    objectFit: 'contain',
    position: 'absolute',
    top: 100,
  },
});
