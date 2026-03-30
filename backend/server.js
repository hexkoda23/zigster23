require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // for handling large images/receipts
app.use(morgan('dev'));

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/zigister23';
mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Zigister 23 API' });
});

// Import Routes
const registryRoutes = require('./routes/registry');
const purchaseRoutes = require('./routes/purchase');

app.use('/api/registries', registryRoutes);
app.use('/api/purchases', purchaseRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
