import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform ,ScrollView, Switch, } from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Ionicons, Feather } from '@expo/vector-icons'; // For the forward arrow icon
import Checkbox from 'expo-checkbox';
import generatePDF from '../generator'
import { useRouter } from 'expo-router';


const MultiStepForm = () => {
  const router = useRouter()
    const [currentStep, setCurrentStep] = useState(0);
    const [isChecked, setChecked]= useState(false)
    const [shipTo, setShipTo] = useState('');
    const [shipToname, setshipToname] =useState('')
    const [shipToGST, setShipToGST] = useState('');
    const [shipToState, setShipToState] = useState('');
    const [shipToStateCode, setShipToStateCode] = useState('');
    const [billTo, setBillTo] = useState('');
    const [billToGST, setBillToGST] = useState('');
    const [billToState, setBillToState] = useState('');
    const [billToName, setbillToName] =useState('')
    const [isIGST, setIsIGST] = useState(false);

    const [billToStateCode, setBillToStateCode] = useState('');
    const [invoiceDetails, setInvoiceDetails] = useState({});
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState({ name: '', hsn: '', qty: '', price: '', unit:'' });
    useEffect(() => {
      if (isChecked) {
        setbillToName(shipToname);
        setBillTo(shipTo);
        setBillToGST(shipToGST);
        setBillToState(shipToState);
        setBillToStateCode(shipToStateCode);
      } else {
        setbillToName('');
        setBillTo('');
        setBillToGST('');
        setBillToState('');
        setBillToStateCode('');
      }
    }, [isChecked, shipToname, shipTo, shipToGST, shipToState, shipToStateCode]);
    function handleNavigate(path){
      router.push(path)
    }
    const handleAddProduct = () => {
      if (currentProduct.name && currentProduct.qty && currentProduct.price) {
        setProducts([...products, currentProduct]);
        setCurrentProduct({ name: '', hsn: '', qty: '', price: '', unit:'' });
      } else {
        alert('Please fill all required fields');
      }
    };
  
    const handleInputChange = (field, value) => {
      setCurrentProduct({ ...currentProduct, [field]: value });
    };
  
    const handleNext = () => {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      }
    };
  
    const handleBack = () => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
    };
  
    const handleSubmit = () => {
      const formData = {
        ship_to: {
          name:shipToname,  
          address: shipTo,
          gst: shipToGST,
          state: shipToState,
          state_code: shipToStateCode,
        },
        bill_to: {
          name:billToName,
          address: billTo,
          gst: billToGST,
          state: billToState,
          state_code: billToStateCode,
        },
        products,
        invoice_details: invoiceDetails,
      };
  
      // console.log('Form Data:', formData);
      // Replace generatePDF with your logic for processing or submitting the data
      generatePDF(formData, 'generate-pdf');
    };
  
    const renderForm = () => {
      switch (currentStep) {
        case 0:
          return (
            <View style={styles.form}>
              <Text style={styles.heading_in}>Ship To</Text>
              <View style={styles.formDetails}>
              <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={shipToname}
                  onChangeText={setshipToname}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Address"
                  value={shipTo}
                  onChangeText={setShipTo}
                />
                <TextInput
                  style={styles.input}
                  placeholder="GST No"
                  value={shipToGST}
                  onChangeText={setShipToGST}
                />
                <TextInput
                  style={styles.input}
                  placeholder="State"
                  value={shipToState}
                  onChangeText={setShipToState}
                />
                <TextInput
                  style={styles.input}
                  placeholder="State Code"
                  value={shipToStateCode}
                  onChangeText={setShipToStateCode}
                />
              </View>
              <View style={styles.buttons}>
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        case 1:
          return (
            <View style={styles.form}>
              <Text style={styles.heading_in}>Bill To</Text>
              <View style={styles.formDetails}>
              <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={billToName}
                  onChangeText={setbillToName}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Address"
                  value={billTo}
                  onChangeText={setBillTo}
                />
                <TextInput
                  style={styles.input}
                  placeholder="GST No"
                  value={billToGST}
                  onChangeText={setBillToGST}
                />
                <TextInput
                  style={styles.input}
                  placeholder="State"
                  value={billToState}
                  onChangeText={setBillToState}
                />
                <TextInput
                  style={styles.input}
                  placeholder="State Code"
                  value={billToStateCode}
                  onChangeText={setBillToStateCode}
                />
              </View>
              <View style={styles.section}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#4630EB' : undefined}
        />
        <Text style={styles.paragraph}>Same as ship to.</Text>
      </View>
              <View style={styles.button_all}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              </View>
              
            
            </View>
          );
        case 2:
            return (
                <View style={styles.form}>
    
                    <View style={styles.formDetails_scroll}>
                    <Text style={styles.heading_in}>Product Details</Text>
                    <View style={styles.formDetails}>
                  <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={currentProduct.name}
                    onChangeText={(text) => handleInputChange("name", text)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="HSN/SAC"
                    value={currentProduct.hsn}
                    onChangeText={(text) => handleInputChange("hsn", text)}
                  />
                   <TextInput
                    style={styles.input}
                    placeholder="UNIT"
                    value={currentProduct.unit}
                    onChangeText={(text) => handleInputChange("unit", text)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="QTY"
                    value={currentProduct.qty}
                    onChangeText={(text) => handleInputChange("qty", text)}
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Price"
                    value={currentProduct.price}
                    onChangeText={(text) => handleInputChange("price", text)}
                    keyboardType="numeric"
                  />
                  <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
                    <Text style={styles.buttonText}>Add Product</Text>
                  </TouchableOpacity>
                </View>
          
                <ScrollView
      showsVerticalScrollIndicator={true}
      style={styles.productScrollView}
      nestedScrollEnabled
    >
      {products.map((product, index) => (
        <View key={index} style={styles.productCard}>
          <View style={styles.productDetails}>
            <Text style={styles.productText}>Name: {product.name}</Text>
            <Text style={styles.productText}>HSN/SAC: {product.hsn}</Text>
            <Text style={styles.productText}>QTY: {product.qty}</Text>
            <Text style={styles.productText}>Price: {product.price}</Text>
            <Text style={styles.productText}>Unit: {product.unit}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              const updatedProducts = products.filter((_, i) => i !== index);
              setProducts(updatedProducts);
            }}
            style={styles.deleteButton}
          >
            <Ionicons name="trash" size={20} color="red" />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
    
                    </View>
                
          
                
          
                <View style={styles.button_all}>
                  <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Text style={styles.buttonText}>Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.buttonText}>Next</Text>
                    <Ionicons name="arrow-forward" size={18} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            );
        case 3:
          return (
            <View style={styles.form}>
              <Text style={styles.heading_in}>Invoice Details</Text>
              <View style={styles.formDetails}>
                <TextInput
                  style={styles.input}
                  placeholder="Invoice No"
                  onChangeText={(text) =>
                    setInvoiceDetails({ ...invoiceDetails, invoiceNo: text })
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="E-way Bill"
                  onChangeText={(text) =>
                    setInvoiceDetails({ ...invoiceDetails, ewayBill: text })
                  }
                />
                <TextInput
                style={styles.input}
                placeholder="Date"
                onChangeText={(text) =>
                  setInvoiceDetails({ ...invoiceDetails, date: text })
                }
              />
               <TextInput
                style={styles.input}
                placeholder="Payment Mode"
                onChangeText={(text) =>
                  setInvoiceDetails({ ...invoiceDetails, paymentMode: text })
                }
              />
             
               <TextInput
                style={styles.input}
                placeholder="Refrence name"
                onChangeText={(text) =>
                  setInvoiceDetails({ ...invoiceDetails, refName: text })
                }
              />
               <TextInput
                style={styles.input}
                placeholder="Order No"
                onChangeText={(text) =>
                  setInvoiceDetails({ ...invoiceDetails, orderNum: text })
                }
              />
               <TextInput
                style={styles.input}
                placeholder="Vehicle Num"
                onChangeText={(text) =>
                  setInvoiceDetails({ ...invoiceDetails, motorNum: text })
                }
              />
               <View style={styles.toggleContainer}>
        <Text>Use IGST?</Text>
        <Switch 
  value={isIGST} 
  onValueChange={() => {
    setIsIGST((prev) => {
      const newIsIGST = !prev;
      setInvoiceDetails({
        ...invoiceDetails,
        igst: newIsIGST ? '' : '',  // Reset IGST when switching
        cgst: newIsIGST ? '' : '',  // Reset CGST when switching
        sgst: newIsIGST ? '' : ''   // Reset SGST when switching
      });
      return newIsIGST;
    });
  }} 
/>
      </View>

      {isIGST ? (
        <TextInput
          style={styles.input}
          placeholder="IGST%"
          keyboardType="numeric"
          onChangeText={(text) =>
            setInvoiceDetails({ ...invoiceDetails, igst: text})
          }
          value={invoiceDetails.igst}
        />
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="CGST%"
            keyboardType="numeric"
            onChangeText={(text) =>
              setInvoiceDetails({ ...invoiceDetails, cgst: text })
            }
            value={invoiceDetails.cgst}
          />
          <TextInput
            style={styles.input}
            placeholder="SGST%"
            keyboardType="numeric"
            onChangeText={(text) =>
              setInvoiceDetails({ ...invoiceDetails, sgst: text})
            }
            value={invoiceDetails.sgst}
          />
        </>
      )}
              
              <TextInput
                style={styles.input}
                placeholder="Destination"
                onChangeText={(text) =>
                  setInvoiceDetails({ ...invoiceDetails, destination: text })
                }
              />
               <TextInput
                style={styles.input}
                placeholder="Dispatch From"
                onChangeText={(text) =>
                  setInvoiceDetails({ ...invoiceDetails, dispatch_from: text })
                }
              />
              </View>
              <View style={styles.button_all}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        default:
          return null;
      }
    };
  
    return  <View style={{ flex: 1 }}>
    {/* History Button */}
    <TouchableOpacity
      style={styles.historyButton}
      onPress={() => handleNavigate("History")}
    >
      <Feather name="download" size={24} color="white" />
      {/* <Text style={styles.historyText}>History</Text> */}
    </TouchableOpacity>

    <ScrollView contentContainerStyle={styles.scrollContainer} nestedScrollEnabled>
      <View style={styles.container}>{renderForm()}</View>
    </ScrollView>
  </View>;
  };
  

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Allows scrolling when content exceeds the screen height
    // paddingVertical: 20,
    backgroundColor:'red'

  },
    container: {
      // flex: 1,
      backgroundColor: '#f9f9f9',
      justifyContent: 'center', // Centers the content vertically
      alignItems: 'center', 
      padding:0,// Centers the content horizontally
      overflow:'scroll',
      height:'100%'
    },
    form: {
      width: '100%', // Ensures the form doesn't exceed the screen width
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
      alignItems: 'center', 
      flex:1,
      justifyContent:'space-between',
      overflow:'scroll'
      
      // Align content inside the form
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 20,
      textAlign: 'center',
      position:'relative',
      top:100,
    //   backgroundColor:'blue',
      height:'auto'
    },
    heading_in:{
        fontSize:18,
        marginTop: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom:10

    },
    formDetails:{
        // backgroundColor:'red',
        width:'100%'
    },
    input: {
        width: '100%', // Ensures the input takes full width of the form
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
      },
    buttons:{
        // backgroundColor:'red',
        width:'100%',
        justifyContent:'center',
        alignItems:'flex-end'
        },
    button_all:{
        // backgroundColor:'red',
        width:'100%',
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    nextButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#007BFF',
      paddingVertical: 12,
      borderRadius: 8,
      paddingHorizontal: 20,
    },
    backButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ccc', // Slightly lighter color for the Back button
      paddingVertical: 12,
      borderRadius: 8,
      paddingHorizontal: 20,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    add_product:{
        width:'100%',
        flexDirection:'row',
        overflowX:'scroll',
        // r
    
        height:100
    },
    addButton: {
        backgroundColor: "#4CAF50",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
      },
      buttonText: {
        color: "white",
        fontWeight: "bold",
      },
      productScrollView: {
        marginBottom: 20,
        // backgroundColor: "red",
        width:'100%',
        flexDirection:'column',
        height:'auto',
        overflow:'scroll',
        maxHeight:320,
        padding:3
        
        // justifyContent:'center'
      },

      productText: {
        fontSize: 16,
        marginBottom: 5,
      },
      buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      formDetails_scroll:{
        width  :'100%',
        overflow:'scroll',
        paddingTop:50
      },
        productCard: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 15,
          marginBottom: 10,
          borderColor: '#ddd',
          borderWidth: 1,
          borderRadius: 8,
          backgroundColor: '#f9f9f9',
          overflow: 'hidden',
        },
        productDetails: {
          flex: 1,
          marginRight: 10,
        },
        productText: {
          fontSize: 14,
          color: '#333',
          marginBottom: 5,
        },
        deleteButton: {
          padding: 5,
        },
        submitButton:{
            flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#4CAF50',
      paddingVertical: 12,
      borderRadius: 8,
      paddingHorizontal: 20,
        },
        section:{
          flexDirection:'row',
          // backgroundColor:'red',
          justifyContent:'space-between',
          position:'relative',
          left:'33%',
          bottom:'15%',
          alignItems:'center'
        },
        paragraph:{
          fontSize:14,
          marginLeft:4,
          display:'flex',
         
        },
        checkbox:{
          width:15,
          height:15,
        },
        toggleContainer: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        },
        historyButton: {
          position: 'absolute',
          top: 50,
          right: 20,
          zIndex: 10,
          flexDirection: 'column', // Stack icon above text
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#007BFF',
          padding: 10,
          borderRadius: 8,
          elevation: 5, // For Android shadow
          shadowColor: '#000', // For iOS shadow
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
        },
        historyText: {
          color: 'white',
          fontSize: 12,
          marginTop: 4,
        },
  });
  

export default MultiStepForm;
