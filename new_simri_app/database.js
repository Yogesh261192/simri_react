import { Client, Databases } from "appwrite";

const client = new Client();
// console.log('details 2')

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('673ebe09000b35b67d8b');// Your project ID

export const databases = new Databases(client);

// const result = await databases.listDocuments(
//     '<DATABASE_ID>', // databaseId
//     '<COLLECTION_ID>', // collectionId
//     [] // queries (optional)
// );

// console.log(result);
