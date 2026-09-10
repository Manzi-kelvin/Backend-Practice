# Backend Development Practice (Node.js + Express + MongoDB)

A beginner-friendly guide for building a REST API using **Node.js, Express.js, MongoDB, and JWT Authentication**.

---

# Features

* User Authentication (JWT)
* Product Management (CRUD)
* Order Management (CRUD)
* Inventory Tracking
* Reports API

---

# Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* dotenv

---

# Installation

Install all project dependencies:

```bash
npm install
```

---

# Run the Server

Start the development server:

```bash
npm run dev
```

---

# API Endpoints

| Endpoint        | Purpose                         |
| --------------- | ------------------------------- |
| `/api/auth`     | Authentication (Register/Login) |
| `/api/products` | Product CRUD operations         |
| `/api/orders`   | Order CRUD operations           |
| `/api/reports`  | Reports and analytics           |

---

# Project Structure

```text
backend-practice/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── orderController.js
│   └── reportController.js
│
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Order.js
│
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── orderRoutes.js
│   └── reportRoutes.js
│
├── middleware/
│   └── authMiddleware.js
│
├── .env
├── server.js
└── package.json
```

---

# 1. Create a Basic Express Server (`server.js`)

## Steps

1. Import **Express**.
2. Create an Express application.
3. Define the port.
4. Import and configure **dotenv**.
5. Import the MongoDB connection function.
6. Connect to the database.
7. Create a basic test route.
8. Mount API routes.
9. Start the server.


# 2. Connect to MongoDB (`config/db.js`)

## Steps

1. Import **Mongoose**.
2. Create an asynchronous connection function.
3. Use `mongoose.connect()`.
4. Display success or error messages.

# 3. Create Models (Schema)

Models define the structure of documents stored in MongoDB.

## Steps

1. Import Mongoose.
2. Create a schema.
3. Add fields and data types.
4. Export the model.


# 4. Create Controllers (CRUD Operations)

Controllers contain the application logic.

## Create a New Record

Use:

```javascript
Model.create(data);
```


## Read All Records

Use:

```javascript
Model.find()
```

## Read One Record

Use:

```javascript
Model.findById(id);
```

## Update a Record

Use:

```javascript
Model.findByIdAndUpdate(id, data, { new: true });
```

## Delete a Record

Use:

```javascript
Model.findByIdAndDelete(id);
```
---

# CRUD Summary

| Operation | Mongoose Method       |
| --------- | --------------------- |
| Create    | `create()`            |
| Read All  | `find()`              |
| Read One  | `findById()`          |
| Update    | `findByIdAndUpdate()` |
| Delete    | `findByIdAndDelete()` |

---

# 5. Create Routes

Routes connect URLs to controller functions.

# 6. Mount Routes in `server.js`

Import route files and connect them to API paths.

```javascript
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
```
**Simple flow:** Client sends a request → Route receives it → Controller processes it → Model interacts with MongoDB → Response is sent back to the client.
