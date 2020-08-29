const { users } = require('../../models');
const jwt = require('jsonwebtoken');
const secretObj = require('../../config/jwt');
const crypto = require('crypto');

module.exports = {
  post: (req, res) => {
    // var shasum = crypto.createHmac('sha512', 'helloworld');
    // shasum.update(data.password);
    // data.password = shasum.digest('hex');
    let token = req.cookies.data;
    // console.log(token);
    let decoded = jwt.verify(token, secretObj.secret);
    console.log(decoded);
    const { email, username, password } = req.body;
    let hashing = crypto
      .createHmac('sha512', 'helloworld')
      .update(`${password}`)
      .digest('hex');
    if (decoded) {
      users
        .update(
          {
            email: email,
            username: username,
            password: hashing,
          },
          {
            where: {
              id: decoded.userid,
            },
          },
        )
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          console.log('데이터 수정 실패');
        });
    }
  },
};
