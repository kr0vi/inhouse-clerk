# Inhouse Clerk Backend API Docs

Base URL: http://localhost:3000
Content-Type: application/json

## GET /

Description: Health check.

Example request:

```js
import axios from "axios";

await axios.get("http://localhost:3000/");
```

Example response:

```text
Hello World!
```

## GET /info

Description: Service metadata.

Example request:

```js
import axios from "axios";

await axios.get("http://localhost:3000/info");
```

Example response:

```json
{
  "title": "Inhouse Clerk",
  "description": "A basic implementation of a Clerk-like authentication system built with Express and TypeScript.",
  "techStack": ["Express", "TypeScript", "JWT"]
}
```

## POST /signup

Description: Create a new user.

Request body:

- email (string, required)
- password (string, required)
- name (string, required)

Example request:

```js
import axios from "axios";

await axios.post("http://localhost:3000/signup", {
  email: "alex@example.com",
  password: "secret123",
  name: "Alex",
});
```

Example response:

```json
{
  "message": "User signed up successfully! go to /login"
}
```

Error responses:

- 400: { "message": "User already exists!" }

## POST /login

Description: Authenticate a user and return a JWT.

Request body:

- email (string, required)
- password (string, required)

Example request:

```js
import axios from "axios";

await axios.post("http://localhost:3000/login", {
  email: "alex@example.com",
  password: "secret123",
});
```

Example response:

```json
{
  "message": "User logged in successfully!",
  "token": "<jwt>"
}
```

Error responses:

- 400: { "message": "User not found!" }
- 400: { "message": "Invalid password!" }

## GET /me

Description: Return the current user for a valid JWT.

Headers:

- Authorization: Bearer <jwt>

Example request:

```js
import axios from "axios";

await axios.get("http://localhost:3000/me", {
  headers: { Authorization: "Bearer <jwt>" },
});
```

Example response:

```json
{
  "user": {
    "id": 1,
    "email": "alex@example.com",
    "name": "Alex"
  },
  "success": true
}
```

Error responses:

- 401: { "message": "No token provided!", "success": false }
- 401: { "message": "Invalid token!", "success": false }
- 404: { "message": "User not found!", "success": false }
