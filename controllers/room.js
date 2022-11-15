const roomModels = require("../models/room");

const getRooms = (page, pageSize) => roomModels.findAll({
    limit: pageSize,
    offset: (page - 1) * pageSize,
    order: [["id", "DESC"]]
}).then(rs => rs.map(item => item.dataValues));
const getRoomByRoomId = (roomId) => roomModels.findOne({ where: { id: roomId } }).then(rs => rs.dataValues);
const updateRoom = (roomId, detail) => 
    roomModels.update({ detail }, { where: { id: roomId } });
const createRoom = (detail) => roomModels.create({ detail });
const deleteRoom = (roomId) =>
    roomModels.destroy({ where: {id: roomId }});

module.exports = {
    getRooms,
    getRoomByRoomId,
    updateRoom,
    createRoom,
    deleteRoom,
}