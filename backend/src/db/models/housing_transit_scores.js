const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const housing_transit_scores = sequelize.define(
    'housing_transit_scores',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      affordability_score: {
        type: DataTypes.INTEGER,
      },

      commute_efficiency_score: {
        type: DataTypes.INTEGER,
      },

      transit_reliability_score: {
        type: DataTypes.INTEGER,
      },

      accessibility_score: {
        type: DataTypes.INTEGER,
      },

      safety_infrastructure_score: {
        type: DataTypes.INTEGER,
      },

      overall_score: {
        type: DataTypes.INTEGER,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  housing_transit_scores.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.housing_transit_scores.belongsTo(db.properties, {
      as: 'property',
      foreignKey: {
        name: 'propertyId',
      },
      constraints: false,
    });

    db.housing_transit_scores.belongsTo(db.tenants, {
      as: 'tenants',
      foreignKey: {
        name: 'tenantsId',
      },
      constraints: false,
    });

    db.housing_transit_scores.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.housing_transit_scores.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return housing_transit_scores;
};
