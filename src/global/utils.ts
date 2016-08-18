import {appConfig} from "./config";
import * as crypto from "crypto-js";
export function isNullOrUndefined(value: any): boolean{
    return value === null || value === undefined;
}

export function encrypt(text: string): string {
    return crypto.MD5(text, appConfig.secret).toString();
}