import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
const app = express();

dotenv.config();
const PORT = process.env.PORT | 5000;

// Testing the server
app.get("/", (req, res) => {
    //root route http://localhost:8000/
    res.send("Hello testing the SERVER!");
});

//Middleware to call the authRoutes whenever /api/auth is visited
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});