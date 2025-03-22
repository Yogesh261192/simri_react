import { Client, Storage } from "appwrite";

const client = new Client();
// console.log('details')

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('673ebe09000b35b67d8b'); // Your project ID

export const storage = new Storage(client);