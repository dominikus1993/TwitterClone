import {wrapResult} from "./global/result";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import {Request, Response} from "express";
import * as express from "express";
import * as logger from "morgan";

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use((req: Request, res: Response, next: Function) => {
    let err: any = new Error("Not Found");
    err.status = 404;
    next(err);
});

if (app.get("env") === "development") {
    // noinspection TypeScriptValidateTypes
    app.use(function(err: any, req: Request, res: Response, next: Function) {
        res.status(err.status || 500);
        res.json(wrapResult(null, err));
    });
}

app.use(function(err: any, req: Request, res: Response, next: Function) {
    res.status(err.status || 500);
    res.json(wrapResult(null, err));
});

export default app;