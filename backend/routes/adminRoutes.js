const express = require("express");
const router = express.Router();
const { getAllUsers, deleteUser, toggleUserStatus, getMe } = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");


router.get("/",protect, getAllUsers);

router.route("/:id").put(toggleUserStatus).delete(protect, deleteUser);

module.exports = router;
