const { body, param, query } = require("express-validator");
const config = require("../config");

// Валидация для создания заказа
const createOrder = [
    // Проверка поля customerId
    body("customerId")
        .isInt({ min: 1 })                       // должно быть целым числом >= 1
        .withMessage("customerId должен быть положительным целым числом"),

    // Проверка поля pvzId
    body("pvzId")
        .isInt({ min: 1 })                       // должно быть целым числом >= 1
        .withMessage("pvzId должен быть положительным целым числом"),

    // Проверка поля status (необязательное)
    body("status")
        .optional()                              // поле может отсутствовать
        .isIn(config.ORDER_STATUSES)             // значение должно быть из списка разрешённых статусов
        .withMessage(
            `Статус должен быть одним из: ${config.ORDER_STATUSES.join(", ")}`,
        ),

    // Проверка поля items
    body("items")
        .isArray({ min: 1 })                     // должно быть массивом, минимум 1 элемент
        .withMessage("items должен быть непустым массивом"),

    // Проверка каждого элемента в массиве items
    body("items.*.productName")
        .trim()                                  // удаляем пробелы в начале и конце
        .notEmpty()                              // не должно быть пустым
        .withMessage("Название товара обязательно"),
        
    // Валидация для полей внутри массива items (продолжение)
    body("items.*.quantity")
        .isInt({ min: 1 })                       // количество должно быть целым числом >= 1
        .withMessage("Количество должно быть ≥ 1"),

    body("items.*.price")
        .isFloat({ min: 0 }).withMessage("Цена должна быть ≥ 0"),           // цена должна быть числом с плавающей точкой >= 0
];

// Валидация для обновления заказа
const updateOrder = [
    // Поле status (необязательное)
    body("status")
        .optional()                          // поле может отсутствовать
        .isIn(config.ORDER_STATUSES)         // значение должно быть из списка разрешённых статусов
        .withMessage(
            `Статус должен быть одним из: ${config.ORDER_STATUSES.join(", ")}`,
        ),

    // Поле pvzId (необязательное)
    body("pvzId")
        .optional()                          // поле может отсутствовать
        .isInt({ min: 1 })                   // должно быть целым числом >= 1
        .withMessage("pvzId должен быть положительным целым числом"),

    // Параметр маршрута id (обязательный)
    param("id")
        .isInt({ min: 1 })                   // ID заказа должен быть целым числом >= 1
        .withMessage("ID заказа должен быть положительным целым числом"),
];

// Валидация query-параметров для получения списка заказов
const getAllOrdersQuery = [
    // Пагинация: номер страницы (опционально, по умолчанию 1)
    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("page должен быть ≥ 1"),

    // Пагинация: количество записей на странице (опционально, от 1 до 20)
    query("limit")
        .optional()
        .isInt({ min: 1, max: 20 })
        .withMessage("limit должен быть от 1 до 20"),

    // Фильтрация: статус заказа (опционально, из разрешённого списка)
    query("status").optional().isIn(config.ORDER_STATUSES),

    // Фильтрация: идентификатор ПВЗ (опционально, положительное целое)
    query("pvzId").optional().isInt({ min: 1 }),
];

// Экспорт всех валидаторов для использования в маршрутах
module.exports = {
    createOrder,        // валидация создания заказа
    updateOrder,        // валидация обновления заказа
    getAllOrdersQuery,  // валидация query-параметров для GET /orders
};