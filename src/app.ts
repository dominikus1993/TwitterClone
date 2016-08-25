import {databaseConfig, errorConfig} from "./global/config";
import {wrapResult} from "./global/result";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import {Request, Response} from "express";
import * as express from "express";
import * as mongoose from "mongoose";
import * as logger from "morgan";

mongoose.Promise = databaseConfig.promise;
mongoose.connect(databaseConfig.url);
Object.defineProperty(Error.prototype, "toJSON", errorConfig);

const app = express();

// noinspection TypeScriptValidateTypes
app.use(logger("dev"));
// noinspection TypeScriptValidateTypes
app.use(bodyParser.json());
// noinspection TypeScriptValidateTypes
app.use(bodyParser.urlencoded({extended: true}));
// noinspection TypeScriptValidateTypes
app.use(cookieParser());
// noinspection TypeScriptValidateTypes
app.use((req: Request, res: Response, next: Function) => {
    let err: any = new Error("Not Found");
    err.status = 404;
    next(err);
});
// noinspection TypeScriptValidateTypes
if (app.get("env") === "development") {
    // noinspection TypeScriptValidateTypes
    app.use((err: any, req: Request, res: Response, next: Function) => {
        res.status(err.status || 500);
        res.json(wrapResult(null, err));
    });
}
// noinspection TypeScriptValidateTypes
app.use((err: any, req: Request, res: Response, next: Function) => {
    res.status(err.status || 500);
    res.json(wrapResult(null, err));
});

export default app;
