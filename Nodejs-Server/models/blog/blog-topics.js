var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BlogTopicSchema = new mongoose.Schema({
    topic_name: String,
    topic_image: String,
    topic_tag: String,
    topic_content: String,
    updated_at: { type: Date, default: Date.now }

});

module.exports = mongoose.model('BlogTopics', BlogTopicSchema);