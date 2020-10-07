const { Router } = require('express')
const {
    getCurrentUser
} = require('../controllers/controllerUser')

const router = Router()

// GET current user
router.get('/:id', getCurrentUser)


module.exports = router