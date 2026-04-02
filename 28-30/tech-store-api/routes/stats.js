const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const auth = require("../middleware/auth"); // Мидлвара для проверки аутентификации

// GET / - получение статистики заказов
router.get("/", auth, orderController.getStats);

module.exports = router;