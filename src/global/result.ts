import {isNullOrUndefined} from "./utils";

export interface Result<TResult, TError> {
    isSuccess: boolean;
    isError: boolean;
    value: TResult;
    messages: TError[];
}

export function wrapResult<TResult, TError>(value: TResult, ...messages: TError[]): Result<TResult, TError> {
    return { isSuccess: !isNullOrUndefined(value), isError: isNullOrUndefined(value), value: value, messages: messages };
}