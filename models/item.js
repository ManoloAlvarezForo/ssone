'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = Schema({
    name: String,
    price: {type: Number, default: 0},
    description: String,
    quantity: {type: Number, default: 0}
})

module.exports = mongoose.model('Item', ItemSchema)