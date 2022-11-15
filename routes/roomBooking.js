const { getRoomBookingInfo, getRoomBookings, createRoomBooking } = require("../controllers/roomBooking");
const { adminAuth } = require("../middlewares/middlewares");
const moment = require("moment");

const router = require("express").Router();

router.get("/:id", async (req, res) => {
    const {
        from_time: fromTime,
        to_time: toTime,
    } = req.body;

    const room = await getRoomBookingInfo(req.params.id, moment(fromTime).startOf("day"), moment(toTime).startOf("day"));
    res.json({ code: 0, room });
});

router.post("/", async (req, res) => {
    const {
        from_date: fromDate,
        to_date: toDate,
        room_id: roomId,
    } = req.body;
    await createRoomBooking(req.user.userName, roomId, fromDate, toDate);
    res.json({ code: 0, message: "Success" });
})
router.use(adminAuth);
router.get("/", async (req, res) => {
    const {
        page,
        page_size: pageSize,
    } = req.query;
    const rooms = await getRoomBookings(+page, +pageSize);
    res.json({ code: 0, rooms })
});

module.exports = router;