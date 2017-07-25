'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ItemSchema = require('./item')
const ClientSchema = require('./client')

const SealerSchema = Schema({
    clientSealer: {
        clientID: {
            type: Schema.ObjectId,
            ref: 'Client',
        },
        client: ClientSchema.schema
    },
    items: [ItemSchema.schema],
    date: {
        type: Date,
        default: Date.now()
    },
    totalPay: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Sealer', SealerSchema)