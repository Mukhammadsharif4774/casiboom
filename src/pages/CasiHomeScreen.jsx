import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {AppContext} from '../components/AppContext';
import CasiHeader from '../components/CasiHeader';
import CasiMenuComponent from '../components/CasiMenuComponent';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import {casiProducts} from '../helpers/casiProducts';
import CetegoryMask_1 from '../assets/first_category_mask.png';
import CetegoryMask_2 from '../assets/second_category_mask.png';
import CetegoryMask_3 from '../assets/third_category_mask.png';

const CasiCategoryButton = ({label, active, onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={active ? styles.categoryItemActive : styles.categoryItem}>
    <Text style={styles.category}>{label}</Text>
  </TouchableOpacity>
);

export default function CasiHomeScreen() {
  const [category, setCategory] = React.useState(0);
  const {shouldRefresh, toggleRefresh} = useContext(AppContext);
  const categories = ['МАНГАЛ', 'САЛАТИ, ЗАКУСКИ', 'ПЕРШІ СТРАВИ'];

  const handleCategoryChange = index => {
    setCategory(index);
    toggleRefresh(!shouldRefresh);
  };

  return (
    <View style={styles.container}>
      <CasiHeader />

      <View style={styles.maskContainer}>
        <Image
          source={
            category === 0
              ? CetegoryMask_1
              : category === 1
              ? CetegoryMask_2
              : CetegoryMask_3
          }
          style={styles.mask}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
        style={styles.scroll}>
        {categories.map((item, index) => (
          <CasiCategoryButton
            key={index}
            label={item}
            active={category === index}
            onPress={() => handleCategoryChange(index)}
          />
        ))}
      </ScrollView>

      <ScrollView style={styles.flex} contentContainerStyle={styles.main}>
        {casiProducts[category].map((product, index) => (
          <CasiMenuComponent key={index} item={product} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    flex: 1,
    backgroundColor: '#262A2B',
  },
  maskContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mask: {
    width: width * 0.9,
    resizeMode: 'contain',
  },
  categoryContainer: {
    paddingHorizontal: 20,
  },
  categoryItem: {
    paddingHorizontal: 12,
  },
  categoryItemActive: {
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: COLORS.main,
    borderRadius: 25,
  },
  category: {
    fontFamily: FONTS.black,
    color: COLORS.white,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 40,
  },
  main: {
    paddingBottom: 100,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  imageContainer: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 12,
  },
  imageContainerActive: {
    backgroundColor: COLORS.yellow,
    padding: 15,
    borderRadius: 12,
  },
  image: {
    width: 70,
    height: 70,
    objectFit: 'contain',
  },
});
