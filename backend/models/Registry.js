const mongoose = require('mongoose');

const RegistrySchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Linking to frontend user
    occasion: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    ownerName: { type: String, required: true },
    email: { type: String, required: true },
    greeting: { type: String },
    photo: { type: String }, // Base64 or URL
    privacy: { type: String, default: 'link-only' },
    bankDetails: {
        bankName: String,
        accountNumber: String,
        accountName: String
    },
    address: { type: String },
    gifts: [{
        id: String,
        name: String,
        price: Number,
        image: String,
        store: String,
        category: String,
        isCashFund: Boolean,
        link: String,
        purchased: { type: Boolean, default: false }
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registry', RegistrySchema);
