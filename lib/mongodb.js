import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || null;

let client;
let clientPromise;

if (!uri) {
  // Do not throw here so the dev server can run and the user can set env vars later.
  // API routes that call the DB will fail with a clear error when attempting to use the client.
  console.warn('Warning: MONGODB_URI is not set. API routes will fail until you configure it.');
  clientPromise = Promise.reject(new Error('MONGODB_URI not set'));
} else {
  // Use a global variable in development to preserve the client across module reloads
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
}

export default clientPromise;
