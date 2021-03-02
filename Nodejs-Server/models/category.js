var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CategorySchema = new mongoose.Schema({
    categ_name: String,
    categ_image: String,
    sub_categories: Array,
    hot: Number,
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Category', CategorySchema);