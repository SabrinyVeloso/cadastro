import clientPromise from '../../lib/mongodb';

// Keep an in-memory fallback so the app still works for demos when MONGODB_URI
// isn't set (useful for development / apresentação escolar).
if (!global._inMemoryUsers) global._inMemoryUsers = [];

export default async function handler(req, res) {
  let collection = null;
  // try to get a real MongoDB collection; fall back to in-memory array on error
  try {
    const client = await clientPromise;
    const db = client.db('cadastro');
    collection = db.collection('users');
  } catch (err) {
    // clientPromise will reject when MONGODB_URI is not set — keep using fallback
    console.warn('MongoDB not available, using in-memory fallback for users:', err.message ?? err);
  }

  if (req.method === 'GET') {
    if (collection) {
      const users = await collection.find({}).sort({ createdAt: -1 }).toArray();
      res.status(200).json(users);
    } else {
      res.status(200).json(global._inMemoryUsers.slice().reverse());
    }
    return;
  }

  if (req.method === 'POST') {
    try {
      const body = req.body;
      const { name, email } = typeof body === 'string' ? JSON.parse(body) : body;
      if (!name || !email) {
        return res.status(400).json({ error: 'name and email are required' });
      }

      if (collection) {
        const result = await collection.insertOne({ name, email, createdAt: new Date() });
        res.status(201).json({ id: result.insertedId });
      } else {
        // simple in-memory object with a pseudo-id
        const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
        const entry = { _id: id, name, email, createdAt: new Date().toISOString() };
        global._inMemoryUsers.push(entry);
        res.status(201).json({ id });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    return;
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
