var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ContactPageSchema = new mongoose.Schema({
    map_location: String,
    contact_info: {
        address: Array,
        Emails : Array,
        phone : Array,
        socialMedia : Array
    },
    Emails: {
        support : String,
        suggestions: String,
        complaints : String,
        inquiries : String
    },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ContactPage', ContactPageSchema);