import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch('https://dummyjson.com/products?limit=10');
      const data = await response.json();

      setProducts(data.products);
      setLoading(false);

    } catch (error) {
      console.error('Error fetching products:', error);
      Alert.alert('Error', 'Failed to load products. Please try again.');
      setLoading(false);
    }
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.productCard}>
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.productImage}
      />
      <Text style={styles.productTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  const goToProducts = () => {
    navigation.navigate('Products');
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>About Us</Text>

        <Text style={styles.aboutText}>
          Welcome to our amazing store! We are a student-friendly e-commerce
          platform that offers a wide variety of high-quality products at
          competitive prices. Our mission is to provide excellent customer
          service and deliver the best shopping experience possible.
          Browse through our collection and find exactly what you're looking for.
        </Text>

        <Image
          source={{
            uri: 'https://media.istockphoto.com/id/1390665987/photo/pastel-pink-make-up.jpg?s=2048x2048&w=is&k=20&c=hrTuEc5QJehk3PxfQ3TF56ehhBgkHHv83HF6EY68bKg=',
          }}
          style={{ width: 300, height: 200, marginTop: 10 }}
        />
      </View>


      <View style={styles.productsSection}>

        <View style={styles.productsHeader}>
          <Text style={styles.sectionTitle}>Products</Text>
          <TouchableOpacity onPress={goToProducts}>
            <Text style={styles.showMoreText}>Show More</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Loading products...</Text>
          </View>
        ) : (
          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  aboutSection: {
    backgroundColor: 'white',
    padding: 20,
    margin: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  imageStyle: {
    width: 300,
    height: 200,
    marginTop: 10,
    borderRadius: 10, 
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFC1DA',
    marginBottom: 15,
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    textAlign: 'justify',
  },

  productsSection: {
    marginBottom: 20,
  },
  productsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  showMoreText: {
    color: '#FFC1DA',
    fontSize: 16,
    fontWeight: '600',
  },

  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },


  productsList: {
    paddingLeft: 20,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    width: 150,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFC1DA',
  },
});

export default HomeScreen;