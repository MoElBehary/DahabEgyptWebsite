var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductPageSchema = new mongoose.Schema({
    page_slides: [
        {slide_image:String, slide_text:String}
    ],
    page_hot_sec: [
        { box_image: String, box_name: String, box_desc: String, box_prodID: String}
    ],
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProductPage', ProductPageSchema);