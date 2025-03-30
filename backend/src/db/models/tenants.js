const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const tenants = sequelize.define(
    'tenants',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
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

  tenants.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.tenants.hasMany(db.users, {
      as: 'users_tenants',
      foreignKey: {
        name: 'tenantsId',
      },
      constraints: false,
    });

    db.tenants.hasMany(db.discussions, {
      as: 'discussions_tenants',
      foreignKey: {
        name: 'tenantsId',
      },
      constraints: false,
    });

    db.tenants.hasMany(db.housing_transit_scores, {
      as: 'housing_transit_scores_tenants',
      foreignKey: {
        name: 'tenantsId',
      },
      constraints: false,
    });

    db.tenants.hasMany(db.properties, {
      as: 'properties_tenant',
      foreignKey: {
        name: 'tenantId',
      },
      constraints: false,
    });

    db.tenants.hasMany(db.properties, {
      as: 'properties_tenants',
      foreignKey: {
        name: 'tenantsId',
      },
      constraints: false,
    });

    db.tenants.hasMany(db.reports, {
      as: 'reports_tenants',
      foreignKey: {
        name: 'tenantsId',
      },
      constraints: false,
    });

    //end loop

    db.tenants.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.tenants.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return tenants;
};
