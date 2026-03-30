const express = require('express');
const router = express.Router();
const Registry = require('../models/Registry');

// Create Registry
router.post('/', async (req, res) => {
    try {
        const newRegistry = new Registry(req.body);
        const savedRegistry = await newRegistry.save();
        res.status(201).json(savedRegistry);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Registries
router.get('/', async (req, res) => {
    try {
        const registries = await Registry.find();
        res.json(registries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Registry by ID
router.get('/:id', async (req, res) => {
    try {
        const registry = await Registry.findById(req.params.id);
        if (!registry) return res.status(404).json({ error: 'Registry not found' });
        res.json(registry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Registry
router.put('/:id', async (req, res) => {
    try {
        const updatedRegistry = await Registry.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedRegistry);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
