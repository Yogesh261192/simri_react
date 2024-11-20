import React, { useState , useContext} from 'react';
// import {APP_NAME} from '../.env'
import Constants from 'expo-constants';

import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import MyModal from './component/modal';
console.log(Constants)

let  API_URL  = "http://13.60.56.185:3000";

import { UserProvider } from './component/userDetails';
import { UserContext } from './component/userDetails'; 
import axios from 'axios';
let test= false
const LoginScreen = () => {
  const { user, setUser } = useContext(UserContext);
  console.log(API_URL, 'api')
  console.log(Constants, 'contws')
  if(test){
    API_URL="http://localhost:3000"
  }
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and sign up
  const [email, upDateEmail] = useState('');
  const [password, updatePassword] = useState('');
  const [confirmPassword, updateConfirmPassword] = useState('');
  const [popup, updatePopup] = useState(false);
  const [value, setValue] = useState('');

  const handleInputChange = (text) => {
    // Check if the input contains non-numeric characters
    if (/[^0-9]/.test(text)) {
      // Non-numeric characters detected, don't update state
      return;
    }
    // alert('changes')
    // Update state with the numeric value
    setValue(text);
  };

  const handlePress = async () => {
    // alert('hanldepress done')
    // alert(isSignUp)
    if(value.length !=10){
      alert('Please enter valid number')
      return
    }
    if (isSignUp) {
      if (password !== confirmPassword) {
        // Show an alert if passwords don't match
        Alert.alert('Error', 'Password and confirm password do not match. Please try again.');
        return; // Prevent further execution
      }
      
      const url = `${API_URL}/register`; // Replace with the actual URL
      const data = {
        phone: value,
        password: password,
      };
      if(!password || !confirmPassword){
        Alert.alert('Please enter password/confirm password!')
        return;
      }
      try {
        const response = await axios.post(url, data);
    
        if(!response.data.error){
          alert('Registered Success please login')
          setIsSignUp(false)
        }
        else{
          alert(JSON.stringify(response.data.message))
        }
        
      
        console.log('Response:', response.data);
      } catch (error) {
        alert('Error:', JSON.stringify(error));
      }
    } else {
      const url = `${API_URL}/login`; // Replace with the actual URL
      const data = {
        phone: value,
        password: password,
      };
      // alert(JSON.stringify(data))
      
      try {
        // alert('1222')
        const response = await axios.post(url, data);
        
        // alert(response.data)
        if(!response.data.error){
          setUser({ phone: value, password });
          router.push('/options');
        }
        
        else{
          alert(JSON.stringify(response.data.message), 'cha')
        }
        
        // alert('Registered Success please login')
        // console.log('Response:', response.data);
      } catch (error) {
        alert('wrong user', error)
        console.error('Error:', error);
      }
      // if (email === "yogesh" && password === "1234") {
      //   router.push('/options');
      // } else {
      //   alert('Wrong ID or password');
      // }
    }
  };

  return (
    <UserProvider>
    <ImageBackground
      source={require('../assets/images/test.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.appName}>Simdi</Text>
        <Text style={styles.tagline}>Your Himalayan Friend</Text>

        <TextInput
          style={styles.input}
          placeholder="Phone"
          keyboardType="numeric"
          value={value}
          onChangeText={(value) => handleInputChange(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(value) => updatePassword(value)}
        />
        <TextInput
          style={{
            ...styles.input,
            display: !isSignUp ? 'none' : 'flex',
          }}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(value) => updateConfirmPassword(value)}
        />

        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
          <Text style={styles.switchText}>
            {isSignUp ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.simdiInfo}>
          Why Simdi 
          <Feather style={{ marginLeft: '5px' }} name="info" size={16} color="black" onPress={() => updatePopup(!popup)} />
        </Text>
      </View>

      {/* Popup Component */}
      <MyModal current={popup} onClose={() => updatePopup(false)} />
    </ImageBackground>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 40,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'black',
  },
  tagline: {
    fontSize: 18,
    fontStyle: 'italic',
    color: 'black',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#ff8800',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchText: {
    marginTop: 15,
    color: '#007BFF',
  },
  simdiInfo: {
    color: 'green',
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
