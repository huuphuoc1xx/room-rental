const { Sequelize } = require("sequelize");
const userModels = require("../models/user");

const getUsers = (page, pageSize) => userModels.findAll({
    limit: pageSize,
    offset: (page - 1) * pageSize,
}).then(rs => rs.map(item => item.dataValues));
const getUserByUserName = (userName) => userModels.findOne({ where: { user_name: userName } }).then(rs => rs.dataValues);
const updateUser = (userName, name, dob) => 
    userModels.update({ name, dob }, { where: { user_name: userName } });
const updatePassword = (userName, hashPw) => {
    return userModels.update({ hash_pw: hashPw }, { where: { user_name: userName } });
}
const createUser = (userName, hashPw, name, dob) => 
    userModels.create({ user_name: userName, hash_pw: hashPw, name, dob });
const changeRole = (userName) => userModels.update({ is_admin: Sequelize.literal('NOT is_admin') }, { where: { user_name: userName }})
const deleteUser = (userName) => userModels.destroy({ where: { user_name: userName }});

module.exports = {
    getUsers,
    getUserByUserName,
    updateUser,
    updatePassword,
    createUser,
    changeRole,
    deleteUser,
}