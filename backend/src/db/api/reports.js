const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ReportsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const reports = await db.reports.create(
      {
        id: data.id || undefined,

        title: data.title || null,
        description: data.description || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await reports.setProperty(data.property || null, {
      transaction,
    });

    await reports.setUser(data.user || null, {
      transaction,
    });

    await reports.setTenants(data.tenants || null, {
      transaction,
    });

    return reports;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const reportsData = data.map((item, index) => ({
      id: item.id || undefined,

      title: item.title || null,
      description: item.description || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const reports = await db.reports.bulkCreate(reportsData, { transaction });

    // For each item created, replace relation files

    return reports;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const reports = await db.reports.findByPk(id, {}, { transaction });

    const updatePayload = {};

    if (data.title !== undefined) updatePayload.title = data.title;

    if (data.description !== undefined)
      updatePayload.description = data.description;

    updatePayload.updatedById = currentUser.id;

    await reports.update(updatePayload, { transaction });

    if (data.property !== undefined) {
      await reports.setProperty(
        data.property,

        { transaction },
      );
    }

    if (data.user !== undefined) {
      await reports.setUser(
        data.user,

        { transaction },
      );
    }

    if (data.tenants !== undefined) {
      await reports.setTenants(
        data.tenants,

        { transaction },
      );
    }

    return reports;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const reports = await db.reports.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of reports) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of reports) {
        await record.destroy({ transaction });
      }
    });

    return reports;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const reports = await db.reports.findByPk(id, options);

    await reports.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await reports.destroy({
      transaction,
    });

    return reports;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const reports = await db.reports.findOne({ where }, { transaction });

    if (!reports) {
      return reports;
    }

    const output = reports.get({ plain: true });

    output.property = await reports.getProperty({
      transaction,
    });

    output.user = await reports.getUser({
      transaction,
    });

    output.tenants = await reports.getTenants({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    let where = {};
    const currentPage = +filter.page;

    const user = (options && options.currentUser) || null;
    const userTenants = (user && user.tenants?.id) || null;

    if (userTenants) {
      if (options?.currentUser?.tenantsId) {
        where.tenantsId = options.currentUser.tenantsId;
      }
    }

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;

    let include = [
      {
        model: db.properties,
        as: 'property',

        where: filter.property
          ? {
              [Op.or]: [
                {
                  id: {
                    [Op.in]: filter.property
                      .split('|')
                      .map((term) => Utils.uuid(term)),
                  },
                },
                {
                  address: {
                    [Op.or]: filter.property
                      .split('|')
                      .map((term) => ({ [Op.iLike]: `%${term}%` })),
                  },
                },
              ],
            }
          : {},
      },

      {
        model: db.users,
        as: 'user',

        where: filter.user
          ? {
              [Op.or]: [
                {
                  id: {
                    [Op.in]: filter.user
                      .split('|')
                      .map((term) => Utils.uuid(term)),
                  },
                },
                {
                  firstName: {
                    [Op.or]: filter.user
                      .split('|')
                      .map((term) => ({ [Op.iLike]: `%${term}%` })),
                  },
                },
              ],
            }
          : {},
      },

      {
        model: db.tenants,
        as: 'tenants',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.title) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('reports', 'title', filter.title),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('reports', 'description', filter.description),
        };
      }

      if (filter.active !== undefined) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.tenants) {
        const listItems = filter.tenants.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          tenantsId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    if (globalAccess) {
      delete where.tenantsId;
    }

    const queryOptions = {
      where,
      include,
      distinct: true,
      order:
        filter.field && filter.sort
          ? [[filter.field, filter.sort]]
          : [['createdAt', 'desc']],
      transaction: options?.transaction,
      logging: console.log,
    };

    if (!options?.countOnly) {
      queryOptions.limit = limit ? Number(limit) : undefined;
      queryOptions.offset = offset ? Number(offset) : undefined;
    }

    try {
      const { rows, count } = await db.reports.findAndCountAll(queryOptions);

      return {
        rows: options?.countOnly ? [] : rows,
        count: count,
      };
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  static async findAllAutocomplete(
    query,
    limit,
    offset,
    globalAccess,
    organizationId,
  ) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('reports', 'title', query),
        ],
      };
    }

    const records = await db.reports.findAll({
      attributes: ['id', 'title'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['title', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.title,
    }));
  }
};
