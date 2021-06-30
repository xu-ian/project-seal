var jwt = require("jsonwebtoken");
const keys = require("../config/keys");// Load input validation

module.exports = (req, res, next) => {

    try { 
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, keys.secret);
        req.userData = {
            email: decodedToken.email, 
            id: decodedToken.id,
            role: decodedToken.role,
            datejoined: decodedToken.datejoined,

        }; next();


    }catch (error){
        res.status(401).json({message: "unauthorized"});
    }
}