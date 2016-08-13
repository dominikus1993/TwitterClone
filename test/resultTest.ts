import {expect} from "chai";
import {wrapResult, Result} from "../src/global/result";

describe("wrap result", () => {

    describe("wrap result with number", () => {
        const result = wrapResult(2);

        it("result should equal", () => {
            expect(result.value).to.deep.equal({ isSuccess: true, isError: false, value: 2, message: null });
        });
    });

    describe("wrap result with object", () => {
        const result = wrapResult({a: "a"});

        it("result should equal", () => {
            expect(result.value).to.deep.equal({ isSuccess: true, isError: false, value: {a: "a"}, message: null });
        });
    });

    describe("wrap result with null", () => {
        const result = wrapResult(null);

        it("result should equal", () => {
            expect(result.value).to.deep.equal({ isSuccess: false, isError: true, value: null, message: null });
        });
    });

    describe("wrap result with undefined", () => {
        const result = wrapResult(undefined);

        it("result should equal", () => {
            expect(result.value).to.deep.equal({ isSuccess: false, isError: true, value: undefined, message: null });
        });
    });
});