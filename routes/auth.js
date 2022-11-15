const { login, register } = require("../controllers/auth");
const moment = require("moment");

const router = require("express").Router();

router.post("/login", async (req, res) => {
    const { 
        user_name: userName,
        password,
    } = req.body;
    const token = await login(userName, password);

    res.json({ code: 0, token })
});

router.post("/register", async (req, res) => {
    const { 
        user_name: userName,
        password,
        name,
        dob,
    } = req.body;

    await register(userName, password, name || "", moment(dob).format("YYYY-MM-DD"));
    
    res.json({ code: 0, message: "success" });
});

module.exports = router;