const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();


const { SignUp, Login, Protected } = require("../controllers/auth.controllers");

const { authenticateToken } = require("../middleware/auth.middleware");

router.post("/signup", upload.none(), SignUp);
router.post("/signin", Login);
router.post("/protected", authenticateToken, Protected);

module.exports = router;
