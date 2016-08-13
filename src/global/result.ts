export interface Result<TResult, TError> {
    isSuccess: boolean;
    isError: boolean;
    value: TResult;
    message: TError;
}

export function wrapResult<T>(value: T): Result<T, {}> {
    return null;//{isSuccess: (value != undefined), isError: (value == undefined)};
}