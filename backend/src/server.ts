import "dotenv/config";
import express from "express";
import { testDatabaseConnection } from "./db/database";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import subtaskRoutes from "./routes/subtasks.routes";   
import labelRoutes from "./routes/labels.routes";
import taskLabelRoutes from "./routes/taskLabels.routes";
import reminderRoutes from "./routes/reminders.routes";
import taskPreferencesRoutes from "./routes/taskPreferences.routes";

const app = express();

const PORT = 3000;

app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.use("/api/tasks", subtaskRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/labels", labelRoutes);
app.use("/api/tasks",taskLabelRoutes);
app.use("/api/tasks", reminderRoutes);
app.use("/api/preferences", taskPreferencesRoutes); 
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