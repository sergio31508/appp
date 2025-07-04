const express = require('express');
const router = express.Router();
const WearableData = require('../models/WearableData');

router.post('/', async (req, res) => {
    try {
        const { frecuencia, timestamp } = req.body;
        if (!frecuencia || !timestamp) {
            return res.status(400).json({ error: 'Faltan datos' });
        }

        const nuevoDato = new WearableData({ frecuencia, timestamp });
        await nuevoDato.save();

        res.status(201).json({ mensaje: 'Dato guardado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error guardando dato en BD' });
    }
});

module.exports = router;
