export const databaseConfig = {
    url: process.env.MONGO_URL || "mongodb://localhost/twitter"
}

export const appConfig = {
    secret: "123456789"
}

export const errorConfig = {
    configurable: true,
    value: function () {
        let alt = {};
        let storeKey = (key) => {
            alt[key] = this[key];
        };
        Object.getOwnPropertyNames(this).forEach(storeKey, this);
        return alt;
    },
};