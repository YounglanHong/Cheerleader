const { users } = require('../../models');

module.exports = {
  post: (req, res) => {
    const { email, username, password } = req.body;

    users
      .findOne({
        where: {
          email: email,
          username: username,
          password: password,
        },
      })
      .then(data => {
        if (data) {
          res.status(409).send('이미 가입한 유저입니다');
        } else {
          users
            .create({
              email: email,
              username: username,
              password: password,
            })
            .then(result => {
              if (result) res.send(result.dataValues);
            })
            .catch(error => {
              console.log(error);
              res.sendStatus(500);
            });
        }
      });
  },
};
