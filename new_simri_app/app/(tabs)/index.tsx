import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
  Pressable
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { databases } from '../../database';
import { storage } from '../../storage';
import Loader from '../../components/loader';

const BookingModal = ({ visible, onClose, quantities, items }) => {
  const cartItems = items.filter(item => quantities[item.name]); // Get selected items
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * quantities[item.name]), 0);

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <Pressable style={styles.modalContainer} onPress={onClose}>
        <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
          <Text style={styles.modalTitle}>Cart Summary</Text>

          {cartItems.length > 0 ? (
            <>
              <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                    <Text>{item.name} x {quantities[item.name]}</Text>
                    <Text>₹{item.price * quantities[item.name]}</Text>
                  </View>
                )}
              />
              <Text style={{ fontSize: 18, fontWeight: "bold", marginVertical: 10 }}>
                Total: ₹{totalAmount}
              </Text>
              <Button title="Buy" onPress={() => alert("Proceed to Payment")} />
            </>
          ) : (
            <Text>Your cart is empty.</Text>
          )}

          {/* <Button title="Close" onPress={onClose} /> */}
        </View>
      </Pressable>
    </Modal>
  );
};

const App = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await databases.listDocuments(
          '6740474900354338e949', // databaseId
          '674047600025528835b3'  // collectionId
        );

        const documents = response.documents || [];
        const fileResponse = await storage.listFiles('6742e69c003e3ca0399e');
        const files = fileResponse.files || [];

        const itemsWithImages = await Promise.all(
          documents.map(async (doc) => {
            const file = files.find((f) => f.name.includes(doc.name.toLowerCase()));
            let imageUrl = null;
            if (file) {
              imageUrl = await storage.getFileView('6742e69c003e3ca0399e', file.$id);
            }
            return { ...doc, imageUrl };
          })
        );

        setItems(itemsWithImages);
      } catch (error) {
        console.error('Error fetching items or images:', error);
      }
      setLoading(false);
    })();
  }, []);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAdd = (id, name, price) => {
    setQuantities((prev) => {
      const newQty = { ...prev, [name]: (prev[name] || 0) + 1 };
      setCartCount(Object.values(newQty).reduce((a, b) => a + b, 0));
      return newQty;
    });
  };

  const handleRemove = (id, name, price) => {
    setQuantities((prev) => {
      const newQty = { ...prev, [name]: Math.max((prev[name] || 0) - 1, 0) };
      setCartCount(Object.values(newQty).reduce((a, b) => a + b, 0));
      return newQty;
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search items..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <TouchableOpacity style={styles.cartIcon} onPress={() => setModalVisible(true)}>
        <Ionicons name="cart" size={30} color="#000" />
        {cartCount > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>

      <FlatList
        numColumns={2}
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <View style={styles.itemIn}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>₹{item.price} KG</Text>
              </View>
              <View style={styles.quantityControls}>
                {!quantities[item.name] ? (
                  <TouchableOpacity
                    onPress={() => handleAdd(item.id, item.name, item.price)}
                    style={[styles.button, styles.addButton]}
                  >
                    <Text style={styles.addText}>Add</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.plusMinus}>
                    <TouchableOpacity onPress={() => handleRemove(item.id, item.name, item.price)} style={styles.button}>
                      <Ionicons name="remove" size={20} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantities[item.name]}</Text>
                    <TouchableOpacity onPress={() => handleAdd(item.id, item.name, item.price)} style={styles.button}>
                      <Ionicons name="add" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}
      />
      <Loader visible={loading} />
      <BookingModal visible={modalVisible} onClose={() => setModalVisible(false)} quantities={quantities} items={items} />
    </View>
  );
};

export default App;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    marginTop: 35
  },
  searchBar: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
  },
  cartIcon: {
    position: "absolute",
    top: 10,
    right: 20,
  },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  itemCard: {
    flexDirection: "column",
    alignItems: "center",
    width: "45%",
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  itemImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 8,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    padding: 5,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 5,
    borderRadius: 5,
  },
  addText: {
    color: "#fff",
    width:80,
    textAlign:'center'
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
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  plusMinus: {
    backgroundColor: "#4CAF50",
    // padding: 5,
    borderRadius: 5,
    display:'flex',
    flexDirection:'row',
    width:80,
    alignItems:'center',
    justifyContent:'space-evenly',
    color:"#fff",
    // width:100
  },
  quantityText:{
    color:"#fff"
  },
  itemDetails:{
    width:'90%',
    // backgroundColor:'red'
    alignItems:'center'
  },
  itemIn:{
    // backgroundColor:'red',
    display:'flex',
    flexDirection:"row",
    justifyContent:'space-between',
    width:'100%'
  }
});
