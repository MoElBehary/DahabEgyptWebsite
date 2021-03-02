var mongoose = require('mongoose');
var Schema = mongoose.Schema
  // ObjectId = Schema.ObjectId;
var ProductSchema = new mongoose.Schema({
  prod_name: String,
  prod_desc: String,
  prod_colors:Array,
  prod_category: String, //! ObjectId
  prod_sub_category: String,
  price: {cost:Number, tag:String} ,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);