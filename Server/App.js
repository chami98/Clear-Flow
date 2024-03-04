const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey');
const cors = require('cors');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/data', async (req, res) => {
    try {
        const snapshot = await admin.firestore().collection('Clearences').get();
        const data = [];
        snapshot.forEach(doc => {
            const documentData = doc.data();
            documentData.id = doc.id;
            data.push(documentData);
        });
        res.json(data);
    } catch (error) {
        console.error('Error getting documents', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/data', async (req, res) => {
    try {
        const newData = req.body;
        await admin.firestore().collection('Clearences').add(newData);
        res.status(201).send('Data added successfully');
    } catch (error) {
        console.error('Error adding document', error);
        res.status(500).send('Internal Server Error');
    }
});

app.put('/data/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        const docRef = admin.firestore().collection('Clearences').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).send('Document not found');
        }

        await docRef.update(updatedData);

        res.status(200).send('Document updated successfully');
    } catch (error) {
        console.error('Error updating document', error);
        res.status(500).send('Internal Server Error');
    }
});


app.delete('/data/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const docRef = admin.firestore().collection('Clearences').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).send('Document not found');
        }

        await docRef.delete();
        res.status(200).send('Document deleted successfully');
    } catch (error) {
        console.error('Error deleting document', error);
        res.status(500).send('Internal Server Error');
    }
});

// Specify the port to listen on
const PORT = process.env.PORT || 5000; // Use the environment port or 3000 if not specified

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
