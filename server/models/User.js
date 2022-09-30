const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; //암오화제한
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  //post할 데이터 만들기
  name: {
    type: String,
    maxLength: 50
  },
  email: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    minLength: 5
  },
  lastname: {
    type: String,
    maxLength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokeExp: {
    type: Number
  }
});
userSchema.pre("save", function (next) {
  //데이터가져오기
  let user = this;
  //패스워드가 변환 될때만
  if (user.isModified("password")) {
    //비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        //내가 입력한 비밀번호를 암호화로 바꿔준다.
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  //compare 에서 데이터베이스에 값이랑 입력된비밀번호값을 암호화해서 비교하기
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    //비밀번호가 같지않으면 그냥  err
    if (err) return cb(err);
    //비밀번호가 같으면 콜백에 에러는 없고 비밀번호는 같다 isMatch =true
    cb(null, isMatch);
  });
};

userSchema.methods.Token = function (cb) {
  let user = this;

  // jsonWebtoken을 이용해서 token을 생성하기
  let token = jwt.sign(user._id.toHexString(), "secretToken");

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  let user = this;

  //토큰을 decode 한다.
  jwt.verify(token, "secretToken", function (err, decoded) {
    //유저 아이디를 이용해서 유저를 찾은 다음에
    //클라이언트에서 가져온 token과 DB에서 보관된 토큰이 일치하는지 확인
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};
const User = mongoose.model("User", userSchema);

module.exports = { User };
