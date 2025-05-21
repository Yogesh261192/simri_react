// src/appwriteConfig.js
import { Client, Databases, ID, Query, Storage, Account } from 'appwrite';


const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('673ebe09000b35b67d8b'); // Your project ID// Replace with your Appwrite project ID

const databases = new Databases(client);
const storage = new Storage(client);
const account = new Account(client);
// console.log(databases)
console.log(account, 'ajajajajjj')

export { client, databases, ID, Query, storage, account };
