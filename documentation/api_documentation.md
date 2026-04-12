# E-Commerce API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### 1. User Signup
**Endpoint:** `POST /auth/signup`

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "confirmPassword": "securepassword123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "isAdmin": false
  }
}
```

---

### 2. User Login
**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "isAdmin": false
  }
}
```

---

### 3. Get Current User Profile
**Endpoint:** `GET /auth/profile`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "john_doe",
  "email": "john@example.com",
  "isAdmin": false,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

## Product Endpoints

### 1. Get All Products
**Endpoint:** `GET /products`

**Query Parameters:**
- `category`: Filter by category (Electronics, Clothing, Books, Home, Other)
- `search`: Search by product name or description
- `minPrice`: Minimum price filter
- `maxPrice`: Maximum price filter

**Example:**
```
GET /products?category=Electronics&minPrice=1000&maxPrice=5000&search=headphones
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Wireless Headphones",
    "description": "Premium noise-cancelling wireless headphones",
    "price": 4999,
    "image": "https://example.com/image.jpg",
    "stock": 15,
    "category": "Electronics",
    "rating": 4.5,
    "reviews": [],
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

---

### 2. Get Single Product
**Endpoint:** `GET /products/:id`

**Example:**
```
GET /products/507f1f77bcf86cd799439011
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Wireless Headphones",
  "description": "Premium noise-cancelling wireless headphones",
  "price": 4999,
  "image": "https://example.com/image.jpg",
  "stock": 15,
  "category": "Electronics",
  "rating": 4.5,
  "reviews": [],
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

### 3. Get Product Categories
**Endpoint:** `GET /products/category/list`

**Response (200):**
```json
["All", "Electronics", "Clothing", "Books", "Home", "Other"]
```

---

## Cart Endpoints

### 1. Get Shopping Cart
**Endpoint:** `GET /cart`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "userId": "507f1f77bcf86cd799439012",
  "items": [
    {
      "productId": "507f1f77bcf86cd799439013",
      "name": "Wireless Headphones",
      "price": 4999,
      "image": "https://example.com/image.jpg",
      "quantity": 1
    }
  ],
  "totalPrice": 4999,
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

---

### 2. Add Item to Cart
**Endpoint:** `POST /cart/add`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "productId": "507f1f77bcf86cd799439013",
  "quantity": 2
}
```

**Response (200):**
```json
{
  "message": "Item added to cart",
  "cart": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "items": [
      {
        "productId": "507f1f77bcf86cd799439013",
        "name": "Wireless Headphones",
        "price": 4999,
        "image": "https://example.com/image.jpg",
        "quantity": 2
      }
    ],
    "totalPrice": 9998,
    "updatedAt": "2024-01-15T10:35:00Z"
  }
}
```

---

### 3. Update Cart Item Quantity
**Endpoint:** `PUT /cart/update/:productId`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "quantity": 3
}
```

**Response (200):**
```json
{
  "message": "Cart updated",
  "cart": { /* ... */ }
}
```

---

### 4. Remove Item from Cart
**Endpoint:** `DELETE /cart/remove/:productId`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "message": "Item removed from cart",
  "cart": { /* ... */ }
}
```

---

### 5. Clear Entire Cart
**Endpoint:** `DELETE /cart/clear`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "message": "Cart cleared",
  "cart": {
    "items": [],
    "totalPrice": 0
  }
}
```

---

## Order Endpoints

### 1. Create Order (Checkout)
**Endpoint:** `POST /orders/checkout`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "shippingAddress": {
    "fullName": "John Doe",
    "address": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "cod"
}
```

**Response (201):**
```json
{
  "message": "Order created successfully",
  "order": {
    "_id": "507f1f77bcf86cd799439014",
    "userId": "507f1f77bcf86cd799439012",
    "items": [
      {
        "productId": "507f1f77bcf86cd799439013",
        "name": "Wireless Headphones",
        "price": 4999,
        "quantity": 1,
        "image": "https://example.com/image.jpg"
      }
    ],
    "totalPrice": 4999,
    "status": "pending",
    "shippingAddress": {
      "fullName": "John Doe",
      "address": "123 Main Street",
      "city": "New York",
      "state": "NY",
      "postalCode": "10001",
      "country": "USA"
    },
    "paymentMethod": "cod",
    "createdAt": "2024-01-15T10:40:00Z"
  }
}
```

---

### 2. Get User's Orders
**Endpoint:** `GET /orders`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439014",
    "userId": "507f1f77bcf86cd799439012",
    "items": [ /* ... */ ],
    "totalPrice": 4999,
    "status": "pending",
    "createdAt": "2024-01-15T10:40:00Z"
  }
]
```

