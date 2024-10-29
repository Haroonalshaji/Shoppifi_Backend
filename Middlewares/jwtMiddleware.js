const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        console.log(token);
        const jwtResponse = jwt.verify(token, process.env.JWTKEY)
        req.payload = jwtResponse.userId
        next()
    } catch (error) {
        res.status(402).json("Authorization Failed ")
    }
}

module.exports = jwtMiddleware