const { messages } = require('../../models');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const secretObj = require('../../config/jwt');

module.exports = {
  get: (req, res) => {
    // let sess = req.session;
    //
    // if (sess.userid) {
    let token = req.cookies.data;
    // console.log(token);
    let decoded = jwt.verify(token, secretObj.secret);
    console.log(decoded);
    if (decoded) {
      messages
        .findOne({
          order: [[Sequelize.fn('RAND')]],
        })
        .then(data => {
          res.status(200).json({ data: data.dataValues });
        });
    }

    // } else {
    //   res.status(401).json('세션이 없습니다');
    // }
  },
};
