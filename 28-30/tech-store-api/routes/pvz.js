const express = require("express");

const router = express.Router();

const db = require("../db/db");

// GET /pvz - получение списка всех пунктов выдачи
router.get("/", (req, res, next) => {
    try {
        // Запрос всех ПВЗ с сортировкой по городу и адресу
        const pvz = db.prepare("SELECT * FROM pvz ORDER BY city, address").all();
        res.json(pvz); // Отправка результата в формате JSON
    } catch (err) {
        next(err); // Передача ошибки в middleware обработки ошибок
    }
});

module.exports = router;