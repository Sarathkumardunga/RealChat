import express from "express";
import dotenv from "dotenv";
const app = express();

dotenv.config();
const PORT = process.env.PORT | 5000;

// Testing the server
app.get("/", (req, res) => {
    //root route http://localhost:8000/
    res.send("Hello testing the SERVER!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});