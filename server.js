import express from "express";
const app = express();

//server listening
const port = 9999;
app.listen(port, () => {
  console.log(
    `Server of your spot-reservation is running on http://localhost:${port}`
  );
});
