var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BlogCommentsSchema = new mongoose.Schema({
    topic_id: String,
    userName: String,
    mail: String,
    comment_content: String,
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BlogComments', BlogCommentsSchema);