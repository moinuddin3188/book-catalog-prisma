# Assignment 4 (Book Catallog Backend With Prisma)

This is a simple backend application for book listing. Users can signup with there email, password and other information. And can order books. Andmin can create Book, Category. Also can update and delete Books and categories.

### Live link

The project is live. Access Link --->>> [Live Link](https://book-catalog-prisma-backend.onrender.com).

### Application Routes:

#### Auth Routes

- `api/v1/auth/signup` (POST) // Create a new user.
- `api/v1/auth/signin` (POST) // Login user


#### User Routes

- `api/v1/users` (GET) // Get all users.
- `api/v1/users/37f3e019-d335-4f24-bdce-1fdf209637a5` (GET) // Get a single user by \_id.
- `api/v1/users/37f3e019-d335-4f24-bdce-1fdf209637a5` (PATCH) // Update an existing user by \_id.
- `api/v1/users/37f3e019-d335-4f24-bdce-1fdf209637a5` (DELETE) // Delete a user by \_id.

#### profile Routes

- `api/v1/users/profile` (GET) // Get a single profile.

#### Category Routes

- `api/v1/categories/create-category` (POST) // Add a new category.
- `api/v1/categories` (GET) // Get all category.
- `api/v1/categories/c7385fbf-fa3c-4aa3-acce-bad12dc248af` (GET) // Get a single category by \_id.
- `api/v1/categories/c7385fbf-fa3c-4aa3-acce-bad12dc248af` (PATCH) // Update an category cow by \_id.
- `api/v1/categories/c7385fbf-fa3c-4aa3-acce-bad12dc248af` (DELETE) // Delete a category by \_id.

#### Book Routes

- `api/v1/books/create-book` (POST) // Add a new book.
- `api/v1/books` (GET) // Get all book.
- `api/v1/books/0b064342-5df3-419a-849c-7d832889d2d5` (GET) // Get a single book by \_id.
- `api/v1/books/:categoryId/category` (GET) // Get all books by category \_id.
- `api/v1/books/0b064342-5df3-419a-849c-7d832889d2d5` (PATCH) // Update an book book by \_id.
- `api/v1/books/0b064342-5df3-419a-849c-7d832889d2d5` (DELETE) // Delete a book

#### Pagination and Filtering routes of Books

- `api/v1/books?pag=1&size=10`
- `api/v1/books?sortBy=price&sortOrder=asc`
- `api/v1/books?minPrice=5&maxPrice=10`
- `api/v1/books?category=64994232a09ffcc65ce27be6`
- `api/v1/books?search=Horror`

#### Order Routes

- `api/v1/orders/create-order` (POST) // Create a new order.
- `api/v1/orders` (GET) // Get all orders of a user.
- `api/v1/orders` (GET) // Get all orders of as an Admin.
- `api/v1/orders/ecda0859-201b-4d09-bcfd-0677c3fedd0c` (GET) // Get single order.

### Technologies Used

- Express.js
- Prisma
- Node.js
- TypeScript
- Jwt: For custom authentication
