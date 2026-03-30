const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');

// Create Purchase
router.post('/', async (req, res) => {
    try {
        const newPurchase = new Purchase(req.body);
        const savedPurchase = await newPurchase.save();
        res.status(201).json(savedPurchase);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Purchases
router.get('/', async (req, res) => {
    try {
        const purchases = await Purchase.find();
        res.json(purchases);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Purchases by Registry ID
router.get('/registry/:registryId', async (req, res) => {
    try {
        const purchases = await Purchase.find({ registryId: req.params.registryId });
        res.json(purchases);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Confirm Purchase Status
router.patch('/:id/confirm', async (req, res) => {
    try {
        const updatedPurchase = await Purchase.findByIdAndUpdate(
            req.params.id,
            { status: 'Confirmed' },
            { new: true }
        );
        res.json(updatedPurchase);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
