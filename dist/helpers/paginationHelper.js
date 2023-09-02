"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelpers = void 0;
const calculatePagination = (options) => {
    const page = Number(options.page || 1);
    const size = Number(options.size || 10);
    const skip = (page - 1) * size;
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    return {
        page,
        size,
        skip,
        sortBy,
        sortOrder,
    };
};
const calculateTotalPage = (total, size) => {
    return total % size > 0 ? (total - (total % size)) / size + 1 : total / size;
};
exports.paginationHelpers = {
    calculatePagination,
    calculateTotalPage,
};
