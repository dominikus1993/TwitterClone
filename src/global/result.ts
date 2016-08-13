export interface Result<TResult, TError> {
    isSuccess: boolean;
    isError: boolean;
    value: TResult;
    message: TError;
}