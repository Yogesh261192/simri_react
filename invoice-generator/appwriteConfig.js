import { Client, Account, Databases } from 'appwrite';

// Initialize the Appwrite client
const client = new Client();
// console.log('details', client)

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('673ebe09000b35b67d8b'); // Your project ID

// Services
export const account = new Account(client);
// console.log(account)
export const databases = new Databases(client);
// console.log(account.listIdentities(), 'send')

// console.log(account, 'account detail')
