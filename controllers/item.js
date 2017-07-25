'use strict'

const Item = require('../models/item');

function getItem(req, res) {
    let id = req.params.id;

    Item.findById(id, (err, item) => {

        if (err) {
            res.status(500).send(`Error to execute the request: ${err}`)
        }

        if (!item) {
            return res.status(404).send({ message: `Item not found!` })
        }

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send({ item })
    })
}

function getItems(req, res) {
    Item.find({}, (err, items) => {

        if (err) {
            res.status(500).send(`Error to execute the request: ${err}`)
        }

        if (!items) {
            return res.status(404).send({ message: `Items not found!` })
        }
        

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send({ items })
    })
}

function saveItem(req, res) {
    console.log('POST /api/item')
    console.log(req.body)

    let item = new Item();
    item.name = req.body.name;
    item.price = req.body.price;
    item.description = req.body.description;
    item.quantity = req.body.quantity;

    item.save((err, itemStored) => {

        if (err) {
            res.status(500).send({ message: `Error to save the Item: ${err}` })
        }

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send({ message: itemStored })
    })
}

function updateItem(req, res) {
    let id = req.params.id;

    Item.findByIdAndUpdate(id, req.body, (err, productUpdated) => {

        if (err) {
            req.status(500).send({ message: `Error to update the Item: ${err}` })
        }

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send({ item: productUpdated })
    })
}

function deleteItem() {
    let id = req.params.id;

    Item.findById(id, (err, item) => {

        if (err) {
            req.status(500).send({ message: `Error to delete the Item: ${err}` })
        } 

        Item.remove(err => {
            if (err) {
                req.status(500).send({ message: `Error to delete the Item` })
            }

            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).send({ message: 'The item was removed.' })
        })
    })
}

module.exports = {
    getItem,
    getItems,
    saveItem,
    updateItem,
    deleteItem
}