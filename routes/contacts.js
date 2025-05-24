const express = require('express');
const router = express.Router()

const userController = require('../controllers/users')

router.get('/', userController.getAll)

router.get('/:id', userController.getSingle)

router.post('/:id', userController.createContact)

router.put('/:id', userController.updateContact)

router.delete('/:id', userController.deleteContact)

module.exports = router
