const roomBookingModels = require("../models/roomBookingHistory");
const { Op } = require("sequelize");

const getRoomBookings = (page, pageSize) =>
    roomBookingModels.findAll({
        limit: pageSize,
        offset: (page - 1) * pageSize,
        order: [["id", "DESC"]],
    }).then(rs => rs.map(item => item.dataValues));
const getRoomBookingInfo = (roomId, fromTime, toTime) =>
    roomBookingModels.findAll({
        where: {
            room_id: roomId,
            [Op.or]: [
                {
                    from_date: {
                        [Op.lte]: toTime,
                        [Op.gte]: fromTime,
                    },
                },
                {
                    to_date: {
                        [Op.lte]: toTime,
                        [Op.gte]: fromTime,
                    },
                },
                {
                    from_date: {
                        [Op.lte]: toTime,
                    },
                    to_date: {
                        [Op.gte]: fromTime,
                    }
                }
            ],
        },
    }).then(rs => rs.map(item => item.dataValues));

const createRoomBooking = async (userName, roomId, fromDate, toDate) => {
    const infos = await getRoomBookingInfo(roomId, fromDate, toDate);
    if(infos && infos.length)
        throw { code: -1, message: "Room is not available" };
    await roomBookingModels.create({ user_name: userName, room_id: roomId, from_date: fromDate, to_date: toDate });
}

module.exports = {
    getRoomBookings,
    getRoomBookingInfo,
    createRoomBooking,
};
