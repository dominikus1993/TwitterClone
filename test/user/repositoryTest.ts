import {databaseConfig} from "../../src/global/config";
import {ITokenRepository, IUserRepository, TokenRepository, UserRepository} from "../../src/user/repository";
import {Token, TokenModel, UserModel} from "../../src/user/model";
import {expect} from "chai";
import * as mongoose from "mongoose";

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
            userRepository.register({
                email: "admin@admin.admin",
                password: "admin",
                username: "admin"
            }).then((fulfilled) => {
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
            userRepository.login({password: "admin", username: "admin"}).then((fulfilled) => {
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
            userRepository.login({password: "admina", username: "admina"}).then((fulfilled) => {
                expect(fulfilled).to.be.null;
                done();
            }, (rejected?: any) => {
                done(rejected);
            });
        });
    });

    describe("save user", () => {
        const testUser = {email: "admin2@admin.admin", password: "admin", username: "admin2"};
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

    describe("save user", () => {
        const testUser = {email: "admin22@admin.admin", password: "admin", username: "admin22"};
        describe("save token", () => {
            describe("should save token by user", () => {
                it("should get saved token", (done) => {
                    userRepository.register(testUser).then((fulfilled: any) => {
                        return Promise.resolve(tokenRepository.save(fulfilled));
                    }).then((fulfilled: Token) => {
                        return Promise.resolve(tokenRepository.findBy({_id: fulfilled._id}));
                    }).then((fulfilled: Token) => {
                        expect(fulfilled).to.be.not.null;
                        expect(fulfilled.token).to.be.not.null;
                        expect(fulfilled.token).to.be.string;
                        done();
                    });
                });
            });
        });
    });

    after(() => {
        mongoose.connection.close();
    });
});
