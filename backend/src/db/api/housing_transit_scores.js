const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Housing_transit_scoresDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const housing_transit_scores = await db.housing_transit_scores.create(
      {
        id: data.id || undefined,

        affordability_score: data.affordability_score || null,
        commute_efficiency_score: data.commute_efficiency_score || null,
        transit_reliability_score: data.transit_reliability_score || null,
        accessibility_score: data.accessibility_score || null,
        safety_infrastructure_score: data.safety_infrastructure_score || null,
        overall_score: data.overall_score || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await housing_transit_scores.setProperty(data.property || null, {
      transaction,
    });

    await housing_transit_scores.setTenants(data.tenants || null, {
      transaction,
    });

    return housing_transit_scores;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const housing_transit_scoresData = data.map((item, index) => ({
      id: item.id || undefined,

      affordability_score: item.affordability_score || null,
      commute_efficiency_score: item.commute_efficiency_score || null,
      transit_reliability_score: item.transit_reliability_score || null,
      accessibility_score: item.accessibility_score || null,
      safety_infrastructure_score: item.safety_infrastructure_score || null,
      overall_score: item.overall_score || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const housing_transit_scores = await db.housing_transit_scores.bulkCreate(
      housing_transit_scoresData,
      { transaction },
    );

    // For each item created, replace relation files

    return housing_transit_scores;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const housing_transit_scores = await db.housing_transit_scores.findByPk(
      id,
      {},
      { transaction },
    );

    const updatePayload = {};

    if (data.affordability_score !== undefined)
      updatePayload.affordability_score = data.affordability_score;

    if (data.commute_efficiency_score !== undefined)
      updatePayload.commute_efficiency_score = data.commute_efficiency_score;

    if (data.transit_reliability_score !== undefined)
      updatePayload.transit_reliability_score = data.transit_reliability_score;

    if (data.accessibility_score !== undefined)
      updatePayload.accessibility_score = data.accessibility_score;

    if (data.safety_infrastructure_score !== undefined)
      updatePayload.safety_infrastructure_score =
        data.safety_infrastructure_score;

    if (data.overall_score !== undefined)
      updatePayload.overall_score = data.overall_score;

    updatePayload.updatedById = currentUser.id;

    await housing_transit_scores.update(updatePayload, { transaction });

    if (data.property !== undefined) {
      await housing_transit_scores.setProperty(
        data.property,

        { transaction },
      );
    }

    if (data.tenants !== undefined) {
      await housing_transit_scores.setTenants(
        data.tenants,

        { transaction },
      );
    }

    return housing_transit_scores;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const housing_transit_scores = await db.housing_transit_scores.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of housing_transit_scores) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of housing_transit_scores) {
        await record.destroy({ transaction });
      }
    });

    return housing_transit_scores;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const housing_transit_scores = await db.housing_transit_scores.findByPk(
      id,
      options,
    );

    await housing_transit_scores.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await housing_transit_scores.destroy({
      transaction,
    });

    return housing_transit_scores;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const housing_transit_scores = await db.housing_transit_scores.findOne(
      { where },
      { transaction },
    );

    if (!housing_transit_scores) {
      return housing_transit_scores;
    }

    const output = housing_transit_scores.get({ plain: true });

    output.property = await housing_transit_scores.getProperty({
      transaction,
    });

    output.tenants = await housing_transit_scores.getTenants({
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

      if (filter.affordability_scoreRange) {
        const [start, end] = filter.affordability_scoreRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            affordability_score: {
              ...where.affordability_score,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            affordability_score: {
              ...where.affordability_score,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.commute_efficiency_scoreRange) {
        const [start, end] = filter.commute_efficiency_scoreRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            commute_efficiency_score: {
              ...where.commute_efficiency_score,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            commute_efficiency_score: {
              ...where.commute_efficiency_score,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.transit_reliability_scoreRange) {
        const [start, end] = filter.transit_reliability_scoreRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            transit_reliability_score: {
              ...where.transit_reliability_score,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            transit_reliability_score: {
              ...where.transit_reliability_score,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.accessibility_scoreRange) {
        const [start, end] = filter.accessibility_scoreRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            accessibility_score: {
              ...where.accessibility_score,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            accessibility_score: {
              ...where.accessibility_score,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.safety_infrastructure_scoreRange) {
        const [start, end] = filter.safety_infrastructure_scoreRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            safety_infrastructure_score: {
              ...where.safety_infrastructure_score,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            safety_infrastructure_score: {
              ...where.safety_infrastructure_score,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.overall_scoreRange) {
        const [start, end] = filter.overall_scoreRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            overall_score: {
              ...where.overall_score,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            overall_score: {
              ...where.overall_score,
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
      const { rows, count } = await db.housing_transit_scores.findAndCountAll(
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
          Utils.ilike('housing_transit_scores', 'overall_score', query),
        ],
      };
    }

    const records = await db.housing_transit_scores.findAll({
      attributes: ['id', 'overall_score'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['overall_score', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.overall_score,
    }));
  }
};
