var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var HomePageSchema = new mongoose.Schema({
    page_video: String,
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HomePage', HomePageSchema);