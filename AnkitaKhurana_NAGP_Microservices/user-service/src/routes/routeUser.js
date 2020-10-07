const { Router } = require('express')
const {
    getCurrentUser,
    createUser,
    updateUser,
    userLogin
} = require('../controllers/controllerUser')

const router = Router()

// GET current user
router.get('/', getCurrentUser)
// POST Create and save new user, return created user on success, call error handler on error
router.post('/', createUser)
// PUT update user information
router.put('/', updateUser)
// POST Login user
router.post('/login', userLogin)

module.exports = router