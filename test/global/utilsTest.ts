import {curr, encrypt, generateToken, isNullOrUndefined} from "../../src/global/utils";
import test from "ava";

test("isnullorundefined test when  value is not null", (t) => {
    const result = isNullOrUndefined(2);
    t.falsy(result);
});

test("isnullorundefined test when  value is undefined", (t) => {
    const result = isNullOrUndefined(undefined);
    t.truthy(result);
});

test("isnullorundefined test when  value is null", (t) => {
    const result = isNullOrUndefined(null);
    t.truthy(result);
});

test("currying test", (t) => {
    const adder = (a: number, b: number) => a + b;
    const currAdder = curr(adder);
    const result = currAdder(1)(2);
    t.is(result, 3);
});

test("encrypt test", (t) => {
    const result = encrypt("123456789", "admin");
    t.is(result, "21232f297a57a5a743894a0e4a801fc3");
});

test("generate Token", (t) => {
    const result = generateToken();
    t.not(result, null);
});

