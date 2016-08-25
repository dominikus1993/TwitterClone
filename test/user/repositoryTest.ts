import {expect} from "chai";
import {isNullOrUndefined} from "../../src/global/utils";
import {databaseConfig} from '../../src/global/config';
import {ITokenRepository, IUserRepository, TokenRepository, UserRepository} from "../../src/user/repository";
import {User, UserModel, Token, TokenModel} from "../../src/user/model";
import * as mongoose from "mongoose";
import { Document, Schema, model } from "mongoose";

describe("user repository test", () => {
    let userRepository: IUserRepository;
    let tokenRepository: ITokenRepository
    before((done) => {
        mongoose.Promise = databaseConfig.promise;
        mongoose.connect("mongodb://localhost/twitter-test").then(() => {
            mongoose.connection.db.dropDatabase();
            userRepository = new UserRepository(UserModel);
            tokenRepository = new TokenRepository(TokenModel);
            done();
        });
    });

    describe("register user", () => {
        it("should save user without error", (done) => {
            userRepository.register({ email: "admin@admin.admin", username: "admin", password: "admin" }).then((fulfilled) => {
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
            userRepository.login({ username: "admin", password: "admin" }).then((fulfilled) => {
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
            userRepository.login({ username: "admina", password: "admina" }).then((fulfilled) => {
                expect(fulfilled).to.be.null;
                done();
            }, (rejected?: any) => {
                done(rejected);
            });
        });
    });

    describe("save user", () => {
        const testUser = { email: "admin2@admin.admin", username: "admin2", password: "admin" };
        describe("save token", () => {
            it("should save token by user", (done) => {
                 userRepository.register(testUser).then((fulfilled: any) => {
                    return Promise.resolve(tokenRepository.save(fulfilled));
                }).then((fulfilled: Token) => {
                    expect(fulfilled).to.be.not.null;
                    expect(fulfilled.token).to.be.not.null;
                    expect(fulfilled.token).to.be.string;
                    done();
                });
            });
        });
    });


    after(() => {
        mongoose.connection.close();
    });
});