# Growhut

A simple Node.js Express server for user registration with email validation, password hashing, and duplicate user checking.

## Features

- User registration with email and password validation
- Password hashing using bcrypt
- Duplicate user detection by email
- JSON file-based storage
- Health check endpoint
- Input validation and error handling

## Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone or download the project
2. Navigate to the project directory:
   ```powershell
   cd "c:\Users\ASUS Vivobook\Desktop\Growhut\Growhut"
   ```
3. Install dependencies:
   ```powershell
   npm install
   ```

## Dependencies

- **express**: Web framework for Node.js
- **bcrypt**: Password hashing library
- **uuid**: Generate unique user IDs
- **body-parser**: Parse incoming request bodies
- **fs**: File system operations (built-in Node.js module)

## Usage

### Starting the Server

```powershell
node server.js
```

The server will start on port 3000 and display: "Yup the server is working!"

### API Endpoints

#### Health Check
- **GET** `/health`
- **Response**: `200 OK`
  ```json
  {
    "message": "The health is good!"
  }
  ```

#### User Registration
- **POST** `/register`
- **Content-Type**: `application/json`
- **Body**:
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```

##### Successful Registration
- **Response**: `201 Created`
  ```json
  {
    "message": "Thank you for registering",
    "userId": "generated-uuid-here"
  }
  ```

##### Error Responses

- **400 Bad Request** - Missing required fields:
  ```json
  {
    "message": "Invalid or insufficient req body"
  }
  ```

- **400 Bad Request** - Invalid email format:
  ```json
  {
    "message": "The email in req body is not valid!"
  }
  ```

- **400 Bad Request** - Password too short:
  ```json
  {
    "message": "The password is too short!"
  }
  ```

- **409 Conflict** - Email already exists:
  ```json
  {
    "message": "Duplicate entries exist!"
  }
  ```

## Validation Rules

- **Username**: Required, non-empty string
- **Email**: Required, must be valid email format
- **Password**: Required, minimum 5 characters

## Data Storage

User data is stored in `./db/users.js` as a JSON file with the following structure:

```json
[
  {
    "id": "unique-uuid",
    "username": "johndoe",
    "email": "john@example.com",
    "password": "hashed-password"
  }
]
```

## Testing with curl

### Health Check
```powershell
curl -X GET http://localhost:3000/health
```

### Register a New User
```powershell
curl -X POST http://localhost:3000/register -H "Content-Type: application/json" -d '{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"password123\"}'
```

## Project Structure

```
Growhut/
├── server.js          # Main server file
├── package.json       # Project dependencies
├── package-lock.json  # Dependency lock file
├── README.md          # This file
└── db/
    └── users.js       # User data storage (JSON file)
```

## Known Issues

1. There's a bug in the registration endpoint: `user.push(newUser)` should be `users.push(newUser)`
2. The email validation regex has a typo: `[6\s@]` should be `[^\s@]`

## Future Improvements

- Add user login functionality
- Implement proper database (MongoDB, PostgreSQL)
- Add JWT authentication
- Add password strength validation
- Add user profile management
- Add API documentation with Swagger
- Add unit tests
- Add environment configuration

## License

ISC