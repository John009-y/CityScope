const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class DiscussionsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const discussions = await db.discussions.create(
      {
        id: data.id || undefined,

        topic: data.topic || null,
        content: data.content || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await discussions.setTenants(data.tenants || null, {
      transaction,
    });

    return discussions;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const discussionsData = data.map((item, index) => ({
      id: item.id || undefined,

      topic: item.topic || null,
      content: item.content || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const discussions = await db.discussions.bulkCreate(discussionsData, {
      transaction,
    });

    // For each item created, replace relation files

    return discussions;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const discussions = await db.discussions.findByPk(id, {}, { transaction });

    const updatePayload = {};

    if (data.topic !== undefined) updatePayload.topic = data.topic;

    if (data.content !== undefined) updatePayload.content = data.content;

    updatePayload.updatedById = currentUser.id;

    await discussions.update(updatePayload, { transaction });

    if (data.tenants !== undefined) {
      await discussions.setTenants(
        data.tenants,

        { transaction },
      );
    }

    return discussions;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const discussions = await db.discussions.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of discussions) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of discussions) {
        await record.destroy({ transaction });
      }
    });

    return discussions;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const discussions = await db.discussions.findByPk(id, options);

    await discussions.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await discussions.destroy({
      transaction,
    });

    return discussions;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const discussions = await db.discussions.findOne(
      { where },
      { transaction },
    );

    if (!discussions) {
      return discussions;
    }

    const output = discussions.get({ plain: true });

    output.tenants = await discussions.getTenants({
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

      if (filter.topic) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('discussions', 'topic', filter.topic),
        };
      }

      if (filter.content) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('discussions', 'content', filter.content),
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
      const { rows, count } = await db.discussions.findAndCountAll(
        queryOptions,
      );

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
          Utils.ilike('discussions', 'topic', query),
        ],
      };
    }

    const records = await db.discussions.findAll({
      attributes: ['id', 'topic'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['topic', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.topic,
    }));
  }
};
