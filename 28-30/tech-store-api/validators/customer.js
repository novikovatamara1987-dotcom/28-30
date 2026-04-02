const { body, param } = require("express-validator");
const config = require("../config");

// Валидация для создания нового клиента
const createCustomer = [
    body("name")
        .trim() // удаляем пробелы в начале и конце
        .notEmpty() // поле обязательно для заполнения
        .withMessage("Имя обязательно")
        .isLength({ min: config.MIN_NAME_LENGTH, max: config.MAX_NAME_LENGTH }) // проверка длины
        .withMessage(
            `Имя должно быть от ${config.MIN_NAME_LENGTH} до ${config.MAX_NAME_LENGTH} символов`,
        ),

    body("email")
        .trim() // удаляем пробелы
        .notEmpty() // email обязателен
        .withMessage("Email обязателен")
        .isEmail() // проверка формата email
        .withMessage("Некорректный формат email")
        .normalizeEmail(), // приводит email к нормализованному виду (нижний регистр и т.д.)

    body("phone")
        .trim() // удаляем пробелы
        .notEmpty() // телефон обязателен
        .withMessage("Телефон обязателен")
        .matches(config.DEFAULT_PHONE_REGEX) // проверка по регулярному выражению из конфига
        .withMessage("Телефон должен быть в формате +7(XXX)XXX-XX-XX"),
];

// Валидация для обновления данных клиента
const updateCustomer = [
    body("name")
        .optional() // поле необязательно при обновлении
        .trim() // удаляем пробелы, если поле передано
        .isLength({ min: config.MIN_NAME_LENGTH, max: config.MAX_NAME_LENGTH }) // проверка длины
        .withMessage(
            `Имя должно быть от ${config.MIN_NAME_LENGTH} до ${config.MAX_NAME_LENGTH} символов`,
        ),

    body("email")
        .optional() // поле необязательно
        .trim() // удаляем пробелы
        .isEmail() // проверка формата email
        .withMessage("Некорректный формат email")
        .normalizeEmail(), // нормализация email

    body("phone")
        .optional() // поле необязательно
        .trim() // удаляем пробелы
        .matches(config.DEFAULT_PHONE_REGEX) // проверка формата телефона
        .withMessage("Телефон должен быть в формате +7(ХХХ)ХХ-ХХ-ХХ"),

    param("id") // валидация параметра маршрута
        .isInt({ min: 1 }) // ID должен быть целым числом >= 1
        .withMessage("ID должен быть положительным целым числом"),
];

module.exports = {
    createCustomer,
    updateCustomer,
};