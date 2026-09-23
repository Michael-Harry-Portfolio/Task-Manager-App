import express from "express";
import { testDatabaseConnection } from "./db/database";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Task Manager API is running",
  });
});

app.get("/api/test-db", async (req, res) => {
  try {
    await testDatabaseConnection();

    res.status(200).json({
      message: "Database connection successful",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown database error";

    res.status(500).json({
      message: "Database connection failed",
      error: message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});