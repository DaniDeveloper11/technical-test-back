const express = require("express");
const { getUsers } = require("../controllers/userController");
// const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/", getUsers);

module.exports = router;
