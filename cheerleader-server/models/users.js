'use strict';

const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (data, options) => {
          var shasum = crypto.createHmac('sha512', 'helloworld');
          shasum.update(data.password);
          data.password = shasum.digest('hex');
          // console.dir(data.password);
        },
        beforeFind: (data, options) => {
          if (data.where.password) {
            var shasum = crypto.createHmac('sha512', 'helloworld');
            shasum.update(data.where.password);
            data.where.password = shasum.digest('hex');
            // console.log(data.where.password)
          }
        },
      },
    },
  );
  users.associate = function(models) {
    users.hasMany(models.messages);
    // associations can be defined here
  };
  return users;
};
