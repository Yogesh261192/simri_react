const { MongoClient, ServerApiVersion } = require("mongodb");


// Replace with your connection string
const uri = 'mongodb+srv://yogesh:Mbdio2611@cluster0.iwztn.mongodb.net/sample_mflix?retryWrites=true&w=majority';

// Create a new MongoClient
const client = new MongoClient(uri, {
    tls: true,
    tlsInsecure: false,
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectToDB() {
    
  try {
    // Connect to the client
    await client.connect();
    console.log('Connected to MongoDB Atlas!');
    
return client
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } 
}
// connectToDB();
module.exports = connectToDB;
// connectToDB();
