const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000; // Puerto fijo

// URI directa de MongoDB Atlas (⚠️ Esto es inseguro para producción)
const MONGO_URI = 'mongodb+srv://sergiohernandez22s:12345@cluster0.xadfllh.mongodb.net/wearableDB?retryWrites=true&w=majority&appName=Cluster0';

// Conectar a MongoDB Atlas
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch((error) => console.error('❌ Error conectando a MongoDB:', error));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Esquema de datos
const wearableDataSchema = new mongoose.Schema({
    frecuencia: String,
    timestamp: Number
});

const WearableData = mongoose.model('WearableData', wearableDataSchema);

// Ruta POST para guardar datos
app.post('/api/wearabledata', async (req, res) => {
    try {
        const { frecuencia, timestamp } = req.body;
        const nuevoDato = new WearableData({ frecuencia, timestamp });
        await nuevoDato.save();
        res.status(200).json({ mensaje: 'Dato guardado correctamente' });
    } catch (error) {
        console.error('❌ Error al guardar en MongoDB:', error);
        res.status(500).json({ error: 'Error al guardar en MongoDB' });
    }
});

// Ruta GET para probar
app.get('/', (req, res) => {
    res.send('API de Wearable funcionando sin .env');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
