const express = require('express');

const Housing_transit_scoresService = require('../services/housing_transit_scores');
const Housing_transit_scoresDBApi = require('../db/api/housing_transit_scores');
const wrapAsync = require('../helpers').wrapAsync;

const config = require('../config');

const router = express.Router();

const { parse } = require('json2csv');

const { checkCrudPermissions } = require('../middlewares/check-permissions');

router.use(checkCrudPermissions('housing_transit_scores'));

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Housing_transit_scores:
 *        type: object
 *        properties:

 *          affordability_score:
 *            type: integer
 *            format: int64
 *          commute_efficiency_score:
 *            type: integer
 *            format: int64
 *          transit_reliability_score:
 *            type: integer
 *            format: int64
 *          accessibility_score:
 *            type: integer
 *            format: int64
 *          safety_infrastructure_score:
 *            type: integer
 *            format: int64
 *          overall_score:
 *            type: integer
 *            format: int64

 */

/**
 *  @swagger
 * tags:
 *   name: Housing_transit_scores
 *   description: The Housing_transit_scores managing API
 */

/**
 *  @swagger
 *  /api/housing_transit_scores:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags: [Housing_transit_scores]
 *      summary: Add new item
 *      description: Add new item
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                data:
 *                  description: Data of the updated item
 *                  type: object
 *                  $ref: "#/components/schemas/Housing_transit_scores"
 *      responses:
 *        200:
 *          description: The item was successfully added
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Housing_transit_scores"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        405:
 *          description: Invalid input data
 *        500:
 *          description: Some server error
 */
