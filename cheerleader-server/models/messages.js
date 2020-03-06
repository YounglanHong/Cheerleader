'use strict';
module.exports = (sequelize, DataTypes) => {
  const messages = sequelize.define(
    'messages',
    {
      inputText: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {},
  );
  messages.associate = function(models) {
    messages.belongsTo(models.users, {
      foreignKey: 'userId',
    });
    // associations can be defined here
  };

  return messages;
};
