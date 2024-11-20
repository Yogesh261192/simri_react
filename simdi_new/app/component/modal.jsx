import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const MyModal = ({ current, onClose }) => {
  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={current}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Why Simdi?</Text>
          <Text style={styles.modalDescription}>
            Simdi, your Himalayan friend, is a{" "}
            <Text style={styles.boldText}>S</Text>ustainable{" "}
            <Text style={styles.boldText}>I</Text>nitiative for{" "}
            <Text style={styles.boldText}>M</Text>arketplace,{" "}
            <Text style={styles.boldText}>D</Text>elivery, and{" "}
            <Text style={styles.boldText}>I</Text>ntercity Transport.{"\n"}
            हमारा मुख्य उद्देश्य है शुद्ध पहाड़ी उत्पादों को आम जन तक पहुंचाना जिनकी उत्पादक स्वयं गाँव की <Text style={styles.boldText}>महिलाएं</Text> हैं । 
            हम आपके लिए लाते हैं सहज और सुरक्षित यात्रा का अनुभव एवं साथ ही <Text style={styles.boldText}>पलायन</Text> की मार से पीड़ित गाँवों में रोज़गार के नए अवसरों के सृजन हेतु भी निरंतर प्रयासरत हैं।
            {"\n"}आप सभी का सहयोग इस छोटी सी पहल को धारणा का रूप दे सकता है। 
            आइए और <Text style={styles.boldText}>जुड़िए हमारी इस मुहिम</Text>जुड़िए हमारी इस मुहिम के साथ।
          </Text>

          {/* Icons section */}
          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={() => openLink('https://www.facebook.com/Yoursimdi')}>
              <Feather name="facebook" size={24} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openLink('https://www.instagram.com/yoursimdi/profilecard/?igsh=MWJ2MGJpNmR1bzF2NA==')}>
              <Feather name="instagram" size={24} color="red" />
            </TouchableOpacity>
          </View>

          {/* Close button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#ff8800',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,  // Added margin for space between the icons and close button
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  iconsContainer: {
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,  // Add space above the close button
  },
  icon: {
    marginHorizontal: 15,  // Spacing between the icons
  },
});

export default MyModal;
