const { verifyJwt } = require("../controllers/jwt")

const adminAuth = (req, res, next) => {
    try {
        if (!req.user || !req.user.isAdmin)
            throw { code: -1, message: "Permission denied" };
        next();
    } catch (error) {
        if(!error.code) console.error(error);
        throw { code: -1, message: "Permission denied" };
    }
}

const normalAuth = (req, res, next) => {
    try {
        const payload = verifyJwt(req.headers.authorization);
        if (!payload)
            throw { code: -1, message: "Permission denied" };
        req.user = payload;
        next();
    } catch (error) {
        if(!error.code) console.error(error);
        throw { code: -1, message: "Permission denied" };
    }
}

module.exports = {
    adminAuth,
    normalAuth,
}