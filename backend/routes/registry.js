const express = require('express');
const router = express.Router();
const { db } = require('../lib/firebase');

const registriesRef = db.collection('registries');

// Create Registry
router.post('/', async (req, res) => {
    try {
        const docRef = await registriesRef.add({
            ...req.body,
            createdAt: new Date().toISOString()
        });
        const doc = await docRef.get();
        res.status(201).json({ id: doc.id, ...doc.data() });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Registries
router.get('/', async (req, res) => {
    try {
        const snapshot = await registriesRef.get();
        const registries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(registries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Registry by ID
router.get('/:id', async (req, res) => {
    try {
        const doc = await registriesRef.doc(req.params.id).get();
        if (!doc.exists) return res.status(404).json({ error: 'Registry not found' });
        res.json({ id: doc.id, ...doc.data() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Registry
router.put('/:id', async (req, res) => {
    try {
        const regDoc = registriesRef.doc(req.params.id);
        await regDoc.update(req.body);
        const updated = await regDoc.get();
        res.json({ id: updated.id, ...updated.data() });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
