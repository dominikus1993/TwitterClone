import * as Promise from "bluebird";

export const databaseConfig = {
    promise: Promise,
    url: process.env.MONGO_URL || "mongodb://localhost/twitter",
};

export const appConfig = {
    secret: "123456789",
};

export const errorConfig = {
    configurable: true,
    value() {
        const alt: any = {};
        const storeKey = (key: any) => {
            alt[key] = this[key];
        };
        Object.getOwnPropertyNames(this).forEach(storeKey, this);
        return alt;
    },
};
