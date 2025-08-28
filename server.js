const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Allow CORS from any origin (good for dev in Codespaces)
app.use(cors());
// Parse JSON bodies
app.use(bodyParser.json());

// Mock database with initial dummy transactions
let transactions = [
  {
    id: 1,
    utility: "Water",
    amount: 500,
    method: "M-Pesa",
    date: new Date().toISOString(),
    status: "Completed",
    reference: "TX-123456"
  },
  {
    id: 2,
    utility: "Electricity",
    amount: 1200,
    method: "Airtel Money",
    date: new Date().toISOString(),
    status: "Completed",
    reference: "TX-654321"
  }
];

// Default route to check server
app.get("/", (req, res) => {
  res.send("Utility Billing Assistant Backend is running ✅");
});

// Pay endpoint
app.post("/api/pay", (req, res) => {
  const { utility, amount, method } = req.body;

  // Validate input
  if (!utility || !amount || !method) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Create transaction object
  const transaction = {
    id: Date.now(),
    utility,
    amount,
    method,
    date: new Date().toISOString(),
    status: "Completed",
    reference: `TX-${Math.floor(Math.random() * 1000000)}`
  };

  // Save to "database"
  transactions.unshift(transaction);

  console.log("💰 New Payment:", transaction);

  // Respond to front-end
  res.json({
    message: `Payment of KES ${amount} to ${utility} via ${method} completed successfully!`,
    transaction
  });
});

// Get payment history
app.get("/history", (req, res) => {
  res.json(transactions);
});

// Start server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
