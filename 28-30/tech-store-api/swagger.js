const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

// Конфигурация Swagger/OpenAPI документации
const option = {
    definition: {
        openapi: "3.0.0",                    // Версия спецификации OpenAPI
        info: {
            title: "Магазин техники API",
            version: "1.0.0",
            description:
            "REST API для управления клиентами, заказами и пунктами выдачи (ПВЗ)",
        },
        server: [
            {
                url: "http://localhost:3000", // Базовый URL API
                description: "Локальный сервер (разработка)",
            },
        ],
        components: {
            securitySchemes: {
                basicAuth: {
                    type: "http",
                    scheme: "basic",
                    description:
                    "Basic Authontication для доступа к административным эндпоинтам. Используйте учетные данные из конфигурации.",
                },
            },
        },
    },
    apis: ["./docs/*.yaml"],                 // Путь к файлам с описанием эндпоинтов
};

// Генерация спецификации на основе конфигурации и YAML файлов
const specs = swaggerJsdoc(option);

// Экспорт сгенерированной спецификации
module.exports = specs;