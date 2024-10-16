const jwt = require('jsonwebtoken');
const SECRETKEY = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
    
        if (token) {
            let user = jwt.verify(token, SECRETKEY);
            req.userId = user.id;
        }
        else {
            return res.status(401).json({ message: "Unauthorised user" });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthoried user" });
    }
}

module.exports = auth;