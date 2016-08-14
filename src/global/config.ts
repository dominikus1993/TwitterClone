export const databaseConfig = {
    url: "mongodb://localhost/twitter"
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