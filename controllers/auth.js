const { getUserByUserName, createUser } = require("./user");
const bcrypt = require("bcrypt");
const { generateJwt } = require("./jwt");

const login = async (userName, password) => {
    const user = await getUserByUserName(userName);
    if (user && bcrypt.compareSync(password, user.hash_pw)) {
        const token = generateJwt(user);
        return token;
    };
    throw {
        code: -1,
        message: "Invalid Password"
    }
}

const register = async (userName, password, name, dob) => {
    const user = await getUserByUserName(userName);
    if (user)
        throw {
            code: -1,
            message: "userName existed"
        }
    const hashPw = bcrypt.hashSync(password, 10);

    await createUser(userName, hashPw, name, dob);
}

module.exports = {
    login,
    register,
}