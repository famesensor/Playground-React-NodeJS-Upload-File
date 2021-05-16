const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL_FIRESTORE,
    storageBucket: process.env.STORAGE_BUCKGET
});

module.exports = {
    admin
};
