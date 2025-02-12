const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MySQL Database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "jeevan", // Change if you have a password
  database: "usersDB",
});

db.connect(err => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database");
});

// Routes

// GET - Fetch all users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result);
    }
  });
});

// POST - Create a new user
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Failed to create user" });
    } else {
      res.status(201).json({ id: result.insertId, name, email });
    }
  });
});

// GET - Fetch a single user by ID
app.get("/users/:id", (req, res) => {
  db.query("SELECT * FROM users WHERE id = ?", [req.params.id], (err, result) => {
    if (err || result.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(result[0]);
    }
  });
});

// PUT - Update a user by ID
app.put("/users/:id", (req, res) => {
  const { name, email } = req.body;
  db.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, req.params.id], (err, result) => {
    if (err || result.affectedRows === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json({ id: req.params.id, name, email });
    }
  });
});

// DELETE - Remove a user by ID
app.delete("/users/:id", (req, res) => {
  db.query("DELETE FROM users WHERE id = ?", [req.params.id], (err, result) => {
    if (err || result.affectedRows === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json({ message: "User deleted successfully" });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
