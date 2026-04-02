const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController");
const auth = require("../middleware/auth");
const { createCustomer, updateCustomer } = require("../validators/customer");

// Публичные маршруты (без авторизации)
router.get("/", customerController.getAllCustomers); // Получить всех клиентов
router.get("/:id", customerController.getCustomerById); // Получить клиента по ID

// Защищенные маршруты (требуют авторизацию)
router.post("/", auth, ...createCustomer, customerController.createCustomer); // Создать клиента

router.put("/:id", auth, ...updateCustomer, customerController.updateCustomer); // Обновить клиента

router.delete(
    "/:id",
    auth,
    customerController.deleteCustomer, // Удалить клиента
);

module.exports = router;