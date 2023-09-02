"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const userSignUp = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield prisma_1.default.user.create({
        data: userData,
        select: {
            id: true,
            name: true,
            email: true,
            contactNo: true,
            address: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            profileImg: true,
        },
    });
    if (!newUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to sign up!');
    }
    return newUser;
});
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email: userEmail, password } = payload;
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            email: userEmail,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User doesn't exist");
    }
    if (isUserExist.password && password !== isUserExist.password) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password or email is not correct');
    }
    // create token
    const { id, role } = isUserExist;
    const token = jwtHelpers_1.jwtHelpers.createToken({
        userId: id,
        role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        token
    };
});
exports.AuthService = {
    userSignUp,
    userLogin,
};
