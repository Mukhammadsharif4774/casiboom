import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import {useNavigation} from '@react-navigation/native';
import CasiHeader from '../components/CasiHeader';
import CasiButtonComponent from '../components/CasiButtonComponent';

export default function () {
  const navigation = useNavigation();

  const handleNavigateHome = () => {
    navigation.navigate('DrawerNavigator', {screen: 'CasiHomeScreen'});
  };

  const renderTextInput = placeholder => (
    <View style={styles.textInputContainer}>
      <TextInput
        placeholder={placeholder}
        style={styles.textInput}
        placeholderTextColor={COLORS.background}
        editable={false}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <CasiHeader />

      <Text style={styles.title}>Контакты</Text>

      <View style={styles.yellowView} />

      <View style={styles.main}>
        {renderTextInput('Номер')}
        {renderTextInput('Адрес')}
        {renderTextInput('Данные')}
        {renderTextInput('Индекс')}
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
  flex: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontFamily: FONTS.black,
    color: COLORS.white,
    margin: 20,
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 40,
  },
  textInputContainer: {
    width: '100%',
  },
  textInput: {
    height: 50,
    width: '95%',
    marginVertical: 10,
    fontSize: 13,
    fontFamily: FONTS.bold,
    borderWidth: 1,
    borderColor: COLORS.main,
    textAlign: 'left',
    color: COLORS.background,
    paddingLeft: 20,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    alignSelf: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 50,
  },
});
