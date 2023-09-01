type IOptions = {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: string;
};

type IOptionsResult = {
  page: number;
  size: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};

const calculatePagination = (options: IOptions): IOptionsResult => {
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

const calculateTotalPage = (total: number, size: number) => {
  return total % size > 0 ? (total - (total % size)) / size + 1 : total / size;
};

export const paginationHelpers = {
  calculatePagination,
  calculateTotalPage,
};
