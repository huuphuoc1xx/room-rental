var express = require('express');
const { normalAuth } = require('../middlewares/middlewares');
var router = express.Router();

/* GET home page. */
router.use('/auth', require("./auth"));
router.use(normalAuth);
router.use("/user", require("./user"));
router.use("/room", require("./room"));
router.use("/room-booking", require("./roomBooking"));

module.exports = router;