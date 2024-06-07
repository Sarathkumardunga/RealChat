import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/messages.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
const app = express();
const PORT = process.env.PORT | 5001;

dotenv.config();

//Middleware to parse the incoming requests with JSON payloads from req.body
app.use(express.json()); 

//Middleware to call the authRoutes whenever /api/auth is visited
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// // Testing the server
// app.get("/", (req, res) => {
//     //root route http://localhost:8000/
//     res.send("Hello testing the SERVER!");
// });


app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
});