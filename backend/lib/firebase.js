const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Path to the service account key file
const serviceAccountPath = path.join(__dirname, '../serviceAccountKey.json');

let serviceAccount;

if (fs.existsSync(serviceAccountPath)) {
    // If the file exists, use it (Local Development)
    serviceAccount = require(serviceAccountPath);
    console.log('📂 Using serviceAccountKey.json');
} else if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    // Use the full JSON string (Production/CI)
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
} else {
    // Use individual variables (Alternative Production)
    serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };
}

if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET
        });
        console.log('✅ Firebase Admin Initialized');
    } catch (error) {
        console.error('❌ Firebase Admin Initialization Error:', error.message);
    }
}

const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

module.exports = { admin, db, auth, storage };
