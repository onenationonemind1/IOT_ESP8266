// server.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Store sensor readings in memory
let sensorData = [];

// Generate mock data starting from 24 hours ago
function initializeMockData() {
    const now = Date.now();
    const oneDayAgo = now - (24 * 60 * 60 * 1000);
    
    // Generate a reading every 5 minutes for the past 24 hours
    for (let time = oneDayAgo; time <= now; time += 5 * 60 * 1000) {
        sensorData.push({
            timestamp: time,
            value: Math.random() * 100 // Random value between 0 and 100
        });
    }
}

// Add new mock reading
function addMockReading() {
    sensorData.push({
        timestamp: Date.now(),
        value: Math.random() * 100
    });
}

// Initialize mock data
initializeMockData();

// Serve static files from 'public' directory
app.use(express.static('public'));

// API endpoint to get sensor data
app.get('/data', (req, res) => {
    res.json(sensorData);
});

// Start server
app.listen(port,"0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
});

// Add new reading every 5 seconds
setInterval(addMockReading, 5000);