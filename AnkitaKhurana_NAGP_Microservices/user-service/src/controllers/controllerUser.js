const { User, Password } = require('../database/dbConfig')
const logger = require('../../logger');

let getCurrentUser = (req, res, next) => {
    logger.info('Extracting current user');
    User.findByPk(req.body.username).then(user => {
        if (!user) {
            logger.info('No such user found');
            res.sendStatus(404);
        }
        logger.info('Returning user');
        return res.json({
            user: user.userToJSON()
        })
    }).catch(function (e) {
        logger.info(`authorization failed or user doesn't exists`);
        next(`authorization failed or user doesn't exists`)
    });
}

let createUser = async (req, res, next) => {
    logger.info('Creating user');
    //Invalid format of the request
    if (!req.body) {
        logger.info('Invalid body Format');
        return res.status(422).json({ errors: { format: 'Invalid Format' } })
    }
    if (!req.body.username) {
        logger.info('Username found blank');
        return res.status(422).json({ errors: { username: `can't be blank` } })
    }
    if (!req.body.email) {
        logger.info('Email found blank');
        return res.status(422).json({ errors: { email: `can't be blank` } })
    }
    if (!req.body.password) {
        logger.info('Password found blank');
        return res.status(422).json({ errors: { password: `can't be blank` } })
    }
    await User.create({
        username: req.body.username,
        email: req.body.email,
    })
        .then(function (createdUser) {
            createdUser.createHash(req.body.password)
                .then(generatedHash => {
                    Password.create({
                        hash: generatedHash,
                    })
                        .then(generatedPassword => {
                            createdUser.setPassword(generatedPassword)
                        })
                })
                .then(function () {
                    logger.info('User created');
                    res.status(201).json({
                        user: createdUser.userToJSON()
                    })
                })
        }).catch(function (e) {
            logger.info('Cannot create user');
            if (e.errors[0].type == 'unique violation') {
                logger.info('Cannot create user : unique violation');
                next(e.errors[0].path + ' is already taken')
            }
            if (e.errors[0].type == 'Validation error') {
                logger.info('Cannot create user : not valid');
                next(e.errors[0].path + ' is not valid')
            }
        })
}

let updateUser = (req, res, next) => {
    logger.info('Updating user');

    User.findByPk(req.body.username).then(user => {
        if (!user) {
            logger.info('No such user found');
            return res.sendStatus(404);
        }

        if (req.body.bio) {
            user.bio = req.body.bio
        }
        if (req.body.image) {
            user.image = req.body.image
        }
        if (req.body.email) {
            user.email = req.body.email
        }
        if (req.body.username) {
            user.username = req.body.username
        }
        if (req.body.password) {
            user.createHash(req.body.password)
                .then(generatedHash => {
                    user.getPassword()
                        .then(password => {
                            password.hash = generatedHash
                            password.save()
                        })
                })
        }

        user.save().then(() => {
            logger.info('User updated');
            return res.json({
                user: user.userToJSON()
            })
        })

    })
}

let userLogin = (req, res, next) => {
    if (!req.body) {
        logger.info('Invalid body format');
        return res.status(422).json({ errors: { format: "Invalid Format" } });
    }

    if (!req.body.email) {
        logger.info('Email found blank');
        return res.status(422).json({ errors: { email: "can't be blank" } });
    }

    if (!req.body.password) {
        logger.info('Password found blank');
        return res.status(422).json({ errors: { password: "can't be blank" } });
    }

    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            logger.info('No such user found to edit:invalid credentials');
            return res.status(404).json({ errors: { login: `invalid credentials` } });
        }
        user.validatePassword(req.body.password)
            .then(result => {
                if (result) {
                    logger.info('User logged in');
                    return res.json({
                        user: user.userToJSON()
                    })
                }
                else {
                    logger.info('invalid credentials');
                    return res.status(404).json({ errors: { login: `invalid credentials` } });
                }
            })
    }).catch((error) => {
        logger.info(error);
        return res.status(404).json({ errors: { login: `invalid credentials` } });
    })

}

module.exports = {
    getCurrentUser,
    createUser,
    updateUser,
    userLogin
}