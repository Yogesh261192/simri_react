import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Alert,  } from 'react-native';
import {account} from '../appwriteConfig';
import Loader from '@/components/Loader';
import { useRouter } from 'expo-router';
// import { isLoading } from 'expo-font';
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
    if(email=="sharukh@gmail.com" && password=="12345"){
      router.push('/forms')
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
    <UserProvider >
  <View style={styles.container}>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Username or Mobile"
            placeholderTextColor="#aaa"
            value={email} 
            onChangeText={(value)=>{ setEmail(value)}}
          />
        </View>

        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={true}
            value={password} 
            onChangeText={(value)=>{ setPassword(value)}}
            />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={()=>{doLogin()}}>
          <Text style={styles.loginButtonText} >Login</Text>
        </TouchableOpacity>
        <Loader visible={isLoad}></Loader>
      </View>
    </UserProvider>
    
  );
};

export default Index;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'contain', // Ensures the background image covers the entire screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:"white"
  },
  title: {
    fontSize: 24,
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
    overflow: 'hidden',
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
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
