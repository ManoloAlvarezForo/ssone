'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = Schema({
    name: String,
    ci: String,
    phone: { type: String, require: false },
    address: { type: String, require: false },
    email: { type: String, require: false } 
})

module.exports = mongoose.model('Client', ClientSchema)