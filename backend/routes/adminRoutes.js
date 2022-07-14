const express = require("express");
const router = express.Router();
const { getAllUsers, loginUser, getMe } = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");
router.get("/",protect, getAllUsers);

module.exports = router;
