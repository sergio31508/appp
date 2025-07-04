const mongoose = require('mongoose');

const WearableDataSchema = new mongoose.Schema({
    frecuencia: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    }
}, { collection: 'wearableData' }); // Forzar nombre de la colección

module.exports = mongoose.model('WearableData', WearableDataSchema);
