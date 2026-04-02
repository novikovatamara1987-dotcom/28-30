module.exports = {
    PORT: process.env.PORT || 3000,

    ITEMS_PER_PAGE: 10,     // Количество элементов на странице
    MAX_ITEMS_PER_PAGE: 20,     // Максимальное количество элементов

    // Статусы заказов
    ORDER_STATUSES: [
        "new",
        "processing",
        "ready_for_pickup",
        "completed",
        "canceled",
    ],

    API_PREFEX: "/api",
    ADMIN_CREDENTIALS: {
        username: "admin",
        password: "secret",
    },

    DEFAULT_PHONE_REGEX: /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/,
    MIN_NAME_LENGTH: 3,
    MAX_NAME_LENGTH: 50,

    STATS_CACHE_TTL: 60 * 1000,
};