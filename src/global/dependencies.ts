import {TokenModel, UserModel} from "../user/model";
import {TokenRepository, UserRepository} from "../user/repository";
import {UserService} from "../user/service";

export function getDefaultUserRepository() {
    return new UserRepository(UserModel);
}

export function getDefaultTokenRepository() {
    return new TokenRepository(TokenModel);
}

export function getDefaultUserService() {
    return new UserService(getDefaultUserRepository(), getDefaultTokenRepository());
}
