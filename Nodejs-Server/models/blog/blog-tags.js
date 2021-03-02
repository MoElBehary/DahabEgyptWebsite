var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BlogTagsSchema = new mongoose.Schema({
   tag_name : String,
   tag_icon : String,
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BlogTags', BlogTagsSchema);