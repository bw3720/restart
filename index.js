const express = require("express");
const app = express();
const port = 4000; //5000번 포트는 airplay에서 사용....

const mongoose = require("mongoose");

//버전 업으로 express 에서 사용 가능.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://pokbw3720:1a0cf36212@reactstudy.dbykevu.mongodb.net/?retryWrites=true&w=majority&appName=reactStudy"
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
