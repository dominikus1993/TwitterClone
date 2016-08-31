import {wrapResult} from "../../src/global/result";
import test from "ava";

test("wrap result with number", (t) => {
    const result = wrapResult(2);
    t.deepEqual(result, {isError: false, isSuccess: true, messages: [], value: 2});
});

test("wrap result with object", (t) => {
    const result = wrapResult({a: "a"});
    t.deepEqual(result, {isError: false, isSuccess: true, messages: [], value: {a: "a"}});
});

test("wrap result with null", (t) => {
    const result = wrapResult(null);
    t.deepEqual(result, {isError: true, isSuccess: false, messages: [], value: null});
});

test("wrap result with undefined", (t) => {
    const result = wrapResult(undefined);
    t.deepEqual(result, {isError: true, isSuccess: false, messages: [], value: undefined});
});

test("wrap result with null and message", (t) => {
    const result = wrapResult(null, "error value is null");
    t.deepEqual(result, {
        isError: true,
        isSuccess: false,
        messages: ["error value is null"],
        value: null,
    });
});

test("wrap result with undefined and message", (t) => {
    const result = wrapResult(undefined, "error value is null");
    t.deepEqual(result, {
        isError: true,
        isSuccess: false,
        messages: ["error value is undefined"],
        value: undefined,
    });
});
