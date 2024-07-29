/* eslint-env es6 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose'); // Import Mongoose
const routes = require('./routers/router');
const path = require('path');

// Load environment variables
require('dotenv').config();

const app = express();
app.use(bodyParser.json()); 

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files from the 'img' folder
app.use('/img', express.static(path.join(__dirname, 'img')));

// Routes
app.use('/api', routes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server
const PORT = process.env.PORT || 3000;

// Connect to the database and start the server
mongoose.connect(process.env.MONGO_URI, {})
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch(err => {
    console.error('Unable to connect to MongoDB:', err);
});
