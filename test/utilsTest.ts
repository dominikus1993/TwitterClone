import {expect} from "chai";
import {isNullOrUndefined} from "../src/global/utils";
describe("utils test", () => {
    describe("isnullorundefined test", () => {

        describe("value is not null", () => {
            const result = isNullOrUndefined(2);

            it("result should be false", () => {
                expect(result).to.be.false;
            });
        });

        describe("value is null", () => {
            const result = isNullOrUndefined(null);

            it("result should be true", () => {
                expect(result).to.be.true;
            });
        });

        describe("value is undefined", () => {
            const result = isNullOrUndefined(undefined);

            it("result should be true", () => {
                expect(result).to.be.true;
            });
        });
    });
});