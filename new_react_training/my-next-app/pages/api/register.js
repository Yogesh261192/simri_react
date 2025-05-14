import { Client, Users, ID } from 'node-appwrite';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, name, phone } = req.body;
  console.log(email, password, name, phone)
  try {
    const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const users = new Users(client);

    const user = await users.create(ID.unique(), email, phone, password, name);
    return res.status(201).json({ user });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
