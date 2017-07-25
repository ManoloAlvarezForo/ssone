'use strict'

const Sealer = require('../models/sealer');
const Item = require('../models/item');
const Client = require('../models/client')

function getSealer(req, res) {
    let id = req.params.id;

    Sealer.findById(id, (err, sealer) => {

        if (err) {
            res.status(500).send(`Error to execute the request: ${err}`)
        }

        if (!sealer) {
            return res.status(404).send({ message: `Sealer not found!` })
        }

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send({ sealer })
    })
}

function getSealers(req, res) {
    Sealer.find({}, (err, sealers) => {

        if (err) {
            res.status(500).send(`Error to execute the request: ${err}`)
        }

        if (!sealers) {
            return res.status(404).send({ message: `Sealers not found!` })
        }


        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send({ sealers })
    })
}

function saveSealer(req, res) {
    console.log('POST /api/sealer')
    console.log(req.body)

    let sealer = new Sealer();
    var client = {};
    sealer.client = req.body.clientSealer.clientID;

    if (!req.body.clientSealer.clientID) {
        let client = new Client();
        client.name = req.body.clientSealer.name;
        client.ci = req.body.clientSealer.ci;

        // client.save((err, productStored) => {

        //     if (err) {
        //         res.status(500).send({ message: `Error to save the Client: ${err}` })
        //     }

        //     res.setHeader('Access-Control-Allow-Origin', '*');
        //     res.status(200).send({ message: productStored })
        // })

    }

    Client.findById(req.body.client, (err, client) => {

        if (err) {
            res.status(500).send(`Error to execute the request: ${err}`)
        }

        if (!client) {
            return res.status(404).send({ message: `Client not found!` })
        }

        res.setHeader('Access-Control-Allow-Origin', '*');
        client = client;

        sealer.totalPay = req.body.totalPay;
        sealer.items = req.body.items;
        sealer.quantity = req.body.quantity;

        sealer.save((err, sealerStored) => {

            if (err) {
                res.status(500).send({ message: `Error to save the Sealer: ${err}` })
            }

            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).send({ message: sealerStored })
        })
    })


}

function addNewClient() {

}

function updateSealer(req, res) {
    let id = req.params.id;

    Sealer.findByIdAndUpdate(id, req.body, (err, productUpdated) => {

        if (err) {
            req.status(500).send({ message: `Error to update the Sealer: ${err}` })
        }

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send({ sealer: productUpdated })
    })
}

function deleteSealer() {
    let id = req.params.id;

    Sealer.findById(id, (err, sealer) => {

        if (err) {
            req.status(500).send({ message: `Error to delete the Sealer: ${err}` })
        }

        Sealer.remove(err => {
            if (err) {
                req.status(500).send({ message: `Error to delete the Sealer` })
            }

            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).send({ message: 'The sealer was removed.' })
        })
    })
}

module.exports = {
    getSealer,
    getSealers,
    saveSealer,
    updateSealer,
    deleteSealer
}