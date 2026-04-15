# Dog-Facts-API-v1-Replica-with-NodeJS-and-ExpressJS

# Dog Facts API – API Calls Documentation

This document describes **only the API calls (endpoints)** exposed by the Dog Facts API, including their purpose, usage, parameters, and responses.

---

## Base URL

```
http://localhost:3000
```

---

## API Endpoints

###  GET `/`

#### Description
Health check endpoint used to verify that the server is running.

#### Request

```
GET /
```

#### Response

- Returns a simple HTML message confirming the API is active

Example:

```
Dog Facts API is running!
```

---

###  GET `/facts`

#### Description
Returns a list of dog facts rendered as an HTML list. If no query parameters are provided, **all available dog facts** are returned.

#### Request

```
GET /facts
```

#### Response

- HTML document
- Unordered list (`<ul>`) of dog facts

Example output structure:

```
<ul>
  <li>Dogs have three eyelids.</li>
  <li>A dog’s sense of smell is at least 40x better than humans.</li>
  <li>Dogs can learn more than 1000 words.</li>
</ul>
```

---

###  GET `/facts?number=N`

#### Description
Returns **only the first N dog facts**, where `N` is a positive integer provided as a query parameter.

#### Request

```
GET /facts?number=N
```

#### Query Parameters

| Parameter | Type    | Required | Description |
|---------|---------|----------|-------------|
| number  | Integer | No       | Number of dog facts to return |

#### Example Request

```
GET /facts?number=3
```

#### Response

- HTML document
- Unordered list containing the first `N` facts

---

###  Error Handling – Invalid `number`

#### Description
If the `number` query parameter is not a positive integer, the API returns an error message.

#### Example Request

```
GET /facts?number=abc
```

#### Response

- HTTP Status: `400 Bad Request`
- HTML error message

Example:

```
Error: 'number' must be a positive integer.
```

---

###  404 – Unknown Endpoints

#### Description
Handles all undefined routes.

#### Example Request

```
GET /unknown
```

#### Response

- HTTP Status: `404 Not Found`
- HTML error message

Example:

```
404 - Endpoint not found
```

---

## Summary of API Calls

| Method | Endpoint | Purpose |
|-------|----------|---------|
| GET | `/` | Server health check |
| GET | `/facts` | Return all dog facts |
| GET | `/facts?number=N` | Return first N dog facts |

---

This file intentionally documents **only** the API calls and their behavior.
