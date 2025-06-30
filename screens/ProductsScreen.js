import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

const ProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch('https://dummyjson.com/products?limit=30');
      const data = await response.json();

      setProducts(data.products);
      setLoading(false);

    } catch (error) {
      console.error('Error fetching products:', error);
      Alert.alert('Error', 'Failed to load products. Please check your internet connection.');
      setLoading(false);
    }
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.productCard}>
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.productImage}
      />

      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={styles.priceRatingContainer}>
          <Text style={styles.productPrice}>${item.price}</Text>
          <Text style={styles.productRating}>⭐ {item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading all products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productsList}
        showsVerticalScrollIndicator={false}
        numColumns={2} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },

  productsList: {
    paddingHorizontal: 10,
    paddingTop: 15,
  },

  productCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    margin: 7,
    width: '46%', 
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },

  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'contain',
    backgroundColor: '#f5f5f5',
  },

  productInfo: {
    flex: 1,
  },

  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'gray',
    marginBottom: 5,
  },

  productDescription: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 10,
    lineHeight: 18,
  },

  priceRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFC1DA',
  },

  productRating: {
    fontSize: 12,
    color: '#ccc',
  },
});

export default ProductsScreen;
