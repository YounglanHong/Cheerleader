const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const userRouter = require('./routes/user');
const messageRouter = require('./routes/message');
const cookieParser = require('cookie-parser');

const app = express();

// 이거 써야 쿠키 볼 수 있다
// 이거 써야 쿠키에 담긴 걸 가져올 수 있다
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  session({
    secret: 'cheerup',
    resave: false,
    saveUninitialized: true,
  }),
);

// get/post 요청 시 상태 메세지 확인 가능
// console.log() 도 가능
app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.send('Hello World');
});

app.use(
  cors({
    origin: ['http://localhost:3000'],
    method: ['GET', 'POST'],
    credentials: true,
  }),
);

app.use('/user', userRouter);
app.use('/message', messageRouter);

app.listen(4000);
