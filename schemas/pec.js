var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    // page: Number,
    // per_page: Number,
    // photos: [{
    id: Number,
    width: Number,
    height: Number,
    url: String,
    photographer: String,
    photographer_url: String,
    photographer_id: Number,
    avg_color: String,
    src: {
        original: String,
        large2x: String,
        large: String,
        medium: String,
        small: String,
        portrait: String,
        landscape: String,
        tiny: String,
        original1: String,
        large2x1: String,
        large1: String,
        medium1: String,
        small1: String,
        portrait1: String,
        landscape1: String,
        tiny1: String
    },
    liked: String
        // }],
        // total_results: Number,
        // prev_page: String
});

module.exports = schema;