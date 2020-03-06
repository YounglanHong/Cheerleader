const { users } = require('../../models');
const { messages } = require('../../models');
const jwt = require('jsonwebtoken');
const secretObj = require('../../config/jwt');

module.exports = {
  post: (req, res) => {
    let token = req.cookies.data;
    let decoded = jwt.verify(token, secretObj.secret);
    if (decoded) {
      users
        .destroy({
          where: {
            email: decoded.email,
          },
        })
        .then(data => {
          messages.destroy({
            where: {
              userid: decoded.userid,
            },
          });
          res.send('회원탈퇴');
        });
    } else {
      res.send('토큰 없습니다만?');
    }
  },
};
