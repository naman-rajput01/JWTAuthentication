const express = require("express")
const { getMe, loginUser, registerUser } = require("../controller/userController")
const router = express.Router()

const { protect } = require("../middleware/authMiddleware")



router.get("/me", protect, getMe);
router.post("/", registerUser);
router.post("/login", loginUser);

module.exports = router