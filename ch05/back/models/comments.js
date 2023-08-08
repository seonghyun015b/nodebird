module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: 'utf-8',
      collate: 'utf-8_general_ci',
    }
  );
  Comment.associate = (db) => {};
  return Comment;
};
