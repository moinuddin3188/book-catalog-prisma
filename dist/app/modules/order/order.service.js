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
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createOrder = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const newOrder = yield prisma_1.default.order.create({
        data: {
            userId,
            orderedBooks: data.orderedBooks,
        },
    });
    return newOrder;
});
const getAllOrder = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    let allOrder = [];
    if (role === 'customer') {
        allOrder = yield prisma_1.default.order.findMany({
            where: {
                userId: userId,
            },
        });
    }
    if (role === 'admin') {
        allOrder = yield prisma_1.default.order.findMany();
    }
    return allOrder;
});
const getSingleOrder = (id, userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    const singleOrder = yield prisma_1.default.order.findUnique({
        where: {
            id,
        },
    });
    if (role === 'customer' && (singleOrder === null || singleOrder === void 0 ? void 0 : singleOrder.userId) !== userId) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
    }
    return singleOrder;
});
exports.OrderService = {
    createOrder,
    getAllOrder,
    getSingleOrder,
};
