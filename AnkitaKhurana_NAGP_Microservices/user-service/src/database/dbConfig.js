const sequelize = require('sequelize')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { user, password } = require('../models/modelUser')

const db = new sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/userV1.db'
})

// Define tables
const User = db.define('user', user);
const Password = db.define('password', password)

// Generate JWT based on id, date, username and email, and private key
User.prototype.generateJWT = function() {
    var today = new Date();    
    return jwt.sign({
        id: this.id,
        date: today,
        username: this.username,
        email: this.email
    }, process.env.AUTH_KEY_SECRET)
}

// Create user object to be sent
User.prototype.userToJSON = function () {  
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
        bio: this.bio,
        image: this.image
    }
}

// Create Profile Object to be sent
User.prototype.userToProfileJSON = async function (loggedUser = false) {
    var following = loggedUser? await loggedUser.isFollowing(this.username) : false
    return {
        username: this.username,
        bio: this.bio,
        image: this.image,
        following
    }
}

// Create hash
User.prototype.createHash = async function(password) {
    var hash = await bcrypt.hash(password, 10)
    return hash
}

// Validate Password
User.prototype.validatePassword = async function(textPassword) {
    var password = await this.getPassword()
    const result = await bcrypt.compare(textPassword, password.hash)
    return result
}


// Create Associations
User.hasOne(Password, {foreignKey: 'username', as: 'Password'});

module.exports = {
    db, 
    User,
    Password
}