# Dog Facts API

A simplified Dog Facts API built with Node.js and Express.js. Returns random dog facts in JSON format.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

The server runs on `http://localhost:3000`.

## API Endpoints

### GET /facts

Returns dog facts in JSON format.

#### Query Parameters

| Parameter | Type    | Required | Description                              |
|-----------|---------|----------|------------------------------------------|
| `number`  | integer | No       | Number of random dog facts to return.    |

- If `number` is **not provided**, all available facts are returned.
- If `number` is provided, that many randomly selected facts are returned.

#### Success Response (200)

```json
{
  "facts": ["A group of pugs is called a grumble.", "Dogs have three eyelids."],
  "success": true
}
```

#### Error Responses

**400 Bad Request** — Invalid `number` parameter:

```json
{
  "error": "The 'number' parameter must be a positive integer.",
  "success": false
}
```

**400 Bad Request** — `number` exceeds available facts:

```json
{
  "error": "The 'number' parameter cannot exceed 232 (total available facts).",
  "success": false
}
```

**404 Not Found** — Unknown endpoint:

```json
{
  "error": "Endpoint not found. Try GET /facts",
  "success": false
}
```

## Example Usage

Get 1 random dog fact:

```
GET http://localhost:3000/facts?number=1
```

Response:

```json
{
  "facts": ["Dalmatians are completely white at birth."],
  "success": true
}
```

Get all dog facts:

```
GET http://localhost:3000/facts
```

## Tech Stack

- Node.js
- Express.js
