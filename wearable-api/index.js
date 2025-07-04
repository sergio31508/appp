const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const mongoURI = 'mongodb+srv://sergiohernandez22s:12345@cluster0.xadfllh.mongodb.net/wearableDB?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch((err) => console.error('Error conectando a MongoDB Atlas:', err));

const sensorSchema = new mongoose.Schema({
  heartRate: Number,
  timestamp: { type: Date, default: Date.now }
});

const SensorData = mongoose.model('SensorData', sensorSchema);

app.post('/sensor', async (req, res) => {
  try {
    const data = new SensorData(req.body);
    await data.save();
    res.status(201).send({ message: 'Datos guardados' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('API corriendo');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
