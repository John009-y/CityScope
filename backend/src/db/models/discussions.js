const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const discussions = sequelize.define(
    'discussions',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      topic: {
        type: DataTypes.TEXT,
      },

      content: {
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

  discussions.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.discussions.belongsTo(db.tenants, {
      as: 'tenants',
      foreignKey: {
        name: 'tenantsId',
      },
      constraints: false,
    });

    db.discussions.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.discussions.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return discussions;
};
