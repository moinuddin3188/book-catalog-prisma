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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const book_constant_1 = require("./book.constant");
const createBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = yield prisma_1.default.book.create({
        data,
        include: {
            category: true,
        },
    });
    if (!newBook) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create book!');
    }
    return newBook;
});
const getAllBook = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const { search } = filters, filterData = __rest(filters, ["search"]);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: book_constant_1.bookSearchableFields.map(field => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }
    let categoryFilter = {};
    if (filterData.category) {
        categoryFilter = {
            categoryId: filterData.category,
        };
    }
    let priceFilter = {};
    if (filterData.maxPrice || filterData.minPrice) {
        priceFilter = {
            price: {
                gte: Number(filterData.minPrice),
                lte: Number(filterData.maxPrice),
            },
        };
    }
    if (Object.keys(filterData).length) {
        andConditions.push({
            AND: [categoryFilter, priceFilter],
        });
    }
    const whereConditions = andConditions.length
        ? { AND: andConditions }
        : {};
    const allBooks = yield prisma_1.default.book.findMany({
        where: whereConditions,
        include: {
            category: true,
        },
        skip,
        take: size,
        orderBy: sortBy && sortOrder
            ? { [sortBy]: sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.book.count({
        where: whereConditions,
    });
    const totalPage = paginationHelper_1.paginationHelpers.calculateTotalPage(total, size);
    return {
        meta: {
            total,
            page,
            size,
            totalPage,
        },
        data: allBooks,
    };
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const singleBook = yield prisma_1.default.book.findUnique({
        where: {
            id,
        },
        include: {
            category: true,
        },
    });
    return singleBook;
});
const getBookByCategoryId = (categoryId, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOption);
    const booksByCategory = yield prisma_1.default.book.findMany({
        where: {
            categoryId,
        },
        include: {
            category: true,
        },
        skip,
        take: size,
    });
    const total = yield prisma_1.default.book.count({
        where: {
            categoryId,
        },
    });
    const totalPage = paginationHelper_1.paginationHelpers.calculateTotalPage(total, size);
    return {
        meta: {
            page,
            size,
            total,
            totalPage,
        },
        data: booksByCategory,
    };
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBook = yield prisma_1.default.book.update({
        where: {
            id,
        },
        data: payload,
    });
    return updatedBook;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBook = yield prisma_1.default.book.delete({
        where: {
            id,
        },
    });
    return deletedBook;
});
exports.BookService = {
    createBook,
    getAllBook,
    getSingleBook,
    getBookByCategoryId,
    updateBook,
    deleteBook,
};
