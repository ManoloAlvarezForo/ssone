'use strict'

const Client = require('../models/client');

function getClient(req, res) {
    let id = req.params.id;

    Client.findById(id, (err, client) => {

        if (err) {
            res.status(500).send(`Error to execute the request: ${err}`)
        }

        if (!client) {
            return res.status(404).send({ message: `Client not found!` })
        }

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send({ client })
    })
}

function getClients(req, res) {
    Client.find({}, (err, clients) => {

        if (err) {
            res.status(500).send(`Error to execute the request: ${err}`)
        }

        if (!clients) {
            return res.status(404).send({ message: `Clients not found!` })
        }
        

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send({ clients })
    })
}

function saveClient(req, res) {
    console.log('POST /api/client')
    console.log(req.body)

    let client = new Client();
    client.name = req.body.name;
    client.ci = req.body.ci;

    client.save((err, productStored) => {

        if (err) {
            res.status(500).send({ message: `Error to save the Client: ${err}` })
        }

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send({ message: productStored })
    })
}

function updateClient(req, res) {
    let id = req.params.id;

    Client.findByIdAndUpdate(id, req.body, (err, productUpdated) => {

        if (err) {
            req.status(500).send({ message: `Error to update the Client: ${err}` })
        }

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send({ client: productUpdated })
    })
}

function deleteClient() {
    let id = req.params.id;

    Client.findById(id, (err, client) => {

        if (err) {
            req.status(500).send({ message: `Error to delete the Client: ${err}` })
        } 

        Client.remove(err => {
            if (err) {
                req.status(500).send({ message: `Error to delete the Client` })
            }

            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).send({ message: 'The client was removed.' })
        })
    })
}

module.exports = {
    getClient,
    getClients,
    saveClient,
    updateClient,
    deleteClient
}