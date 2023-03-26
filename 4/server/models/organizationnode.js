"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrganizationNode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrganizationNode.belongsTo(models.User);
    }
  }
  OrganizationNode.init(
    {
      label: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {msg: "Label is required"},
          notEmpty: {msg: "Label cannot be empty"},
        },
      },
      parent: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrganizationNode",
    }
  );
  return OrganizationNode;
};
