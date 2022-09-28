const mongoose = require("mongoose");
const express = require('express');
const app = express();
const port = 3003;
const MONGODB_URL ='mongodb+srv://uiuxksh:zneh8965@kimseonghoon.5pzjrbp.mongodb.net/?retryWrites=true&w=majority';


mongoose.connect(MONGODB_URL).then(() => console.log('MongDb')).catch((err) => console.log(err));
app.get('/',(req,res) => res.send('Hello Word'));
app.listen(port,() => console.log(` ${port}번 포트가 열렸습니다`));