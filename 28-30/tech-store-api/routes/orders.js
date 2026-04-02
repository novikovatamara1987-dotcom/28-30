const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const auth = require("../middleware/auth");

const {
    createOrder,
    updateOrder,
    getAllOrdersQuery,
} = require("../validators/order");

// Публичные маршруты (без авторизации)
router.get("/", ...getAllOrdersQuery, orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);

// Защищенные маршруты (требуют авторизации)
router.post("/", auth, ...createOrder, orderController.createOrder); // Создание заказа

router.put("/:id", auth, ...updateOrder, orderController.updateOrder); // Обновление заказа

// Удаление заказа
router.delete(
    "/:id",
    auth,
    orderController.deleteOrder
);

module.exports = router;
