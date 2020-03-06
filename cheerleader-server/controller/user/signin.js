const { users } = require('../../models');
const jwt = require('jsonwebtoken');
const secretObj = require('../../config/jwt');

module.exports = {
  post: (req, res) => {
    const { email, password } = req.body;
    // let sess = req.session;
    users
      .findOne({
        where: {
          email: email,
          password: password,
        },
      })
      .then(data => {
        if (data) {
          // console.log(data.id);
          let token = jwt.sign(
            {
              userid: data.id,
              email: email,
            },
            secretObj.secret,
            {
              expiresIn: '10m',
            },
          );
          res.cookie('data', token);
          res.json({
            token: token,
          });
          // console.log(data.id);
          // 세션에 담아준다
          // sess.userid = data.id;
          // res.status(200).json({
          //   id: data.id,
          // });
        } else {
          res.status(400).send('가입 되지 않은 회원입니다');
        }
      });
  },
};
