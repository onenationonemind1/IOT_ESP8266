const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// Array to store sensor readings
let sensorData = [];

// Middleware to parse POST data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve index.html at the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
});