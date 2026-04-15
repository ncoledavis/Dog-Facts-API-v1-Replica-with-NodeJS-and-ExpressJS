# Dog-Facts-API-v1-Replica-with-NodeJS-and-ExpressJS

# 🐶 Dog Facts API

A beginner-friendly Dog Facts API built with **Node.js** and **Express.js**. This project demonstrates how to create a simple API endpoint, read data from a JSON file, handle query parameters, and return results in a clean, readable format.

---

## 📦 Features

- Express.js server
- Dog facts stored in a JSON file
- `GET /facts` endpoint
- Optional `number` query parameter
- HTML list output for easy viewing in the browser
- Basic error handling

---

## 📁 Project Structure

```
dog-facts-api/
├── dog_facts.json
├── server.js
├── package.json
└── node_modules/
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/dog-facts-api.git
cd dog-facts-api
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start the server

```bash
node server.js
```

The server will run at:

```
http://localhost:3000
```

---

## 🛣️ API Endpoints

### ✅ GET `/facts`

Returns a list of dog facts.

#### Example Request

```
GET http://localhost:3000/facts
```

#### Example Response (HTML)

- Dogs have three eyelids
- Dogs can learn over 1000 words
- Dogs sweat through their paw pads

---

### ✅ GET `/facts?number=N`

Returns only the first **N** dog facts.

#### Example Request

```
GET http://localhost:3000/facts?number=3
```

#### Error Case

If `number` is not a positive integer:

```
GET /facts?number=abc
```

Response:

```
Error: 'number' must be a positive integer
```

---

## 📄 Data Source

Dog facts are stored in a JSON file:

```json
{
  "facts": [
    "Dogs have three eyelids.",
    "A dog’s sense of smell is at least 40x better than humans.",
    "Dogs can learn more than 1000 words.",
    "The Basenji is the only breed that doesn’t bark."
  ]
}
```

---

## 🧠 How It Works

- Express listens for incoming HTTP requests
- The `/facts` route handles GET requests
- Query parameters are read using `req.query`
- Facts are sliced if a `number` is provided
- An HTML list (`<ul><li>`) is dynamically generated and sent to the browser

---

## 🚀 Future Improvements

- Add `/facts/random` endpoint
- Return JSON or HTML based on request headers
- Add styling with CSS
- Add POST requests to allow adding facts
- Deploy the API online

---
