const { users } = require('../../models');
const jwt = require('jsonwebtoken');
const secretObj = require('../../config/jwt');
const jwtBlacklist = require('jwt-blacklist')(jwt);

module.exports = {
  post: (req, res) => {
    let token = req.cookies.data;
    // console.log(token);
    let decoded = jwt.verify(token, secretObj.secret);
    if (decoded) {
      jwtBlacklist.blacklist(token);
      res.send('토큰을 블랙리스트로!');
      jwtBlacklist.verify(token, secretObj.secret);
    }
  },
};
