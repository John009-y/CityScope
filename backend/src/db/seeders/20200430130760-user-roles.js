const { v4: uuid } = require('uuid');

module.exports = {
  /**
   * @param{import("sequelize").QueryInterface} queryInterface
   * @return {Promise<void>}
   */
  async up(queryInterface) {
    const createdAt = new Date();
    const updatedAt = new Date();

    /** @type {Map<string, string>} */
    const idMap = new Map();

    /**
     * @param {string} key
     * @return {string}
     */
    function getId(key) {
      if (idMap.has(key)) {
        return idMap.get(key);
      }
      const id = uuid();
      idMap.set(key, id);
      return id;
    }

    await queryInterface.bulkInsert('roles', [
      {
        id: getId('SuperAdmin'),
        name: 'Super Administrator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('Administrator'),
        name: 'Administrator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('SystemManager'),
        name: 'System Manager',
        createdAt,
        updatedAt,
      },

      {
        id: getId('UrbanPlanner'),
        name: 'Urban Planner',
        createdAt,
        updatedAt,
      },

      {
        id: getId('CommunityLiaison'),
        name: 'Community Liaison',
        createdAt,
        updatedAt,
      },

      {
        id: getId('ResidentAdvocate'),
        name: 'Resident Advocate',
        createdAt,
        updatedAt,
      },

      { id: getId('GeneralUser'), name: 'General User', createdAt, updatedAt },
    ]);

    /**
     * @param {string} name
     */
    function createPermissions(name) {
      return [
        {
          id: getId(`CREATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `CREATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`READ_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `READ_${name.toUpperCase()}`,
        },
        {
          id: getId(`UPDATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `UPDATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`DELETE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `DELETE_${name.toUpperCase()}`,
        },
      ];
    }

    const entities = [
      'users',
      'discussions',
      'housing_transit_scores',
      'properties',
      'reports',
      'roles',
      'permissions',
      'tenants',
      ,
    ];
    await queryInterface.bulkInsert(
      'permissions',
      entities.flatMap(createPermissions),
    );
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`READ_API_DOCS`),
        createdAt,
        updatedAt,
        name: `READ_API_DOCS`,
      },
    ]);
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`CREATE_SEARCH`),
        createdAt,
        updatedAt,
        name: `CREATE_SEARCH`,
      },
    ]);

    await queryInterface.bulkUpdate(
      'roles',
      { globalAccess: true },
      { id: getId('SuperAdmin') },
    );

    await queryInterface.sequelize
      .query(`create table "rolesPermissionsPermissions"
(
"createdAt"           timestamp with time zone not null,
"updatedAt"           timestamp with time zone not null,
"roles_permissionsId" uuid                     not null,
"permissionId"        uuid                     not null,
primary key ("roles_permissionsId", "permissionId")
);`);

    await queryInterface.bulkInsert('rolesPermissionsPermissions', [
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('UrbanPlanner'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CommunityLiaison'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ResidentAdvocate'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('GeneralUser'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_DISCUSSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_DISCUSSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_DISCUSSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_DISCUSSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('UrbanPlanner'),
        permissionId: getId('CREATE_DISCUSSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('UrbanPlanner'),
        permissionId: getId('READ_DISCUSSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('UrbanPlanner'),
        permissionId: getId('UPDATE_DISCUSSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CommunityLiaison'),
        permissionId: getId('CREATE_DISCUSSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CommunityLiaison'),
        permissionId: getId('READ_DISCUSSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CommunityLiaison'),
        permissionId: getId('UPDATE_DISCUSSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ResidentAdvocate'),
        permissionId: getId('READ_DISCUSSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ResidentAdvocate'),
        permissionId: getId('UPDATE_DISCUSSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('GeneralUser'),
        permissionId: getId('READ_DISCUSSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_HOUSING_TRANSIT_SCORES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_HOUSING_TRANSIT_SCORES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_HOUSING_TRANSIT_SCORES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_HOUSING_TRANSIT_SCORES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('UrbanPlanner'),
        permissionId: getId('READ_HOUSING_TRANSIT_SCORES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('UrbanPlanner'),
        permissionId: getId('UPDATE_HOUSING_TRANSIT_SCORES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CommunityLiaison'),
        permissionId: getId('READ_HOUSING_TRANSIT_SCORES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ResidentAdvocate'),
        permissionId: getId('READ_HOUSING_TRANSIT_SCORES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('GeneralUser'),
        permissionId: getId('READ_HOUSING_TRANSIT_SCORES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_PROPERTIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_PROPERTIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_PROPERTIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_PROPERTIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('UrbanPlanner'),
        permissionId: getId('READ_PROPERTIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('UrbanPlanner'),
        permissionId: getId('UPDATE_PROPERTIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CommunityLiaison'),
        permissionId: getId('READ_PROPERTIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ResidentAdvocate'),
        permissionId: getId('READ_PROPERTIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('GeneralUser'),
        permissionId: getId('READ_PROPERTIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('UrbanPlanner'),
        permissionId: getId('READ_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('UrbanPlanner'),
        permissionId: getId('UPDATE_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CommunityLiaison'),
        permissionId: getId('READ_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CommunityLiaison'),
        permissionId: getId('UPDATE_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ResidentAdvocate'),
        permissionId: getId('READ_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ResidentAdvocate'),
        permissionId: getId('UPDATE_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('GeneralUser'),
        permissionId: getId('READ_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('UrbanPlanner'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CommunityLiaison'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('ResidentAdvocate'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('GeneralUser'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_DISCUSSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_DISCUSSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_DISCUSSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_DISCUSSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_HOUSING_TRANSIT_SCORES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_HOUSING_TRANSIT_SCORES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_HOUSING_TRANSIT_SCORES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_HOUSING_TRANSIT_SCORES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_PROPERTIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_PROPERTIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_PROPERTIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_PROPERTIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_REPORTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_REPORTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_REPORTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_DISCUSSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_DISCUSSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_DISCUSSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_DISCUSSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_HOUSING_TRANSIT_SCORES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_HOUSING_TRANSIT_SCORES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_HOUSING_TRANSIT_SCORES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_HOUSING_TRANSIT_SCORES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_PROPERTIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_PROPERTIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_PROPERTIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_PROPERTIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_REPORTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_REPORTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_REPORTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_ROLES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_PERMISSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_TENANTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_TENANTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_TENANTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_TENANTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SEARCH'),
      },
    ]);

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'SuperAdmin',
      )}' WHERE "email"='super_admin@flatlogic.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'Administrator',
      )}' WHERE "email"='admin@flatlogic.com'`,
    );

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'SystemManager',
      )}' WHERE "email"='client@hello.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'UrbanPlanner',
      )}' WHERE "email"='john@doe.com'`,
    );
  },
};
