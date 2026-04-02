const config = require("../config");
const AppError = require("../utils/AppError");

// Middleware для аутентификации с использованием Basic Auth
const authMiddleware = (req, res, next) => {
    // Получаем заголовок Authorization
    const authHeader = req.headers.authorization;
    // Проверяем наличие заголовка и что он начинается с "Basic"
    if (!authHeader || !authHeader.startsWith("Basic")) {
        return next(new AppError("Требуется авторизация (Basic Auth)", 401));
    }

    // Извлекаем base64-закодированные учетные данные
    const base64Credentials = authHeader.split(" ")[1];
    // Декодируем из base64 в обычную строку
    const credentials = Buffer.from(base64Credentials, "base64").toString(
        "ascii",
    );
    // Разделяем строку "username:password" на логин и пароль
    const [username, password] = credentials.split(":");

    // Проверяем учетные данные с данными из конфига
    if (
        username === config.ADMIN_CREDENTIALS.username &&
        password === config.ADMIN_CREDENTIALS.password
    ) {
        next(); // Успешная аутентификация — пропускаем запрос дальше
    } else {
        return next(new AppError("Неверные учетные данные", 401)); // Ошибка аутентификации
    }
};

module.exports = authMiddleware;