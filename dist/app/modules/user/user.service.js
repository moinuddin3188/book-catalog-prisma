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
exports.UserService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield prisma_1.default.user.findMany({
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
    return allUsers;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const singleUser = yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
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
    return singleUser;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: payload,
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
    return updatedUser;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUser = yield prisma_1.default.user.delete({
        where: {
            id,
        },
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
    return deletedUser;
});
exports.UserService = {
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
};
