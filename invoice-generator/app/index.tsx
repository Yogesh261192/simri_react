import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Alert,
  Image, 
  KeyboardAvoidingView, 
  Platform 
  } from 'react-native';
import {account} from '../appwriteConfig';
import Loader from '@/components/Loader';
import { useRouter } from 'expo-router';
// importcdg } from 'expo-font';
import { UserContext, UserProvider} from '@/components/userDetaisl';
// console.log(account, 'aa');
const Index = () => {
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [isLoad, setIsload]= useState(false);
  console.log(useContext(UserContext))
  const  {user, setUser}  = useContext(UserContext);
  const router = useRouter();

  console.log(user, '11');

  function doLogin(){
    // alert('11')
    console.log(email, password)
    setIsload(true)
    if(email=="yogesh@gmail.com" && password=="12345"){
      router.push('/sample')
    }
    else{
      setIsload(false)
      Alert.alert('Wrong ID and password')
      return
    }
    

    const promise = account.createEmailPasswordSession(email, password);

promise.then(function (response) {
  // alert(JSON.stringify(response))
  setIsload(false)
  setUser({ email: email })
    console.log(response); // Success
}, function (error) {
  // alert(JSON.stringify(error))
  setIsload(false)
    console.log(error); // Failure
});
  }
  return (
    <UserProvider>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.container}
      >
        <Image source={require("../assets/images/logo.png")} style={styles.logo} />
        
        <Text style={styles.title}>PDF Generator</Text>
        
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Username or Mobile"
            placeholderTextColor="#aaa"
            value={email} 
            onChangeText={setEmail}
          />
        </View>
        
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={true}
            value={password} 
            onChangeText={setPassword}
          />
        </View>
        
        <TouchableOpacity style={styles.loginButton} onPress={doLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        
        <Loader visible={isLoad} />
      </KeyboardAvoidingView>
    </UserProvider>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "#f5f5f5"
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
    borderRadius:15
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  inputBox: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  input: {
    padding: 15,
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

