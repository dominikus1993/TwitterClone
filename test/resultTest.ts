import {expect} from "chai";
import {wrapResult, Result} from "../src/global/result";

describe("wrap result", () => {

    describe("wrap result with number", () => {
        const result = wrapResult(2);

        it("result should equal", () => {
            expect(result).to.deep.equal({ isSuccess: true, isError: false, value: 2, messages: [] });
        });
    });

    describe("wrap result with object", () => {
        const result = wrapResult({ a: "a" });

        it("result should equal", () => {
            expect(result).to.deep.equal({ isSuccess: true, isError: false, value: { a: "a" }, messages: [] });
        });
    });

    describe("wrap result with null", () => {
        const result = wrapResult(null);

        it("result should equal", () => {
            expect(result).to.deep.equal({ isSuccess: false, isError: true, value: null, messages: [] });
        });
    });

    describe("wrap result with undefined", () => {
        const result = wrapResult(undefined);

        it("result should equal", () => {
            expect(result).to.deep.equal({ isSuccess: false, isError: true, value: undefined, messages: [] });
        });
    });

    describe("wrap result with null and message", () => {
        const result = wrapResult(null, "error value is null");

        it("result should equal", () => {
            expect(result).to.deep.equal({ isSuccess: false, isError: true, value: null, messages: ["error value is null"] });
        });
    });

    describe("wrap result with undefined and message", () => {
        const result = wrapResult(undefined, "error value is undefined");

        it("result should equal", () => {
            expect(result).to.deep.equal({ isSuccess: false, isError: true, value: undefined, messages: ["error value is undefined"] });
        });
    });
});