// Кастомный класс для обработки ошибок приложения
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);  // Вызываем конструктор родительского класса Error
        this.statusCode = statusCode;  // HTTP статус-код ошибки (404, 500 и т.д.)
        // Определяем тип ошибки: 'fail' для 4xx (ошибки клиента), 'error' для 5xx (ошибки сервера)
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperation = true;  // Флаг, указывающий, что это ожидаемая операционная ошибка
        
        // Захватываем стек вызовов, исключая конструктор AppError из него
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;