const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    taste:{
        enum:['sweet','spicy','sour'],
    },
    is_drink:{
        type: Boolean,
        default: false
    },
    ingredients:{
        type: [String],
        required: true
    },
    num_sales: {
        type: Number,
        default: 0
    }
})

const menu = mongoose.model("menu", menuSchema);
module.exports = menu;