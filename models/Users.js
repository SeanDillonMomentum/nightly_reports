"use strict";
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "nightly_report_users",
    {
      user: DataTypes.STRING,

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      // I porpose an associaion as started below
      tables: DataTypes.INTEGER
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  //   Users.associate = function(models) {
  //     console.log("models", models);
  //     Users.belongsToMany(models.nightly_report_auth, {
  //       // example code below
  //       //   through: "CategoriesLocations",
  //       //   foreignKey: "categoryId"
  //     });
  //   };
  return Users;
};
