# Mini JWT-Based Authentication System

A minimal authentication system built using **Express.js** and **JWT (JSON Web Tokens)**.

This project demonstrates:

* JWT generation
* JWT validation
* Expiry handling
* Signature verification
* Minimal HTML UI for demonstration

# Project Overview

This system allows:

### ✔ Generate a JWT

* Accepts `userId`
* Creates claims:

  ```json
  {
    "sub": "<user-id>",
    "role": "user"
  }
  ```
* Signs using a secret key
* Adds expiration time
* Returns token

---

### ✔ Validate a JWT

* Accepts token
* Verifies:

  * Signature
  * Expiration
* Decodes payload
* Returns:

  * `"Token Valid"` + claims
  * OR `"Token Invalid"`

---

### ✔ Expiry Handling

* Tokens automatically expire
* Expired tokens are rejected
* Error message: `"jwt expired"`

---

# File Explanations

---

## 🔹 server.js

* Creates Express server
* Parses JSON requests
* Serves static HTML UI
* Mounts JWT routes
* Starts server on port 4000

---

## 🔹 utils/jwt.js

Contains:

### generateToken(userId)

Uses:

```js
jwt.sign(payload, secret, { expiresIn })
```

Creates JWT with:

* sub (subject)
* role
* exp (expiration)

---

### validateToken(token)

Uses:

```js
jwt.verify(token, secret)
```

If:

* Signature invalid → error
* Token expired → error
* Otherwise → returns decoded payload

---

## 🔹 routes/jwtRoutes.js

Contains two endpoints:

### POST `/jwt/generate`

Input:

```json
{
  "userId": "atharv123"
}
```

Output:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

---

### POST `/jwt/validate`

Input:

```json
{
  "token": "<jwt-token>"
}
```

If valid:

```json
{
  "message": "Token Valid",
  "claims": {
    "sub": "atharv123",
    "role": "user",
    "iat": ...,
    "exp": ...
  }
}
```

If expired:

```json
{
  "message": "Token Invalid",
  "error": "jwt expired"
}
```

---

## 🔹 public/index.html

Minimal UI that allows:

* Enter userId
* Generate JWT
* Paste token
* Validate token
* Display claims or error

Uses:

* HTML
* CSS
* JavaScript fetch API

---

# How JWT Works

A JWT consists of 3 parts:

```
HEADER.PAYLOAD.SIGNATURE
```

### Header

Contains:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

---

### Payload

Contains claims:

```json
{
  "sub": "atharv123",
  "role": "user",
  "iat": 123456,
  "exp": 123789
}
```

---

### Signature

Created using:

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
```

If secret changes → token invalid.

---


JWT Server running on http://localhost:4000
```

---

## Open UI

Open in browser:

```
http://localhost:4000/index.html
```

---

# Demo Flow (For Mentor Presentation)

### ✔ Step 1: Generate Token

* Enter userId
* Click Generate
* Token appears

---

### ✔ Step 2: Validate Token

* Paste token
* Click Validate
* Claims displayed

---

### ✔ Step 3: Expiry Demo

* Wait 1 minute
* Click Validate again
* Shows:

  ```
  Token Invalid
  Reason: jwt expired
  ```

This proves expiration handling works.

---
