import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';

const Delivery = () => {
  const [formData, setFormData] = useState({
    pickupLocation: '',
    deliveryLocation: '',
    itemName: '',
    contactDetails: '',
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const { pickupLocation, deliveryLocation, itemName, contactDetails } = formData;
    if (!pickupLocation || !deliveryLocation || !itemName || !contactDetails) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
    Alert.alert('Success', 'Delivery details submitted successfully!', [
      { text: 'OK' },
    ]);
    console.log('Submitted Data:', formData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter Delivery Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Pickup Location"
        value={formData.pickupLocation}
        onChangeText={(text) => handleInputChange('pickupLocation', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Delivery Location"
        value={formData.deliveryLocation}
        onChangeText={(text) => handleInputChange('deliveryLocation', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={formData.itemName}
        onChangeText={(text) => handleInputChange('itemName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Details"
        value={formData.contactDetails}
        onChangeText={(text) => handleInputChange('contactDetails', text)}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Delivery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
