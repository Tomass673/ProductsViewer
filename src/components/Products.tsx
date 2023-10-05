import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {fetchProducts, ProductData, selectAllProducts} from '../store/products';
import {useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../App';
import {StackNavigationProp} from '@react-navigation/stack';

type ProductsListProp = StackNavigationProp<MainStackParamList, 'ProductsList'>;

const ProductsList = (): React.JSX.Element => {
  const navigation = useNavigation<ProductsListProp>();
  const dispatch = useDispatch<AppDispatch>();
  const {loading} = useSelector((state: RootState) => state.products);
  const products: ProductData[] = useSelector(selectAllProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.itemsContainer}>
      {products.map((product: ProductData) => {
        return (
          <TouchableOpacity
            style={styles.container}
            key={product.id}
            onPress={() =>
              navigation.navigate('ProductDetails', {productId: product.id})
            }>
            <View style={styles.imageContainer}>
              <ImageBackground
                style={styles.thumbnail}
                source={{uri: product.thumbnail}}
                resizeMode="cover">
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{product.title}</Text>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ProductsList;

const styles = StyleSheet.create({
  loader: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  itemsContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    backgroundColor: 'white',
  },
  container: {
    width: '45%',
    height: 180,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'black',
    borderRadius: 22,
    marginHorizontal: 5,
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageContainer: {
    width: '100%',
    height: 180,
    flexDirection: 'column',
  },
  titleContainer: {
    borderRadius: 19,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 12,
    fontFamily: 'LatoRegular',
    lineHeight: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  thumbnail: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 22,
    overflow: 'hidden',
    padding: 10,
  },
});
