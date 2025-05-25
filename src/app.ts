import express from "express";
import cors from "cors";
import goalRoutes from "./routes/goal.routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/goals", goalRoutes);

export default app;
