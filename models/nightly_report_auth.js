"use strict";
module.exports = (sequelize, DataTypes) => {
  var NPA = sequelize.define(
    "nightly_report_auth",
    {
      user: DataTypes.INTEGER,
      table: DataTypes.INTEGER,

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  //   Categories.associate = function(models) {
  //     Categories.belongsToMany(models.Locations, {
  //       through: "CategoriesLocations",
  //       foreignKey: "categoryId"
  //     });
  //   };
  return NPA;
};
