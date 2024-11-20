import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useRouter } from 'expo-router'

const Welcome = ({ name }) => {
    const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);
  const navigation = useNavigation();

  const handleLogout = () => {
    setShowLogout(false);
    
    // router.push(`/${url}`)
    router.push(`/`)
    // navigation.navigate('Index'); // Navigate to index.jsx
  };

  const closeDropdown = () => {
    if (showLogout) {
      setShowLogout(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={closeDropdown}>
      <View style={styles.container}>
        {/* User Icon */}
        <TouchableOpacity onPress={() => setShowLogout(!showLogout)}>
          <EvilIcons name="user" size={30} color="black" />
        </TouchableOpacity>

        {/* Logout Option */}
        {showLogout && (
          <View style={styles.logoutContainer}>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Greeting */}
        <Text style={styles.greeting}>Hi {name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  logoutContainer: {
    position: 'absolute',
    top: 35, // Adjusts position below the icon
    left: 0,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 5,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
  },
});
