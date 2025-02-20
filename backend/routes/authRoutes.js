const express = require("express");
const { createAccount, login, logout } = require("../controllers/authController");
const router = express.Router();

router.post("/api/create-account", createAccount);
router.post("/api/login", login);
router.post("/api/logout", logout);

module.exports = router;