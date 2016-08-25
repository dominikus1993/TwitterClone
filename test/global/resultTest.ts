import {wrapResult} from "../../src/global/result";
import {expect} from "chai";

describe("wrap result", () => {

    describe("wrap result with number", () => {
        const result = wrapResult(2);

        it("result should equal", () => {
            expect(result).to.deep.equal({ isError: false, isSuccess: true, value: 2, messages: [] });
        });
    });

    describe("wrap result with object", () => {
        const result = wrapResult({ a: "a" });

        it("result should equal", () => {
            expect(result).to.deep.equal({ isError: false, isSuccess: true, value: { a: "a" }, messages: [] });
        });
    });

    describe("wrap result with null", () => {
        const result = wrapResult(null);

        it("result should equal", () => {
            expect(result).to.deep.equal({ isError: true, isSuccess: false, messages: [], value: null });
        });
    });

    describe("wrap result with undefined", () => {
        const result = wrapResult(undefined);

        it("result should equal", () => {
            expect(result).to.deep.equal({ isError: true, isSuccess: false, messages: [], value: undefined });
        });
    });

    describe("wrap result with null and message", () => {
        const result = wrapResult(null, "error value is null");

        it("result should equal", () => {
            expect(result).to.deep.equal({ isError: true, isSuccess: false, messages: ["error value is null"], value: null });
        });
    });

    describe("wrap result with undefined and message", () => {
        const result = wrapResult(undefined, "error value is undefined");

        it("result should equal", () => {
            expect(result).to.deep.equal({ isError: true, isSuccess: false, messages: ["error value is undefined"], value: undefined });
        });
    });
});

