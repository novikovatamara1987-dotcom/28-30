const orderService = require("../services/orderService");
const AppError = require("../utils/AppError");

// Получение списка заказов с пагинацией и фильтрацией
exports.getAllOrders = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = Math.min(parseInt(req.query.limit) || 10, 20); // Ограничиваем максимум 20 записей
        const status = req.query.status || null;
        const pvzId = req.query.pvzId ? parseInt(req.query.pvzId) : null;

        const orders = await orderService.getAll({ page, limit, status, pvzId });

        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
};

// Получение заказа по ID
exports.getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await orderService.getById(id);

        if (!order) throw new AppError("Заказ не найден", 404);

        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
};

// Создание нового заказа
exports.createOrder = async (req, res, next) => {
    try {
        const order = await orderService.create(req.body);
        res.status(201).json(order);
    } catch (err) {
        next(err);
    }
};

// Обновление существующего заказа
exports.updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await orderService.update(id, req.body);
        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

// Удаление заказа
exports.deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        await orderService.delete(id);
        res.status(204).send(); // Нет содержимого
    } catch (err) {
        next(err);
    }
};

// Получение статистики по заказам
exports.getStats = async (req, res, next) => {
    try {
        const stats = await orderService.getStats();
        res.status(200).json(stats);
    } catch (err) {
        next(err);
    }
};

module.exports = exports;