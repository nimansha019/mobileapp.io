import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const TitleScreen = ({ navigation }) => {
  // Define animation values for each letter
  const letterAnimations = "QuickRent".split("").map(() => new Animated.Value(0));

  // Animate the letters to fall down
  useEffect(() => {
    const animations = letterAnimations.map((letterAnim, index) => 
      Animated.timing(letterAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 100, // Delay each letter animation
        useNativeDriver: true,
      })
    );

    // Run all animations in sequence
    Animated.stagger(100, animations).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        { "QuickRent".split("").map((letter, index) => {
          return (
            <Animated.Text
              key={index}
              style={[
                styles.welcomeText,
                {
                  transform: [{
                    translateY: letterAnimations[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [-50, 0], // Fall from -50 to 0 position
                    }),
                  }],
                  opacity: letterAnimations[index], // Fade in as it falls
                },
              ]}
            >
              {letter}
            </Animated.Text>
          );
        })}
      </View>
      <Image
        source={require('../assets/logo.jpeg')}  // Adjust the path based on your project structure
        style={styles.logo}
      />
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // Centers the content vertically
    alignItems: 'center',      // Centers the content horizontally
    backgroundColor: '#fff',   // Optional background color
  },
  logo: {
    width: 200,               // Adjust the width of the logo
    height: 200,              // Adjust the height of the logo
    marginBottom: 20,         // Space between logo and text
  },
  textContainer: {
    flexDirection: 'row',     // Align letters horizontally
  },
  welcomeText: {
    fontSize: 24,             // Adjust the font size for the welcome message
    fontWeight: 'bold',       // Make the text bold
    marginBottom: 20,         // Space between text and button
  },
  button: {
    backgroundColor: '#007BFF',  // Button background color
    paddingVertical: 10,         // Vertical padding to adjust height
    paddingHorizontal: 20,       // Horizontal padding to adjust width
    borderRadius: 5,             // Rounded corners
  },
  buttonText: {
    color: '#fff',               // White text color
    fontSize: 16,                 // Adjust the font size for the button text
    fontWeight: 'bold',           // Bold text
    textAlign: 'center',         // Center the text inside the button
  },
});

export default TitleScreen;
