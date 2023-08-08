module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    'Hashtag',
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      charset: 'utf-8',
      collate: 'utf-8_general_ci',
    }
  );
  Hashtag.associate = (db) => {};
  return Hashtag;
};
