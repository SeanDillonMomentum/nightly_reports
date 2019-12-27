"use strict";
module.exports = (sequelize, DataTypes) => {
  var NightlyIm = sequelize.define(
    "nightly_im_report",
    {
      customerName: DataTypes.STRING,
      customerAddress: DataTypes.STRING,
      opportunityNumber: DataTypes.STRING,
      jobType: DataTypes.STRING,
      date: DataTypes.STRING,
      foreman: DataTypes.STRING,
      crewDesignator: DataTypes.STRING,
      siteAssessor: DataTypes.STRING,
      sp: DataTypes.STRING,
      os: DataTypes.STRING,
      crewCount: DataTypes.INTEGER,
      electricalTotalHours: DataTypes.STRING,
      installationTotalHours: DataTypes.STRING,
      roundTripTotalHours: DataTypes.STRING,
      correctPic: DataTypes.INTEGER,
      onsiteRevision: DataTypes.INTEGER,
      salesRepVisit: DataTypes.INTEGER,
      faOnSite: DataTypes.INTEGER,
      panelType: DataTypes.STRING,
      panelCount: DataTypes.INTEGER,
      dcSize: DataTypes.STRING,
      panelsInstalled: DataTypes.INTEGER,
      constructionComplete: DataTypes.INTEGER,
      notes: DataTypes.STRING,
      office: DataTypes.STRING,
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
  return NightlyIm;
};
