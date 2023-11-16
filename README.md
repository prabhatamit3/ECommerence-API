# Ecommerce Platform Admin API

This project is an API for an ecommerce platform admin to manage product inventory. It is built with Node.js and MongoDB.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- MongoDB

### Installing

1. Clone the repository: `git clone https://github.com/prabhatamit3/ECommerence-API.git`
2. Navigate into the directory: `cd ECommerence-API`
3. Install the dependencies: `npm install`

### Running the Application

Start the server: `npm start`

The server runs on port 8001.
Change the port if required

## API Endpoints

- **Add Products**: `POST /products/create`
- **List Products**: `GET /products`
- **Delete Product**: `DELETE /products/:id`
- **Update Product Quantity**: `POST /products/:id/update_quantity/?number=10`

## Testing

Test the API endpoints using Postman or any other API testing tool.

## Built With

- Node.js
- MongoDB

## Authors

- Amit Prabhat

