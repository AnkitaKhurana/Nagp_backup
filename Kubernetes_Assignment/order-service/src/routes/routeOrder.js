const { Router } = require('express')
const {
    getCurrentUserOrder
} = require('../controllers/controllerOrder')

const router = Router()

// GET current user
router.get('/:id', getCurrentUserOrder)


module.exports = router