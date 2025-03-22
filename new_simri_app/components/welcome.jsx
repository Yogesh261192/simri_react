import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Keyboard,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useRouter } from 'expo-router'
// import { databases } from '../../database';
import { storage } from '../storage';
// import { UserContext } from './userDetails';
import { databases } from '../database';
import { Query } from "appwrite";
import * as FileSystem from "expo-file-system";

const Welcome = ({ name }) => {
    const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);
  const [userImage, setImage]= useState(null);
  // const { user } = useContext(UserContext);
  
  console.log(userImage, 'image')
  const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log('this')
        const response = await databases.getDocument(
          "6740474900354338e949",
          "67432b050028ac3659c1",'',
          [Query.equal("email", user.email)]
        )
        console.log(response, 'res')
        if(response.documents.length){
          let image= await storage.getFileDownload(
            '6742ff13002520aba608', // Replace with your bucket ID
            response.documents[response.documents.length-1].image_id

          )
          setImage(image);
        }
        else{
          setImage(null)
        }
       
        
        // console.log(image)
       
      } catch (err) {
        // setError(err.message);
        alert(err)
      } finally {
        // setLoading(false);
      }
    };

    // Call the fetch function
    fetchData();
  }, []);

  const handleLogout = () => {
    setShowLogout(false);
    
    // router.push(`/${url}`)
    router.push(`/`)
    // navigation.navigate('Index'); // Navigate to index.jsx
  };
  const handleOptions= ()=>{
    setShowLogout(false);
    router.push(`/options`)
  }

  const closeDropdown = () => {
    if (showLogout) {
      setShowLogout(false);
    }
  };
  const handleSetting=()=>{
    setShowLogout(false);
    router.push(`/settings`)
  }

  return (
    <Pressable onPress={closeDropdown} style={styles.container}>
      <View style={styles.container}>
        {/* User Icon */}
        <TouchableOpacity onPress={() => setShowLogout(!showLogout)}>
          {
            userImage ?<Image
            source={{ uri: userImage }}
            style={{ width: 30, height: 30, marginBottom: 5, borderRadius: 10 }}
          />:<EvilIcons name="user" size={30} color="black" />
          }
        </TouchableOpacity>
        

        {/* Logout Option */}
        {showLogout && (
          <View style={styles.logoutContainer}>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOptions}>
              <Text style={styles.logoutText}>Main Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSetting}>
              <Text style={styles.logoutText}>Settings</Text>
            </TouchableOpacity>
          </View>
          
        )}

        {/* Greeting */}
        <Text style={styles.greeting}>Hi {name}</Text>
      </View>
    </Pressable>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    flexWrap:'nowrap',
    // position:'relative',
    zIndex:99999,
    width:"107%",
    height:'70'
  },
  logoutContainer: {
    position: 'absolute',
    top: 35, // Adjusts position below the icon
    left: 0,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 5,
    // elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    // shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex:9,
    width:'150px',
    height:'auto'
    
  },
  logoutText: {
    fontSize: 14,
    color: '#333',
    padding: 5,
  },
  greeting: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    width:150
  },
});
