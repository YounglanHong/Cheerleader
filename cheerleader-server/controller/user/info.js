const { users } = require('../../models');
const jwt = require('jsonwebtoken');
const secretObj = require('../../config/jwt');

module.exports = {
  get: (req, res) => {
    let token = req.cookies.data;
    // console.log(token);
    let decoded = jwt.verify(token, secretObj.secret);
    if (decoded) {
      users
        .findOne({
          where: {
            email: decoded.email,
          },
        })
        .then(data => {
          res.json(data.dataValues);
        });
    }
  },
};
