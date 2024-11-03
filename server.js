const express = require('express');
const app = express();
const port = 3000;

// Array to store sensor readings
let sensorData = [];

// Middleware to parse POST data
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route to receive sensor data
app.post('/data', (req, res) => {
    const value = req.body.value;
    const timestamp = new Date().toISOString();
    
    sensorData.push({ timestamp, value });
    
    // Keep only last 100 readings
    if (sensorData.length > 100) {
        sensorData.shift();
    }
    
    res.send('Data received!');
});

// Route to get sensor data
app.get('/data', (req, res) => {
    res.json(sensorData);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});