---

### 3. Get Single Order
**Endpoint:** `GET /orders/:id`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "userId": "507f1f77bcf86cd799439012",
  "items": [ /* ... */ ],
  "totalPrice": 4999,
  "status": "pending",
  "shippingAddress": { /* ... */ },
  "paymentMethod": "cod",
  "createdAt": "2024-01-15T10:40:00Z"
}
```

---

### 4. Update Order Status
**Endpoint:** `PUT /orders/:id/status`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "status": "shipped"
}
```

**Valid Status Values:** pending, confirmed, shipped, delivered, cancelled

**Response (200):**
```json
{
  "message": "Order status updated",
  "order": { /* ... */ }
}
```

---

## Admin Endpoints

### 1. Create Product
**Endpoint:** `POST /admin/products`

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 999,
  "image": "https://example.com/image.jpg",
  "stock": 20,
  "category": "Electronics"
}
```

**Response (201):**
```json
{
  "message": "Product created successfully",
  "product": { /* ... */ }
}
```

---

### 2. Update Product
**Endpoint:** `PUT /admin/products/:id`

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "name": "Updated Product",
  "price": 1299,
  "stock": 15
}
```

**Response (200):**
```json
{
  "message": "Product updated successfully",
  "product": { /* ... */ }
}
```

---

### 3. Delete Product
**Endpoint:** `DELETE /admin/products/:id`

**Headers:** `Authorization: Bearer <admin_token>`

**Response (200):**
```json
{
  "message": "Product deleted successfully"
}
```

---

### 4. Get All Orders (Admin)
**Endpoint:** `GET /admin/orders`

**Headers:** `Authorization: Bearer <admin_token>`

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439014",
    "userId": {
      "_id": "507f1f77bcf86cd799439012",
      "username": "john_doe",
      "email": "john@example.com"
    },
    "items": [ /* ... */ ],
    "totalPrice": 4999,
    "status": "pending",
    "createdAt": "2024-01-15T10:40:00Z"
  }
]
```

---

### 5. Update Order Status (Admin)
**Endpoint:** `PUT /admin/orders/:id/status`

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "status": "delivered"
}
```

**Response (200):**
```json
{
  "message": "Order status updated",
  "order": { /* ... */ }
}
```

---

### 6. Get Admin Dashboard Stats
**Endpoint:** `GET /admin/stats`

**Headers:** `Authorization: Bearer <admin_token>`

**Response (200):**
```json
{
  "totalProducts": 15,
  "totalOrders": 42,
  "totalUsers": 28,
  "totalRevenue": 125500.50
}
```

---

## Error Responses

### 400 - Bad Request
```json
{
  "message": "Please fill in all required fields"
}
```

### 401 - Unauthorized
```json
{
  "message": "No token provided, authorization denied"
}
```

### 403 - Forbidden
```json
{
  "message": "Admin access required"
}
```

### 404 - Not Found
```json
{
  "message": "Product not found"
}
```

### 500 - Server Error
```json
{
  "message": "Internal server error",
  "error": "error details"
}
```

---

## Testing with cURL

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Get Products
```bash
curl http://localhost:5000/api/products
```

### Add to Cart
```bash
curl -X POST http://localhost:5000/api/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "productId": "507f1f77bcf86cd799439013",
    "quantity": 2
  }'
```

---

## Rate Limiting
Currently no rate limiting is implemented. It's recommended to add rate limiting in production.

---

## CORS
CORS is enabled for all origins. In production, restrict to your frontend domain.

---

**Last Updated:** January 2024
**Version:** 1.0.0
