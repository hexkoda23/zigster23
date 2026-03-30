const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
    registryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Registry', required: true },
    giftId: { type: String, required: true },
    giftName: { type: String, required: true },
    guestName: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    guestWhatsapp: { type: String, required: true },
    amount: { type: String, required: true },
    paymentId: { type: String, required: true },
    paymentRef: { type: String, required: true },
    receiptName: { type: String },
    receiptFile: { type: String }, // Base64
    status: { type: String, default: 'Pending' }, // Pending, Confirmed
    date: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Purchase', PurchaseSchema);
