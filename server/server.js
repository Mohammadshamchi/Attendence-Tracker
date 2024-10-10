const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectToDatabase } = require("./config/db");
const classesRouter = require("./src/routes/classes");
const studentsRouter = require("./src/routes/students");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

let db;

async function startServer() {
  try {
    db = await connectToDatabase();

    // Mount routers
    app.use("/api/classes", classesRouter(db));
    app.use("/api/students", studentsRouter(db));

    app.get("/", (req, res) => {
      res.json({ message: "Attendance Tracker API" });
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
}

startServer();
