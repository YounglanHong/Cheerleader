const { messages } = require('../../models');
const jwt = require('jsonwebtoken');
const secretObj = require('../../config/jwt');

module.exports = {
  post: (req, res) => {
    const { inputText, userId } = req.body;
    let token = req.cookies.data;
    let decoded = jwt.verify(token, secretObj.secret);

    // let { session } = req;
    // if (session.userid) {
    // 로그인이 된 상태
    if (decoded) {
      messages
        .findOrCreate({
          where: {
            inputText: inputText,
          },
          defaults: {
            // 메세지를 적고 post를 보내면 유저id가 자동으로 들어가게끔
            userId: decoded.userid,
          },
        })
        .then(([result, created]) => {
          if (created) {
            res.status(200).json(result);
          } else {
            res.status(409).send('같은 내용이 있습니다');
          }
        })
        .catch(error => {
          console.log(error);
          res.sendStatus(500);
        });
    } else {
      res.status(404).send('need token');
    }
  },
};
