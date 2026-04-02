const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const specs = require("./swagger");
const config = require("./config");
const customerRouter = require("./routes/customers");
const orderRouter = require("./routes/orders");
const pvzRouter = require("./routes/pvz");
const statsRouter = require("./routes/stats");

const app = express();

// Подключаем CORS для кросс-доменных запросов
app.use(cors());
// Парсинг JSON тела запроса
app.use(express.json());

// Логирование всех запросов
app.use((req, res, next) => {
    const time = new Date().toISOString();
    console.log(`[${time}] ${req.method} ${req.url} - IP: ${req.ip}`);
    next();
});

// Swagger документация API
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
        explorer: true,
        swaggerOptions: {
            persistAuthorization: true,
        },
        customSiteTitle: "Маразин техники API Docs",
    })
);

// Корневой маршрут с приветствием
app.get("/", (req, res) => {
    res.json({
        message: "Добро пожаловать в API магазина техники!",
        docs: "/api-docs — интерактивная документация",
    });
});

// Маршруты API
app.use("/api/customers", customerRouter);
app.use("/api/orders", orderRouter);
app.use("/api/pvz", pvzRouter);
app.use("/api/stats", statsRouter);

// Глобальный обработчик ошибок
app.use((err, req, res, next) => {
    console.error("Ошибка:", err.message);
    console.error(err.stack);
    const status = typeof err.status === 'number' ? err.status : 500;
    res.status(status).json({
        error: err.message || "Внутренняя ошибка сервера",
    });
});

const { validationResult } = require("express-validator");

// Мидлвар для проверки результатов валидации
app.use((req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Ошибка валидации",
            errors: errors.array(),
        });
    }
    next();
});

const PORT = config.PORT || 3000;
// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    console.log(`Документация доступна: http://localhost:${PORT}/api-docs`);
});

const customerController = require("./controllers/customerController");
// Логирование статуса загрузки контроллера
console.log(
    "CustomerController загружен:",
    !!customerController.getAllCustomers,
);

module.exports = app;