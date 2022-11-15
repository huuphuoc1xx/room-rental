const jwt = require("jsonwebtoken");

const generateJwt = (user) => {
    return jwt.sign({ userName: user.user_name, isAdmin: user.is_admin }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

const verifyJwt = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    generateJwt,
    verifyJwt,
}