import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {ProductData, selectProductById} from '../store/products';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MainStackParamList} from '../../App';
import {RootState} from '../store';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Entypo';

const ProductDetails = (): React.JSX.Element => {
  const route = useRoute<RouteProp<MainStackParamList, 'ProductDetails'>>();
  const productId: number = route.params?.productId;
  const product: ProductData | undefined = useSelector((state: RootState) =>
    selectProductById(state, productId),
  );
  return (
    <View style={styles.container}>
      <View style={styles.swiperContainer}>
        <Swiper
          showsButtons={false}
          autoplay
          autoplayTimeout={5}
          style={{height: 250}}>
          {product?.images.map((imageUri: string, index: number) => (
            <View key={index} style={styles.imageContainer}>
              <Image
                source={{uri: imageUri}}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          ))}
        </Swiper>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.brand}>{product?.brand}</Text>
        <Text style={styles.title}>{product?.title}</Text>
        <Text style={styles.categoryName}>{product?.category}</Text>
        <View style={styles.addToCartDiscountContainer}>
          <View style={styles.addToCartContainer}>
            <Text style={styles.price}>{product?.price}</Text>
            <TouchableOpacity style={styles.addToCartButton}>
              <Icon name="plus" size={18} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.discount}>-{product?.discountPercentage}%</Text>
        </View>
        <Text style={styles.stock}>In stock: {product?.stock}</Text>
        {product?.description && (
          <Text style={styles.descriptionHeader}>Description:</Text>
        )}
        <Text style={styles.description}>{product?.description}</Text>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    height: '100%',
  },
  swiperContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 240,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  infoContainer: {
    padding: 10,
  },
  categoryName: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
  brand: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
  },
  discount: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
    marginLeft: 10,
    color: '#C4C4C4',
  },
  addToCartDiscountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  addToCartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 90,
    height: 25,
    backgroundColor: 'rgba(52, 85, 235, 0.9)',
    paddingLeft: 10,
    borderRadius: 24,
  },
  price: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    width: '60%',
  },
  addToCartButton: {
    borderLeftWidth: 0.5,
    height: '100%',
    borderColor: 'white',
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stock: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  descriptionHeader: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    marginVertical: 5,
  },
  description: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
});
