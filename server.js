const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Store sensor readings in memory
let sensorData = [];

// Middleware to parse POST data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve static files from 'public' directory
app.use(express.static('public'));

// API endpoint to receive sensor data
app.post('/data', (req, res) => {
    const value = req.body.value;
    const timestamp = Date.now();
    
    sensorData.push({ timestamp, value });
    
    // Keep only last 288 readings (24 hours worth of data at 5-minute intervals)
    if (sensorData.length > 10000) {
        sensorData.shift();
    }
    
    res.send('Data received!');
});

// API endpoint to get sensor data
app.get('/data', (req, res) => {
    res.json(sensorData);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
});
