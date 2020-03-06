const { messages } = require('../../models');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const secretObj = require('../../config/jwt');

module.exports = {
  get: (req, res) => {
    let token = req.cookies.data;
    let decoded = jwt.verify(token, secretObj.secret);
    if (decoded) {
      //   console.log(decoded);
      messages
        .findAll({
          where: {
            userId: decoded.userid,
          },
        })
        .then(data => {
          //   console.log(data);
          res.json(data);
        });
    }
  },
};
