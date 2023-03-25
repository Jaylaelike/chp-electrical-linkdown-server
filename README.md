# Node.js CRUD API using Express and MySQL2

This is a simple Node.js CRUD (Create, Read, Update, Delete) API using Express and MySQL2. The API provides endpoints to create, read, update, and delete users from a MySQL database.

## Getting Started

1. Clone the repository: git clone https://github.com/<your-username>/nodejs-express-mysql-crud.git
2. Install dependencies: npm install
3. Start the server: npm start


### Endpoints

This endpoint returns a list of all users in the database.

    GET /api/users

This endpoint returns a specific user by ID

    GET /api/users/:id
    
This endpoint creates a new user in the database.

    POST /api/users/create

This endpoint updates an existing user in the database.

    PUT /api/users/update  

This endpoint deletes an existing user from the database.

    DELETE /api/users/delete 
    


### Database Configuration

The database connection configuration is located in `server.js`

```
const connection = mysql.createConnection({
  host: "Yours Host",
  user: "Yours User",
  password: "Yours Password",
  database: "Yours Database",
  ssl: {
    rejectUnauthorized: true,
  },
});

```

Make sure to update the configuration to match your MySQL server.


## Dependencies

- Express.js
- cors
- mysql2

