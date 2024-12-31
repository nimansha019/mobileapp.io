import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const LoginScreen = ({ navigation, route }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [signupData, setSignupData] = useState(route.params?.signupData || null);  // Get signup data from params

  // Animation value for the header text
  const headerAnimation = new Animated.Value(0);

  // Start the animation when the component mounts
  useEffect(() => {
    Animated.timing(headerAnimation, {
      toValue: 1,
      duration: 1000, // Duration of the animation (1 second)
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = () => {
    if (!username || !password) {
      setError('Please fill in both fields.');
    } else if (!signupData || signupData.username !== username || signupData.password !== password) {
      setError('Invalid username or password.');
    } else {
      setError('');
      navigation.navigate('Home', { userName: username }); // Pass username to HomeScreen
    }
  };

  return (
    <View style={styles.container}>
      {/* Animated Text */}
      <Animated.Text
        style={[
          styles.header,
          {
            opacity: headerAnimation, // Apply animation to opacity
            transform: [
              {
                translateY: headerAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-30, 0], // Slide up effect
                }),
              },
            ],
          },
        ]}
      >
        QuickRent Awaits You!
      </Animated.Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.signupButton}>
        <Text style={styles.signupText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#eaf3f3',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#0571ed',
  },
  input: {
    height: 45,
    borderColor: '#0288d1',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 12,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0571ed',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  signupText: {
    color: '#0288d1',
    fontSize: 16,
  },
});

export default LoginScreen;
