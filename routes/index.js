'use strict'

const express = require('express')
const api = express.Router()
const itemController = require('../controllers/item')
const clientController = require('../controllers/client')
const userController = require('../controllers/user')
const sealerController = require('../controllers/sealer')

const auth = require('../middlewares/auth')

//Item routes part
api.get('/items', itemController.getItems)
api.get('/item/:id', itemController.getItem)
api.post('/item', itemController.saveItem)
api.put('/item/:id', itemController.updateItem)
api.delete('/item/:id', itemController.deleteItem)

//Client routes part
api.get('/clients', clientController.getClients)
api.get('/client/:id', clientController.getClient)
api.post('/client', clientController.saveClient)
api.put('/client/:id', clientController.updateClient)
api.delete('/client/:id', clientController.deleteClient)

//Sealer route part
api.get('/sealers', sealerController.getSealers)
api.get('/sealer/:id', sealerController.getSealer)
api.post('/sealer', sealerController.saveSealer)
api.put('/sealer/:id', sealerController.updateSealer)
api.delete('/sealer/:id', sealerController.deleteSealer)

api.get('/private', auth, (req, res) => {
    res.status(200).send({message: 'Access successfully'})
})

//Auth routes part
api.post('/signup', userController.signUp)
api.post('/signin', userController.signIn)

module.exports = api