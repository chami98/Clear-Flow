const functions = require('firebase-functions');
const app = require('./App');

exports.ClearFlow = functions.https.onRequest(app);
