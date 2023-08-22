const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Comment extends Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        modelName: 'Comment',
        tableName: 'comments',
        charset: 'utf-8',
        collate: 'utf8_general_ci',
        sequelize,
      }
    );
  }
  static associate(db) {}
};
