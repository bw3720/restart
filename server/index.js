const express = require("express");
const app = express();

const mongoose = require("mongoose");
const config = require("./config/key"); //key 현재 환경을 읽어와서 mongoDB 접속 주소 어떻게 줄지 정함

const cors = require("cors");
const cookieParser = require("cookie-parser");

const { Post } = require("./config/models/Post");
const { User } = require("./config/models/User");

//CORS 정책
// proxy

// cors : express에서 cors 설정 -> 화면단에서 경로 localhost:XXXX 으로 잡아줘야함
app.use(cors());

//바디파서 : 클라이언트에서 오는 정보를 서버에서 분석해서 들여올수있게 하는것
//버전 업으로 express 에서 사용 가능. 클라이언트에서 오는 데이터를 서버에서 분석
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

//회원가입
app.post("/api/user/register", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then((userInfo) => res.status(200).json({ success: true })) //status(200) 통신 성공 이라는 뜻...!
    .catch((err) => res.json({ success: false, err }));
});

//로그인
app.post("/api/user/login", (req, res) => {
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
    user.comparePassword(req.body.password).then((isMatch) => {
      if (!isMatch) {
        //비밀번호 틀렸을 시
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }

      //비밀번호가 맞다면 토근을 생성하기.
      user
        .generateToken()
        .then((user) => {
          res
            .cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    });
  });
});

//게시물 등록
app.post("/api/post/register", (req, res) => {
  const post = new Post(req.body);

  post
    .save()
    .then((postInfo) => res.status(200).json({ success: true })) //status(200) 통신 성공 이라는 뜻...!
    .catch((err) => res.json({ success: false, err }));
});

const port = 4000; //5000번 포트는 airplay에서 사용....

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
