import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import ProductsList from '../components/Products';

const ProductsListScreen = (): React.JSX.Element => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.container}>
      <ProductsList />
    </ScrollView>
  );
};
export default ProductsListScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
