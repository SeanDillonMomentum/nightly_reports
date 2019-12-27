"use strict";
module.exports = (sequelize, DataTypes) => {
  var NightlySa = sequelize.define(
    "nightly_sa_report",
    {
      customerName: DataTypes.STRING,
      customerAddress: DataTypes.STRING,
      opportunityNumber: DataTypes.STRING,
      jobType: DataTypes.STRING,
      date: DataTypes.STRING,
      siteAssessor: DataTypes.STRING,
      sp: DataTypes.STRING,
      os: DataTypes.STRING,
      winterSolstice: DataTypes.INTEGER,
      totalInterior: DataTypes.STRING,
      totalExterior: DataTypes.STRING,
      saComplete: DataTypes.INTEGER,
      notes: DataTypes.STRING,
      submittedBy: DataTypes.INTEGER,

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
  return NightlySa;
};
