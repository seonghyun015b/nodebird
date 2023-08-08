module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'Image',
    {
      src: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      charset: 'utf-8',
      collate: 'utf-8_general_ci',
    }
  );
  Image.associate = (db) => {};
  return Image;
};
