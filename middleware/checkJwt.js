const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const checkJwt = (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        token = token.split(" ")[1];
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            req.decoded = decoded;
            next();
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: "Unauthorized User"
        });
    }
}

module.exports = checkJwt;