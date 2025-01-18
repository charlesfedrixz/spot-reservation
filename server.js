import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const port = process.env.PORT || 9090;

app.get("/", (req, res) => {
  return res.send("Server is running");
});
//server listening
app.listen(port, () => {
  console.log(
    `Server of your spot-reservation is running on http://localhost:${port}`
  );
});
