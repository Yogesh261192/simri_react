// import React, { useState, useContext, useEffect } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   Modal,
//   Button,
// } from 'react-native';
// // import RNFS from 'react-native-fs';
// import EvilIcons from '@expo/vector-icons/EvilIcons';
// import { MaterialIcons } from '@expo/vector-icons'; 
// // import { storage } from '../storage'; 
// // import * as ImagePicker from 'expo-image-picker';
// // import { databases } from '../database';
// // import { UserContext } from './component/userDetails';
// // import { Query, InputFile } from 'appwrite';
// // import Welcome from './component/welcome';
// import Welcome from '../../components/welcome';

// // import * as DocumentPicker from 'expo-document-picker'
// import * as FileSystem from 'expo-file-system';
// // import { account } from '../appwriteConfig';
// // import Loader from './component/loader';
// import { databases } from '../../database';
// import { storage } from '../../storage';
// import Loader from '../../components/welcome';

// const Settings = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [address, setAddress] = useState('');
//   const [imageUri, setImageUri] = useState(null);
// //   const { user } = useContext(UserContext);
//   const [userImage, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const response = await databases.listDocuments(
// //           '6740474900354338e949', // Database ID
// //           '67432b050028ac3659c1', // Collection ID
// //           [Query.equal('email', user.email)]
// //         );
// //         if (response.documents.length) {
// //           const latestDocument = response.documents[response.documents.length - 1];
// //           const image = storage.getFilePreview(
// //             '6742ff13002520aba608', // Bucket ID
// //             latestDocument.image_id
// //           );
// //           setImage(image); // Set image URL
// //         } else {
// //           setImage(null);
// //         }
// //       } catch (err) {
// //         console.error('Error fetching data:', err);
// //       }
// //     };

// //     fetchData();
// //   }, [user.email]);

//   const handleFileUpload = async (fileUri) => {
//     try {    
// const file= fileUri.assets[0];
// const formData = new FormData();
// formData.append('fileId', 'unique()');
//     formData.append('file', {
//       uri: file.uri, 
//       name: file.name, 
//       type: file.mimeType,
//     });
// await fetch(
//   `https://cloud.appwrite.io/v1/storage/buckets/6742ff13002520aba608/files`,
//   {
//     method: "POST",
//     headers: {
//       'Content-Type': 'multipart/form-data',
//       'X-Appwrite-Project': '673ebe09000b35b67d8b', // Replace with your Appwrite project ID
//     },
//     body: formData,
//   }
// )
//   .then((res) => {
//     return res.json();
//     if (!res.ok) {
//       throw new Error(`HTTP error! Status: ${res.status}`);
//     }
   
//   })
//   .then(async (data) => {
//     await databases.createDocument(
//       '6740474900354338e949', // Replace with your database ID
//       '67432b050028ac3659c1', // Replace with your collection ID
//       'unique()', // Generate a unique document ID
//       {
//         name: user.name,
//         email: user.email,
//         image_id: data.$id, // Store the file ID
//       }
//     );

//   }
  
// )
//   .catch((err) => console.error('Error:', err));
     
//       // console.log(result, 'File Upload Result');
  
//       // Create a document with the file ID
     
  
//       alert('Upload successful');
//     } catch (error) {
//       console.error('File upload failed:', error);
//       alert('File upload failed. Please try again.');
//     }
//   };
  

//   const handleImageChange = async () => {
//   //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//   // console.log(status)
//   //   if (status !== 'granted') {
//   //     alert('Sorry, we need media library permissions to make this work!');
//   //     return;
//   //   }
//   // console.log('picking')
//     const result = await DocumentPicker.getDocumentAsync({
//       type:["image/png", "image/jpg", "image/jpeg"]
//     })
//   // console.log(result, 'aressul')
//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       setModalVisible(false);
//       setLoading(true)
//       await handleFileUpload(result);
//       setLoading(true)
      
//     }
//   };
  

//   return (
//     <View style={styles.container}>
//       <View style={styles.Welcome}>
//         <Welcome name={""} />
//       </View>

//       <View style={styles.imageContainer}>
//         {userImage ? (
//           <Image source={{ uri: userImage }} style={styles.image} />
//         ) : (
//           <EvilIcons name="user" size={100} color="gray" />
//         )}
//         <TouchableOpacity
//           style={styles.editIcon}
//           onPress={() => setModalVisible(true)}
//         >
//           <MaterialIcons name="edit" size={24} color="white" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.formContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Name"
//           value={''}
//           editable={false}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           value={''}
//           editable={false}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Phone"
//           value={''}
//           editable={false}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Address"
//           value={address}
//           onChangeText={setAddress}
//         />
//       </View>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.switchText} >
//           <Text>Edit details</Text>
//         </TouchableOpacity>
//       </View>

//       <Modal animationType="slide" visible={modalVisible} transparent>
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalTitle}>Upload Profile Image</Text>
//           <TouchableOpacity style={styles.uploadButton} onPress={handleImageChange}>
//             <Text style={styles.uploadButtonText}>Choose Image</Text>
//           </TouchableOpacity>
//           <Button title="Close" onPress={() => setModalVisible(false)} />
//         </View>
//       </Modal>
//       <Loader visible={loading} />
//     </View>
//   );
// };

// export default Settings;

// // const styles = StyleSheet.create({
// //   // ... (styles remain unchanged)
// // });


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   imageContainer: {
//     position: 'relative',
//     width: 120,
//     height: 120,
//   },
//   image: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     borderWidth: 2,
//     borderColor: 'gray',
//   },
//   editIcon: {
//     position: 'absolute',
//     bottom: 10,
//     right: 10,
//     backgroundColor: 'gray',
//     borderRadius: 12,
//     padding: 4,
//   },
//   formContainer: {
//     width: '100%',
//     marginTop: 20,
//   },
//   input: {
//     width: '100%',
//     padding: 10,
//     marginVertical: 10,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     backgroundColor: '#fff',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalTitle: {
//     fontSize: 20,
//     marginBottom: 20,
//     color: '#fff',
//   },
//   uploadButton: {
//     backgroundColor: '#007bff',
//     padding: 10,
//     marginVertical: 10,
//     borderRadius: 5,
//   },
//   uploadButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   Welcome: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#f9f9f9',
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "100%",
//   },
//   contactText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   buttonContainer: {
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   switchText: {
//     backgroundColor: '#ff8800',
//     padding: 15,
//     borderRadius: 5,
//     width: '50%',
//     alignItems: 'center',
//   }
// });
