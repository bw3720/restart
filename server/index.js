const express = require("express");
const app = express();

const mongoose = require("mongoose");
const config = require("./config/key"); //key 현재 환경을 읽어와서 mongoDB 접속 주소 어떻게 줄지 정함

const cors = require("cors");

const { Post } = require("./config/models/Post");

//CORS 정책
// proxy

// cors : express에서 cors 설정 -> 화면단에서 경로 localhost:XXXX 으로 잡아줘야함
app.use(cors());

//바디파서 : 클라이언트에서 오는 정보를 서버에서 분석해서 들여올수있게 하는것
//버전 업으로 express 에서 사용 가능.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/api/hello", (req, res) => {
  res.send("Hello");
});

app.post("/regi", (req, res) => {
  const post = new Post(req.body);
  post
    .save()
    .then((userInfo) => res.status(200).json({ success: true })) //status(200) 통신 성공 이라는 뜻...!
    .catch((err) => res.json({ success: false, err }));
});

const port = 4000; //5000번 포트는 airplay에서 사용....

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
