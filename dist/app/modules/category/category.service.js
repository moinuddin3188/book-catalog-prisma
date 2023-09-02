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
exports.CategoryService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newCategory = yield prisma_1.default.category.create({
        data,
    });
    if (!newCategory) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create Category!');
    }
    return newCategory;
});
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const allCategories = yield prisma_1.default.category.findMany();
    return allCategories;
});
const getSingleCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const singleCategory = yield prisma_1.default.category.findUnique({
        where: {
            id,
        },
        include: {
            books: true,
        },
    });
    return singleCategory;
});
const updateCategory = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedCategory = yield prisma_1.default.category.update({
        where: {
            id,
        },
        data: payload,
    });
    return updatedCategory;
});
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedCategory = yield prisma_1.default.category.delete({
        where: {
            id,
        },
    });
    return deletedCategory;
});
exports.CategoryService = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory,
};
