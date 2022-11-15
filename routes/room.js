const { getRooms, getRoomByRoomId, createRoom, updateRoom, deleteRoom } = require("../controllers/room");
const { adminAuth } = require("../middlewares/middlewares");

const router = require("express").Router();

router.get("/:id", async (req, res) => {
    const room = await getRoomByRoomId(req.params.id);
    res.json({ code: 0, room });
});
router.use(adminAuth);
router.get("/", async (req, res) => {
    const {
        page,
        page_size: pageSize,
    } = req.query;
    const rooms = await getRooms(+page, +pageSize);
    res.json({ code: 0, rooms })
});


router.post("/", async (req, res) => {
    const {
        detail,
    } = req.body;

    const room = (await createRoom(detail)).dataValues;

    res.json({ code: 0, room });
});

router.put("/:roomId", async (req, res) => {
    const {
        detail
    } = req.body;

    await updateRoom(req.params.roomId, detail);

    res.json({ code: 0, message: "success" });
});

router.delete("/:roomId", adminAuth, async (req, res) => {
    await deleteRoom(req.params.roomId);

    res.json({ code: 0, message: "success" });
});

module.exports = router;