const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class PropertiesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const properties = await db.properties.create(
      {
        id: data.id || undefined,

        address: data.address || null,
        rent_price: data.rent_price || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await properties.setTenant(data.tenant || null, {
      transaction,
    });

    await properties.setTenants(data.tenants || null, {
      transaction,
    });

    await properties.setReports(data.reports || [], {
      transaction,
    });

    return properties;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const propertiesData = data.map((item, index) => ({
      id: item.id || undefined,

      address: item.address || null,
      rent_price: item.rent_price || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const properties = await db.properties.bulkCreate(propertiesData, {
      transaction,
    });

    // For each item created, replace relation files

    return properties;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const properties = await db.properties.findByPk(id, {}, { transaction });

    const updatePayload = {};

    if (data.address !== undefined) updatePayload.address = data.address;

    if (data.rent_price !== undefined)
      updatePayload.rent_price = data.rent_price;

    updatePayload.updatedById = currentUser.id;

    await properties.update(updatePayload, { transaction });

    if (data.tenant !== undefined) {
      await properties.setTenant(
        data.tenant,

        { transaction },
      );
    }

    if (data.tenants !== undefined) {
      await properties.setTenants(
        data.tenants,

        { transaction },
      );
    }

    if (data.reports !== undefined) {
      await properties.setReports(data.reports, { transaction });
    }

    return properties;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const properties = await db.properties.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of properties) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of properties) {
        await record.destroy({ transaction });
      }
    });

    return properties;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const properties = await db.properties.findByPk(id, options);

    await properties.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await properties.destroy({
      transaction,
    });

    return properties;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const properties = await db.properties.findOne({ where }, { transaction });

    if (!properties) {
      return properties;
    }

    const output = properties.get({ plain: true });

    output.housing_transit_scores_property =
      await properties.getHousing_transit_scores_property({
        transaction,
      });

    output.reports_property = await properties.getReports_property({
      transaction,
    });

    output.tenant = await properties.getTenant({
      transaction,
    });

    output.reports = await properties.getReports({
      transaction,
    });

    output.tenants = await properties.getTenants({
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
        as: 'tenant',
      },

      {
        model: db.tenants,
        as: 'tenants',
      },

      {
        model: db.reports,
        as: 'reports',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.address) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('properties', 'address', filter.address),
        };
      }

      if (filter.rent_priceRange) {
        const [start, end] = filter.rent_priceRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            rent_price: {
              ...where.rent_price,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            rent_price: {
              ...where.rent_price,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.active !== undefined) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.tenant) {
        const listItems = filter.tenant.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          tenantId: { [Op.or]: listItems },
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

      if (filter.reports) {
        const searchTerms = filter.reports.split('|');

        include = [
          {
            model: db.reports,
            as: 'reports_filter',
            required: searchTerms.length > 0,
            where:
              searchTerms.length > 0
                ? {
                    [Op.or]: [
                      {
                        id: {
                          [Op.in]: searchTerms.map((term) => Utils.uuid(term)),
                        },
                      },
                      {
                        title: {
                          [Op.or]: searchTerms.map((term) => ({
                            [Op.iLike]: `%${term}%`,
                          })),
                        },
                      },
                    ],
                  }
                : undefined,
          },
          ...include,
        ];
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
      const { rows, count } = await db.properties.findAndCountAll(queryOptions);

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
          Utils.ilike('properties', 'address', query),
        ],
      };
    }

    const records = await db.properties.findAll({
      attributes: ['id', 'address'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['address', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.address,
    }));
  }
};
