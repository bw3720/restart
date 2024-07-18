const mongoose = require("mongoose");

//암호화 (https://www.npmjs.com/package/bcrypt) 사용법
const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken"); //토큰 생성 (https://www.npmjs.com/package/jsonwebtoken) 사용법

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

//userSchema.pre "..."을 하기전에 타는 함수 정의
userSchema.pre("save", function (next) {
  //비밀번호를 암호화 시킨다.

  var user = this; //위의 userSchema 정보 불러오기

  //비밀번호가 수정되었다면...
  if (user.isModified("password")) {
    //암호화에 필요한 salt 생성
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) {
        return next(err);
      }

      //salt를 사용하여 비밀번호 암호화
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash; //암호화 된 비밀번호를 기존에 비밀번호에 덮어씌우기
        next();
      });
    });
  } else {
    //비밀번호 수정이 아니라면 그냥 나가기
    next();
  }
});

// ///////GPT 구현부
userSchema.methods.comparePassword = function (plainPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      resolve(isMatch);
    });
  });
};

userSchema.methods.generateToken = function () {
  const user = this;
  return new Promise((resolve, reject) => {
    var token = jwt.sign(user._id.toHexString(), "secretToken");
    user.token = token;
    user
      .save()
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
};
// ////////////////
const User = mongoose.model("User", userSchema); //schema를 model로 감싼다.

module.exports = { User };
