import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  
  const goToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://media.istockphoto.com/id/2155031694/photo/a-set-of-makeup-brushes-and-beauty-products-arranged-on-a-desk-at-the-beauticians-salon.webp?s=1024x1024&w=is&k=20&c=M0mSBqwgzoxj1SRhhb-Leer0C9aUKhwsu6R5NP7Ra2U='
      }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to Our Store</Text>
          <Text style={styles.subtitle}>Discover amazing products</Text>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={goToHome}
            activeOpacity={0.8} 
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.9,
  },
  button: {
    backgroundColor: '#FFC1DA',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SplashScreen;