router.post(
  '/',
  wrapAsync(async (req, res) => {
    const referer =
      req.headers.referer ||
      `${req.protocol}://${req.hostname}${req.originalUrl}`;
    const link = new URL(referer);
    await Housing_transit_scoresService.create(
      req.body.data,
      req.currentUser,
      true,
      link.host,
    );
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 * @swagger
 * /api/budgets/bulk-import:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    tags: [Housing_transit_scores]
 *    summary: Bulk import items
 *    description: Bulk import items
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          properties:
 *            data:
 *              description: Data of the updated items
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/Housing_transit_scores"
 *    responses:
 *      200:
 *        description: The items were successfully imported
 *    content:
 *      application/json:
 *        schema:
 *          $ref: "#/components/schemas/Housing_transit_scores"
 *      401:
 *        $ref: "#/components/responses/UnauthorizedError"
 *      405:
 *        description: Invalid input data
 *      500:
 *        description: Some server error
 *
 */
router.post(
  '/bulk-import',
  wrapAsync(async (req, res) => {
    const referer =
      req.headers.referer ||
      `${req.protocol}://${req.hostname}${req.originalUrl}`;
    const link = new URL(referer);
    await Housing_transit_scoresService.bulkImport(req, res, true, link.host);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/housing_transit_scores/{id}:
 *    put:
 *      security:
 *        - bearerAuth: []
 *      tags: [Housing_transit_scores]
 *      summary: Update the data of the selected item
 *      description: Update the data of the selected item
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Item ID to update
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        description: Set new item data
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                id:
 *                  description: ID of the updated item
 *                  type: string
 *                data:
 *                  description: Data of the updated item
 *                  type: object
 *                  $ref: "#/components/schemas/Housing_transit_scores"
 *              required:
 *                - id
 *      responses:
 *        200:
 *          description: The item data was successfully updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Housing_transit_scores"
 *        400:
 *          description: Invalid ID supplied
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Item not found
 *        500:
 *          description: Some server error
 */
router.put(
  '/:id',
  wrapAsync(async (req, res) => {
    await Housing_transit_scoresService.update(
      req.body.data,
      req.body.id,
      req.currentUser,
    );
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 * @swagger
 *  /api/housing_transit_scores/{id}:
 *    delete:
 *      security:
 *        - bearerAuth: []
 *      tags: [Housing_transit_scores]
 *      summary: Delete the selected item
 *      description: Delete the selected item
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Item ID to delete
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: The item was successfully deleted
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Housing_transit_scores"
 *        400:
 *          description: Invalid ID supplied
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Item not found
 *        500:
 *          description: Some server error
 */
router.delete(
  '/:id',
  wrapAsync(async (req, res) => {
    await Housing_transit_scoresService.remove(req.params.id, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/housing_transit_scores/deleteByIds:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags: [Housing_transit_scores]
 *      summary: Delete the selected item list
 *      description: Delete the selected item list
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                ids:
 *                  description: IDs of the updated items
 *                  type: array
 *      responses:
 *        200:
 *          description: The items was successfully deleted
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Housing_transit_scores"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Items not found
 *        500:
 *          description: Some server error
 */
router.post(
  '/deleteByIds',
  wrapAsync(async (req, res) => {
    await Housing_transit_scoresService.deleteByIds(
      req.body.data,
      req.currentUser,
    );
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/housing_transit_scores:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Housing_transit_scores]
 *      summary: Get all housing_transit_scores
 *      description: Get all housing_transit_scores
 *      responses:
 *        200:
 *          description: Housing_transit_scores list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Housing_transit_scores"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get(
  '/',
  wrapAsync(async (req, res) => {
    const filetype = req.query.filetype;

    const globalAccess = req.currentUser.app_role.globalAccess;

    const currentUser = req.currentUser;
    const payload = await Housing_transit_scoresDBApi.findAll(
      req.query,
      globalAccess,
      { currentUser },
    );
    if (filetype && filetype === 'csv') {
      const fields = [
        'id',
        'affordability_score',
        'commute_efficiency_score',
        'transit_reliability_score',
        'accessibility_score',
        'safety_infrastructure_score',
        'overall_score',
      ];
      const opts = { fields };
      try {
        const csv = parse(payload.rows, opts);
        res.status(200).attachment(csv);
        res.send(csv);
      } catch (err) {
        console.error(err);
      }
    } else {
      res.status(200).send(payload);
    }
  }),
);

/**
 *  @swagger
 *  /api/housing_transit_scores/count:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Housing_transit_scores]
 *      summary: Count all housing_transit_scores
 *      description: Count all housing_transit_scores
 *      responses:
 *        200:
 *          description: Housing_transit_scores count successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Housing_transit_scores"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get(
  '/count',
  wrapAsync(async (req, res) => {
    const globalAccess = req.currentUser.app_role.globalAccess;

    const currentUser = req.currentUser;
    const payload = await Housing_transit_scoresDBApi.findAll(
      req.query,
      globalAccess,
      { countOnly: true, currentUser },
    );

    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/housing_transit_scores/autocomplete:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Housing_transit_scores]
 *      summary: Find all housing_transit_scores that match search criteria
 *      description: Find all housing_transit_scores that match search criteria
 *      responses:
 *        200:
 *          description: Housing_transit_scores list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Housing_transit_scores"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get('/autocomplete', async (req, res) => {
  const globalAccess = req.currentUser.app_role.globalAccess;

  const organizationId = req.currentUser.organization?.id;

  const payload = await Housing_transit_scoresDBApi.findAllAutocomplete(
    req.query.query,
    req.query.limit,
    req.query.offset,
    globalAccess,
    organizationId,
  );

  res.status(200).send(payload);
});

/**
 * @swagger
 *  /api/housing_transit_scores/{id}:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Housing_transit_scores]
 *      summary: Get selected item
 *      description: Get selected item
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of item to get
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Selected item successfully received
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Housing_transit_scores"
 *        400:
 *          description: Invalid ID supplied
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Item not found
 *        500:
 *          description: Some server error
 */
router.get(
  '/:id',
  wrapAsync(async (req, res) => {
    const payload = await Housing_transit_scoresDBApi.findBy({
      id: req.params.id,
    });

    res.status(200).send(payload);
  }),
);

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;
