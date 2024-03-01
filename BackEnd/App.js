// Import necessary modules
const express = require('express');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK with your service account key
const serviceAccount = require('./serviceAccountKey.json'); // Path to your service account key file
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Create an Express application
const app = express();
const port = 5000; // Choose your desired port number

// Define a route to fetch data from Firestore
app.get('/data', async (req, res) => {
    try {
        const snapshot = await admin.firestore().collection('Clearences').get(); // Replace 'your_collection' with your Firestore collection name
        const data = [];
        snapshot.forEach(doc => {
            data.push(doc.data());
        });
        res.json(data);
    } catch (error) {
        console.error('Error getting documents', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
