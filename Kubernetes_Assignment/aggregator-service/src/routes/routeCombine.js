const { Router } = require('express')
const {
    getCurrentOrder
} = require('../controllers/controllerCombine')

const router = Router()

// GET current user
router.get('/:id', getCurrentOrder)


module.exports = router