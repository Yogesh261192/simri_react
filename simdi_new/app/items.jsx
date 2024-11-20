import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import Welcome from './component/welcome';
import Entypo from '@expo/vector-icons/Entypo';
import axios from 'axios';
import { UserContext } from './component/userDetails';
// const { user } = useContext(UserContext); 

// Function to handle buying items
const handleBuyItems = async (cart, user) => {
 
  try {
    // Prepare the data from the cart
    const itemsToBuy = Object.keys(cart).map((itemId) => ({
      
      itemName: cart[itemId].name,
      quantity: cart[itemId].quantity,
    }));
    itemsToBuy.push({
      phone:user.phone
    })
    // itemsToBuy.phone= user.phone
    // Send the request to the API
    const response = await axios.post('http://13.60.56.185:3000/buy', itemsToBuy);

    if (response.status === 200) {
      alert('We will notify the status shortly via call')
      console.log('Successfully purchased items:', response.data);
    } else {
      console.error('Failed to purchase items:', response.status);
    }
  } catch (error) {
    console.error('Error purchasing items:', error.message);
  }
};

const Item = ({ item, quantity, onAdd, onRemove }) => (
  <View style={styles.itemContainer}>
    <Image source={item.image} style={{ width: 80, height: 80, marginBottom: 5 }} />
    <Text style={styles.itemName}>{item.name}</Text>
    <Text style={styles.itemPrice}>{item.price}rs</Text>
    <View style={styles.quantityBar}>
      <View style={styles.addRemove}>
        <TouchableOpacity onPress={() => onRemove(item)}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity onPress={() => onAdd(item)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const Items = () => {
  const [cart, setCart] = useState({});
  const [searchText, setSearchText] = useState('');
  const { user } = useContext(UserContext); 


  const items = [
    { id: '1', name: 'Gauth', price: 100, image: require('../assets/images/gauth.png') },
    { id: '2', name: 'Jhangora', price: 80, image: require('../assets/images/jhangora.png') },
    { id: '3', name: 'Raagi', price: 40, image: require('../assets/images/raagi.png') },
    { id: '4', name: 'Khafal', price: 75, image: require('../assets/images/kaafal.png') },
  ];

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const addToCart = (item) => {
    setCart((prevCart) => ({
      ...prevCart,
      [item.id]: {
        name: item.name,
        quantity: (prevCart[item.id]?.quantity || 0) + 1,
      },
    }));
  };

  const removeFromCart = (item) => {
    setCart((prevCart) => {
      if (!prevCart[item.id]) return prevCart;
      const newCart = { ...prevCart };
      newCart[item.id].quantity -= 1;
      if (newCart[item.id].quantity <= 0) delete newCart[item.id];
      return newCart;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.welcomeTab}>
        <Welcome name="Yogesh" />
        <Text style={styles.cartText}>
          <Entypo name="shopping-cart" size={24} color="black" /> (
          {Object.values(cart).reduce((total, item) => total + item.quantity, 0)})
        </Text>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search items..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <View style={styles.listContainer}>
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <Item
              item={item}
              quantity={cart[item.id]?.quantity || 0}
              onAdd={addToCart}
              onRemove={removeFromCart}
            />
          )}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.switchText}
          onPress={() => {
            handleBuyItems(cart, user); // Pass the current cart state
          }}
        >
          <Text>Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Items;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cartText: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
    color: 'black',
  },
  searchBar: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  itemPrice: {
    fontSize: 12,
    color: '#555',
  },
  quantityBar: {
    marginTop: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  quantityButton: {
    fontSize: 20,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  welcomeTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ddd',
    width: '48%',
  },
  switchText: {
    backgroundColor: '#ff8800',
    padding: 15,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  addRemove: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    width: 100,
  },
});
