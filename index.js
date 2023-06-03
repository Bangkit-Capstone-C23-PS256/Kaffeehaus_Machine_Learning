const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Initialize Firebase admin app
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Initialize Firestore instance
const db = admin.firestore(); 
const usersCollection = db.collection('users');

// Add a new user to Firestore
app.post('/users', async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new document with auto-generated ID and email attribute
    const newUser = {
      email: email,
      name: name,
      password: hashedPassword
    };

    const docRef = await usersCollection.add(newUser);
    const newUserId = docRef.id;

    res.status(201).json({ id: newUserId, ...newUser });
  } catch (error) {
    res.status(500).send('Error adding user: ' + error);
  }
});

// Get all users from Firestore
app.get('/users', async (req, res) => {
  try {
    const snapshot = await usersCollection.get();
    const users = [];
    
    snapshot.forEach(doc => {
      const user = doc.data();
      user.id = doc.id;
      users.push(user);
    });
    
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Error getting users: ' + error);
  }
});

// Get a user by document ID from Firestore
app.get('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const doc = await usersCollection.doc(userId).get();

    if (doc.exists) {
      const user = doc.data();
      user.id = doc.id;
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send('Error getting user: ' + error);
  }
});

// Update a user by document ID in Firestore
app.put('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = req.body;

    await usersCollection.doc(userId).update(updatedUser);
    res.status(200).send('User updated successfully');
  } catch (error) {
    res.status(500).send('Error updating user: ' + error);
  }
});

// Delete a user by document ID from Firestore
app.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    await usersCollection.doc(userId).delete();
    res.status(200).send('User deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting user: ' + error);
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Mencari pengguna berdasarkan email
    const userDoc = await db.collection('users').where('email', '==', email).limit(1).get();
    
    // Jika pengguna tidak ditemukan
    if (userDoc.empty) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = userDoc.docs[0].data();

    // Membandingkan password yang diberikan dengan password terenkripsi
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    // Jika password cocok
    if (isPasswordMatched) {
      // Lakukan proses login
      // ...
      
      return res.status(200).json({ message: 'Login successful' });
    } else {
      // Jika password tidak cocok
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});