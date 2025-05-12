const sdk = require('node-appwrite');

exports.registerUser = async (req, res) => {
  const { email, password, name, phone } = req.body;
    console.log(req.body)
  const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY); // Must be server key

  const users = new sdk.Users(client);
//   console.log(users)
  
try {
    const result = await users.listIdentities(
        [], // queries (optional)
         // search (optional)
    );
    console.log(result)
} catch (error) {
    res.status(400).json({ error: error.message });
}

  try {
    const user = await users.create(sdk.ID.unique(), email, phone, password, name);
    // await users.createVerification(user.$id, {
    //   url: 'http://simdi.in', // must be whitelisted in Appwrite
    // });
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
