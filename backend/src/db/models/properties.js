const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const properties = sequelize.define(
    'properties',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      address: {
        type: DataTypes.TEXT,
      },

      rent_price: {
        type: DataTypes.DECIMAL,
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

  properties.associate = (db) => {
    db.properties.belongsToMany(db.reports, {
      as: 'reports',
      foreignKey: {
        name: 'properties_reportsId',
      },
      constraints: false,
      through: 'propertiesReportsReports',
    });

    db.properties.belongsToMany(db.reports, {
      as: 'reports_filter',
      foreignKey: {
        name: 'properties_reportsId',
      },
      constraints: false,
      through: 'propertiesReportsReports',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.properties.hasMany(db.housing_transit_scores, {
      as: 'housing_transit_scores_property',
      foreignKey: {
        name: 'propertyId',
      },
      constraints: false,
    });

    db.properties.hasMany(db.reports, {
      as: 'reports_property',
      foreignKey: {
        name: 'propertyId',
      },
      constraints: false,
    });

    //end loop

    db.properties.belongsTo(db.tenants, {
      as: 'tenant',
      foreignKey: {
        name: 'tenantId',
      },
      constraints: false,
    });

    db.properties.belongsTo(db.tenants, {
      as: 'tenants',
      foreignKey: {
        name: 'tenantsId',
      },
      constraints: false,
    });

    db.properties.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.properties.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return properties;
};
