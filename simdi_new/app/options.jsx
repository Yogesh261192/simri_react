import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Contacts from 'expo-contacts';
// import image from './'

import { useRouter } from 'expo-router';

const BigButtons = () => {
  const router = useRouter();

  const handlePress = (url) => {
    router.push(`/${url}`);
  };

  const accessContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        const firstContact = data[0];
        Alert.alert(
          'First Contact',
          `Name: ${firstContact.name}\nEmail: ${
            firstContact.emails ? firstContact.emails[0].email : 'N/A'
          }\nPhone: ${
            firstContact.phoneNumbers ? firstContact.phoneNumbers[0].number : 'N/A'
          }`
        );
      } else {
        Alert.alert('No Contacts Found', 'Your contacts list is empty.');
      }
    } else {
      Alert.alert('Permission Denied', 'Cannot access contacts without permission.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.bigButton} onPress={() => handlePress('items')}>
        <View style={styles.view_container}>
          <Text style={styles.buttonText}>Pahari items</Text>
          <Text>
            <Entypo name="shopping-cart" size={24} color="black" />
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.bigButton} onPress={() => handlePress('rides')}>
        <View style={styles.view_container}>
          <Text style={styles.buttonText}>Book a ride</Text>
          <Text>
            <FontAwesome name="taxi" size={24} color="black" />
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.bigButton} onPress={() => handlePress('delivery')}>
        <View style={styles.view_container}>
          <Text style={styles.buttonText}>Deliver items</Text>
          <Text>
            <MaterialIcons name="local-shipping" size={24} color="black" />
          </Text>
        </View>
      </TouchableOpacity>

      {/* New Button for Accessing Contacts */}
      <TouchableOpacity style={styles.bigButton} onPress={accessContacts}>
        <View style={styles.view_container}>
          <Text style={styles.buttonText}>Access Contacts</Text>
          <Text>
            <FontAwesome name="address-book" size={24} color="black" />
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    padding: 20,
    width: '100%',
    flexWrap: 'wrap',
  },
  bigButton: {
    backgroundColor: '#cfd5df',
    borderRadius: 10,
    margin: 10,
    width: '40%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    width: '100%',
    textAlign: 'center',
  },
  view_container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BigButtons;
