import {appConfig, databaseConfig, errorConfig} from "../../src/global/config";
import test from "ava";

test("app config", t => {
    t.not(appConfig.secret, null);
});

test("database config", t => {
   t.not(databaseConfig.promise, null);
   t.not(databaseConfig.url, null);
});

test("error config", t => {
    t.not(errorConfig.configurable, false);
    t.not(errorConfig.value, null);
    Object.defineProperty(Error.prototype, "toJSON", errorConfig);
    t.not((new Error("test") as any).toJSON(), null);
});
