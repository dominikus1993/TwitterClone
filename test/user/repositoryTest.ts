import {expect} from "chai";
import {isNullOrUndefined} from "../../src/global/utils";
import {databaseConfig} from '../../src/global/config';
import {IUserRepository, UserRepository} from "../../src/user/repository";
import {UserModel} from "../../src/user/model";
import * as mongoose from "mongoose";
import { Document, Schema, model } from "mongoose";

describe("user repository test", () => {
    let repository: IUserRepository;
    before((done) => {
        mongoose.Promise = databaseConfig.promise;
        mongoose.connect("mongodb://localhost/twitter-test").then(() => {
            mongoose.connection.db.dropDatabase();
            repository = new UserRepository(UserModel);
            done();
        });
    });

    describe("register user", () => {
        it("should save user without error", (done) => {
            repository.register({ email: "admin@admin.admin", username: "admin", password: "admin" }).then((fulfilled) => {
                expect(fulfilled).to.be.not.null;
                expect(fulfilled.email).to.eq("admin@admin.admin");
                expect(fulfilled.username).to.eq("admin");
                done();
            }, (rejected?: any) => {
                done(rejected);
            });
        });
    });

    describe("login user with correct username and password", () => {
        it("should find one user", (done) => {
            repository.login({ username: "admin", password: "admin" }).then((fulfilled) => {
                expect(fulfilled).to.be.not.null;
                expect(fulfilled.email).to.eq("admin@admin.admin");
                expect(fulfilled.username).to.eq("admin");
                done();
            }, (rejected?: any) => {
                done(rejected);
            });
        });
    });

    describe("login user with incorrect username and password", () => {
        it("should find one user", (done) => {
            repository.login({ username: "admina", password: "admina" }).then((fulfilled) => {
                expect(fulfilled).to.be.null;
                done();
            }, (rejected?: any) => {
                done(rejected);
            });
        });
    });

    after(() => {
        mongoose.connection.close();
    });
});