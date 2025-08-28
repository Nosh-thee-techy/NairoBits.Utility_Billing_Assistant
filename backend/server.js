const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock database (temporary in-memory storage)
let transactions = [];

// Routes
app.get("/", (req, res) => {
  res.send("Utility Billing Assistant Backend is running ✅");
});

app.post("/pay", (req, res) => {
  const { amount, account } = req.body;

  if (!amount || !account) {
    return res.status(400).json({ message: "Amount and Account are required" });
  }

  const transaction = {
    id: transactions.length + 1,
    amount,
    account,
    date: new Date(),
  };

  transactions.push(transaction);
  res.json({ message: "Bill paid successfully ✅", transaction });
});

app.get("/history", (req, res) => {
  res.json(transactions);
});

app.post("/settings", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name and Email required" });
  }
  res.json({ message: "Settings saved ✅", settings: { name, email } });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
