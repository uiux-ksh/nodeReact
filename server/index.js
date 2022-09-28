const mongoose = require("mongoose");
const express = require('express');
const app = express();
const port = 5000;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const {auth} = require('./middleware/auth');

const {User} = require('./models/User');

const config = require("./config/key");


//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

//aplication/json
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(config.mongoURL).then(() => console.log('MongDb')).catch((err) => console.log(err));
app.get('/',(req,res) => res.send('노드문 실행'));

app.post('/api/users/register',(req,res) => {

    //회원 가입 할때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.

     const user = new User(req.body)

     user.save((err,user) => {
          if(err) return res.json({success:false, err});
          return res.status(200).json({
               success:true
          })
     });
})



app.post('/api/users/login',(req,res) => {

     //요청된 이메일을 데이터 베이스에서 찾는다 .
     User.findOne({email:req.body.email},(err,user) => {
          //요청된 이메일이 맞는 않는다면 제공된 이메일에 해당되는 유저가 없다는 메시지 출력
          if(!user) {
               return res.json({
                    loginSuccess:false,
                    message:'제공된 이메일에 해당되는 유저가 없습니다.'
               })
          }
          //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인(메소드임)
          user.comparePassword(req.body.password , (err , isMatch) => {
             if(!isMatch)
             return res.json({loginSuccess:false, message:'비밀번호가 틀렸습니다.'})

          //비밀번호 까지 맞다면 토큰을 생성하기.
          user.Token((err,user) => {
               if(err) return res.status(400).send(err);

               //토큰을 저장한다. 어디에 ??  쿠키 , 로컬스토리지
               res.cookie('x_auth',user.token)
                   .status(200)
                   .json({loginSuccess:true,userId: user._id})


          })

          })

     })

})
//role 0 일반유저  role 0아니면 관리자
app.get('/api/users/auth', auth, (req, res) => {
     //여기 까지 미들웨어를 통과해 왔다는 얘기는  Authentication 이 True 라는 말.
     res.status(200).json({
          _id: req.user._id,
          isAdmin: req.user.role === 0 ? false : true,
          isAuth: true,
          email: req.user.email,
          name: req.user.name,
          lastname: req.user.lastname,
          role: req.user.role,
          image: req.user.image
     })
})

app.get('/api/users/logout', auth, (req,res) => {
     User.findOneAndUpdate({_id:req.user._id},
         {token: ""},(err,user) => {
           if(err) return res.status({success:false,err});
           return  res.status(200).send({
                success:true
           })
         })

})
app.listen(port,() => console.log(` ${port}번 포트가 열렸습니다`));