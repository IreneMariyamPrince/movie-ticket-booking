const mongoose = require('mongoose');

const crewSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Image: {
        type: String,
        default: null,
    },
    Role: {
        type: String,
        enum: ['director', 'producer', 'writer'],
        required: true,
    },
}, { timestamps: true });

const Crew = mongoose.model('Crew', crewSchema);
module.exports = Crew;
