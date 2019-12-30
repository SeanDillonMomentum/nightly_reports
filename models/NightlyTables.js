"use strict";
module.exports = (sequelize, DataTypes) => {
  const Tables = sequelize.define(
    "nightly_report_tables",
    {
      table_type: DataTypes.STRING,

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      }
      // I porpose an associaion as started below
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  Tables.associate = function(models) {
    Tables.belongsToMany(models.nightly_report_users, {
      through: "nightly_report_auth",
      foreignKey: "table"
    });
  };
  //   Tables.associate = function(models) {
  //     console.log("models", models);
  //     Tables.belongsToMany(models.nightly_report_auth, {
  //       // example code below
  //       //   through: "CategoriesLocations",
  //       //   foreignKey: "categoryId"
  //     });
  //   };
  return Tables;
};
