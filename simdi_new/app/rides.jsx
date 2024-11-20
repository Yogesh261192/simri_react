import React, { useState , useContext} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Welcome from './component/welcome';
import { UserContext } from './component/userDetails';
import axios from 'axios';

const Rider = ({ rider, onBookingInfoPress }) => (
  
  <View style={styles.riderContainer}>
    <Image source={rider.image} style={styles.riderImage} />
    <View style={styles.riderDetails}>
      <Text style={styles.riderName}>{rider.name}</Text>
      <Text style={styles.rideDetails}>
        From: {rider.from} → To: {rider.to}
      </Text>
    </View>
    <TouchableOpacity style={styles.contactButton} onPress={() => onBookingInfoPress(rider)}>
      <Text style={styles.contactText}>Booking info</Text>
    </TouchableOpacity>
  </View>
);

const RidersList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRider, setSelectedRider] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState(1);
  const { user } = useContext(UserContext); 
  console.log(user)

  const ridersToday = [
    { id: '1', name: 'Rakesh', from: 'Tripalisain', to: 'Delhi', image: require('../assets/images/somesh.png'), carNumber: 'UK07AB1234', carImage: require('../assets/images/car.png'), seatsAvailable: 4 },
    { id: '2', name: 'Somesh', from: 'Nainital', to: 'Haridwar', image: require('../assets/images/somesh.png'), carNumber: 'UK07XY5678', carImage: require('../assets/images/car.png'), seatsAvailable: 3 },
  ];

  const ridersTomorrow = [
    { id: '3', name: 'Ajay', from: 'Dehradun', to: 'Shimla', image: require('../assets/images/somesh.png'), carNumber: 'HP01CD7890', carImage: require('../assets/images/car.png'), seatsAvailable: 5 },
    { id: '4', name: 'Parvesh', from: 'Haldwani', to: 'Pithoragarh', image: require('../assets/images/somesh.png'), carNumber: 'UK05EF1122', carImage: require('../assets/images/car.png'), seatsAvailable: 2 },
  ];

  const handleBookingInfoPress = (rider) => {
    setSelectedRider(rider);
    setSelectedSeats(1);
    setModalVisible(true);
  };

  const handleConfirmBooking = async () => {
    alert(`You have booked ${selectedSeats} seat(s) with ${selectedRider.name}!`);
    const url = 'http://13.60.56.185:3000/ride'; // Replace with the actual URL
    const data = {
      phone:user.phone,
      seatsBoooked:selectedSeats,
      driverName: selectedRider.name
    };
    // alert(JSON.stringify(data))
    
    try {
      // alert('1222')
      const response = await axios.post(url, data);
      
      console.log(response.data)
      // if(!response.data.error){
      //   router.push('/options');
      // }
      // else{
      //   alert(JSON.stringify(response.data.message), 'cha')
      // }
      
      // alert('Registered Success please login')
      // console.log('Response:', response.data);
    } catch (error) {
      alert('wrong user', error)
      console.error('Error:', error);
    }
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Welcome name="Yogesh" />
      <Text style={styles.sectionTitle}>Rides Available Today</Text>
      <FlatList
        data={ridersToday}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Rider rider={item} onBookingInfoPress={handleBookingInfoPress} />}
        contentContainerStyle={styles.list}
      />

      <Text style={styles.sectionTitle}>Rides Available Tomorrow</Text>
      <FlatList
        data={ridersTomorrow}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Rider rider={item} onBookingInfoPress={handleBookingInfoPress} />}
        contentContainerStyle={styles.list}
      />

      {/* Modal for Booking Info */}
      {selectedRider && (
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Image source={selectedRider.carImage} style={styles.carImage} />
              <Text style={styles.modalTitle}>{selectedRider.name}'s Ride</Text>
              <Text>Car Number: {selectedRider.carNumber}</Text>
              <Text>Seats Available: {selectedRider.seatsAvailable}</Text>

              {/* Seat Booking */}
              <View style={styles.seatBooking}>
                <TouchableOpacity
                  style={styles.seatButton}
                  onPress={() => setSelectedSeats((prev) => Math.max(1, prev - 1))}
                >
                  <Text style={styles.seatButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.seatsText}>{selectedSeats}</Text>
                <TouchableOpacity
                  style={styles.seatButton}
                  onPress={() => setSelectedSeats((prev) => Math.min(selectedRider.seatsAvailable, prev + 1))}
                >
                  <Text style={styles.seatButtonText}>+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmBooking}>
                <Text style={styles.confirmButtonText}>Confirm Booking</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

export default RidersList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  list: {
    marginBottom: 20,
  },
  riderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  riderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  riderDetails: {
    flex: 1,
  },
  riderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  rideDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  contactButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  contactText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  carImage: {
    width: 150,
    height: 100,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  seatBooking: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  seatButton: {
    backgroundColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
  },
  seatButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seatsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 15,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#007BFF',
  },
});
