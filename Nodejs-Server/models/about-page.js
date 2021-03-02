var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AboutPageSchema = new mongoose.Schema({
    page_title: String,
    page_article: String,
    page_backgroundImage: String,
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AboutPage', AboutPageSchema);