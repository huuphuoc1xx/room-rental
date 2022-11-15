const { register } = require("../controllers/auth");
const { getUsers, getUserByUserName, updateUser, deleteUser, changeRole } = require("../controllers/user");
const { adminAuth } = require("../middlewares/middlewares");
const moment = require("moment")

const router = require("express").Router();

router.get("/info", async (req, res) => {
    const user = await getUserByUserName(req.user.userName);
    delete user.hash_pw;
    res.json({ code: 0, user });
});

router.get("/", adminAuth, async (req, res) => {
    const {
        page,
        page_size: pageSize,
    } = req.query;
    const users = await getUsers(+page, +pageSize);
    users.forEach(user => { delete user.hash_pw });
    res.json({ code: 0, users })
});

router.post("/", adminAuth, async (req, res) => {
    const {
        user_name: userName,
        password,
        name,
        dob,
    } = req.body;

    await register(userName, password, name || "", moment(dob).format("YYYY-MM-DD"));

    res.json({ code: 0, message: "success" });
});

router.put("/", async (req, res) => {
    const {
        name,
        dob,
    } = req.body;

    await updateUser(req.user.userName, name, dob);

    res.json({ code: 0, message: "success" });
});

router.put("/role/:userName", adminAuth, async (req, res) => {
    await changeRole(req.params.userName);
    res.json({ code: 0, message: "success" });
});
router.put("/:userName", adminAuth, async (req, res) => {
    const {
        name,
        dob,
    } = req.body;

    await updateUser(req.params.userName, name, dob);

    res.json({ code: 0, message: "success" });
});

router.delete("/:userName", adminAuth, async (req, res) => {
    await deleteUser(req.params.userName);

    res.json({ code: 0, message: "success" });
});

module.exports = router;