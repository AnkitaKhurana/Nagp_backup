var jwt = require('jsonwebtoken');

function getTokenFromHeaders(req) {
    if (req.headers && req.headers.authorization) {
        if (req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1]
        }
    }
    return null
}

function authorizeRequest(req, res, next) {
    try {
        let token = getTokenFromHeaders(req);
        let decodedToken = jwt.verify(token, process.env.AUTH_KEY_SECRET);
        if (decodedToken.username == 'admin' && decodedToken.email == 'admin@admin.com') {
            req.payload = decodedToken;
            next();
        }
        else {
            return res.status(401).json('Unauthorized');
        }
    } catch (err) {
        return res.status(401).json('Unauthorized');
    }
}

module.exports = { authorizeRequest }