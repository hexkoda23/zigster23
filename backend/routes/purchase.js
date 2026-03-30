const express = require('express');
const router = express.Router();
const { db } = require('../lib/firebase');

const purchasesRef = db.collection('purchases');

// Create Purchase
router.post('/', async (req, res) => {
    try {
        const docRef = await purchasesRef.add({
            ...req.body,
            createdAt: new Date().toISOString()
        });
        const doc = await docRef.get();
        res.status(201).json({ id: doc.id, ...doc.data() });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Purchases
router.get('/', async (req, res) => {
    try {
        const snapshot = await purchasesRef.get();
        const purchases = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(purchases);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Purchases by Registry ID
router.get('/registry/:registryId', async (req, res) => {
    try {
        const snapshot = await purchasesRef.where('registryId', '==', req.params.registryId).get();
        const purchases = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(purchases);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Confirm Purchase Status
router.patch('/:id/confirm', async (req, res) => {
    try {
        const purchaseDoc = purchasesRef.doc(req.params.id);
        await purchaseDoc.update({ status: 'Confirmed' });
        const updated = await purchaseDoc.get();
        res.json({ id: updated.id, ...updated.data() });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
