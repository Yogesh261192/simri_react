import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Alert ,Modal, Button, Pressable,} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import DropDownPicker from 'react-native-dropdown-picker';
import Constants from "expo-constants";
import { PROVIDER_GOOGLE } from 'react-native-maps'
// import { GOOGLE_MAPS_API_KEY } from "@env";
// Initialize Geocoder with your Google Maps API key
const googleMapsApiKey = Constants.expoConfig?.extra?.googleMapsApiKey || "";

Geocoder.init(googleMapsApiKey);
const BookingModal = ({ visible, onClose }) => {
  const [bookingType, setBookingType] = useState('whole');
  const [seatCount, setSeatCount] = useState(1);
  const [open, setOpen] = useState(false);
  const [items] = useState([
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
  ]);

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <Pressable style={styles.modalContainer} onPress={onClose}>
        <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
          <Text style={styles.modalTitle}>Booking Options</Text>

          <TouchableOpacity onPress={() => setBookingType('whole')}>
            <Text style={bookingType === 'whole' ? styles.selectedOption : styles.option}>
              Full Book
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setBookingType('seats')}>
            <Text style={bookingType === 'seats' ? styles.selectedOption : styles.option}>
              Book Seats
            </Text>
          </TouchableOpacity>

          {bookingType === 'seats' && (
            <View style={styles.seatSelectionContainer}>
              <Text style={styles.label}>Select Seats:</Text>
              <DropDownPicker
                open={open}
                value={seatCount}
                items={items}
                setOpen={setOpen}
                setValue={setSeatCount}
                setItems={() => {}}
                containerStyle={{ width: '100%' }}
              />
              <Text style={styles.priceText}>Price per seat: ₹1500</Text>
            </View>
          )}

          <Button title="Confirm Booking" onPress={onClose} />
        </View>
      </Pressable>
    </Modal>
  );
};

const Rides = () => {
  const mapRef = useRef(null);

  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropLocation, setDropLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [activeSearchType, setActiveSearchType] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);


  const handleLocationSearch = async (query, type) => {
    try {
      const result = await Geocoder.from(query);
      const locations = result.results.map((loc) => ({
        name: loc.formatted_address,
        coords: loc.geometry.location
      }));
      setSearchResults(locations);
      setActiveSearchType(type);
    } catch (error) {
      console.log(error);
      // Alert.alert('Error', 'Location not found');
    }
  };

  const handleSelectLocation = (selectedLocation) => {
    const newLocation = {
      latitude: selectedLocation.coords.lat,
      longitude: selectedLocation.coords.lng,
    };

    if (activeSearchType === 'pickup') {
      setPickupLocation(newLocation);
      mapRef.current?.animateToRegion({
        ...newLocation,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 100);
      setRouteCoordinates([])
    } else if (activeSearchType === 'drop') {
      setDropLocation(newLocation);
      if (pickupLocation) {
        mapRef.current?.fitToCoordinates([pickupLocation, newLocation], {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
      } else {
        mapRef.current?.animateToRegion({
          ...newLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }, 100);
      }
    }

    setSearchResults([]); // Clear dropdown results

    if (pickupLocation && dropLocation) {
      fetchRoute(pickupLocation, newLocation);
    }
  };

  const fetchRoute = async (start, end) => {
    const url = `https://router.project-osrm.org/route/v1/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?overview=full&geometries=geojson`;

    try {
      console.log('fetching')
      const response = await fetch(url);
      const data = await response.json();
      const coordinates = data.routes[0].geometry.coordinates.map(([lng, lat]) => ({
        latitude: lat,
        longitude: lng
      }));
      console.log(data)
      setRouteCoordinates(coordinates);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch route data');
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 28.7041,
          longitude: 77.1025,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        provider={PROVIDER_GOOGLE}
      >
        {pickupLocation && <Marker coordinate={pickupLocation} pinColor="red" title="Pickup Location" />}
        {dropLocation && <Marker coordinate={dropLocation} pinColor="green" title="Drop Location" />}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="green"
            strokeWidth={5}
          />
        )}
      </MapView>
      <TouchableOpacity style={styles.goButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.goButtonText}>Book</Text>
      </TouchableOpacity>
      <BookingModal visible={modalVisible} onClose={() => setModalVisible(false)} />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search Pickup Location"
          onChangeText={(text) => handleLocationSearch(text, 'pickup')}
        />
        <TextInput
          style={styles.input}
          placeholder="Search Drop Location"
          onChangeText={(text) => handleLocationSearch(text, 'drop')}
        />

        {searchResults.length > 0 && (
          <FlatList
            data={searchResults}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectLocation(item)} style={styles.resultItem}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
            style={styles.flatList}
          />
        )}
        {/* <Button>Confirm</Button> */}
      </View>
    </View>
  );
};

export default Rides;

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  searchContainer: {
    backgroundColor: '#fff',
    padding: 10,
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    borderRadius: 8,
    elevation: 4,
  },
  input: {
    backgroundColor: '#f1f1f1',
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  flatList:{
    elevation: 5,
    zIndex: 1
  },
  goButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16
  },
  goButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'white',
    height: 50,
    width: 50,
    borderRadius: 30,
    // borderRadius: '55%',
    // paddingVertical: 8,
    // paddingHorizontal: 0,
    alignItems:'center',
    justifyContent:'center',
    elevation: 5,
    zIndex: 1
  },
    modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  option: {
    fontSize: 18,
    padding: 10,
    textAlign:'center'
  },
  selectedOption: {
    fontSize: 18,
     textAlign:'center',
    padding: 10,
    backgroundColor: 'green',
    color: '#fff',
    borderRadius: 5,
  },
  seatSelectionContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  priceText: {
    marginTop: 10,
    fontWeight: 'bold',
    color: '#FFA500',
  },
});
