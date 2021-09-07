const express = require('express');
const validate = require('express-validation');
const HttpError = require('standard-http-error');

const router = express.Router();

const HttpStatusCode = { ...HttpError };
const logger = require('./../../logger');
const subtractValidators = require('./../../validators/subtract');
const { subtractService } = require('./../../services');

/**
 * @swagger
 * /subtract:
 *   post:
 *     tags:
 *       - Math Operations
 *     description: Returns the questions and choices for subtraction
 *     parameters:
 *      - in: header
 *        name: x-method-override
 *        default: get
 *        schema:
 *          type: string
 *      - in: body
 *        name: operation details
 *        description: subtraction details body.
 *        schema:
 *          type: object
 *          properties:
 *            numberOfQuestions:
 *              type: integer
 *            questionsDetails:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  minuend_digits:
 *                    type: integer
 *                  subtrahend_digits:
 *                    type: integer
 *            allowBorrowing:
 *              type: boolean
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: question and choices for subtraction
 *       400:
 *         description: Bad request
 *         schema:
 *           type: object
 *           $ref: '#/definitions/errorSchema'
 *       406:
 *         description: Invalid 'ACCEPT' HEADERS
 *         schema:
 *           type: object
 *           $ref: '#/definitions/errorSchema'
 *       500:
 *         description: Server Error
 *         schema:
 *           type: object
 *           $ref: '#/definitions/errorSchema'
 */

router.post('/', validate(subtractValidators.requestValidatorGet),
    subtractValidators.customValidationGet, (req, res, next) => {
        try {
            const data = subtractService.getSubtractionData(req.body);

            res.status(200).send(data);
        } catch (e) {
            logger.error(e);

            next(new HttpError(HttpStatusCode.INTERNAL_SERVER_ERROR, { stack: e }));
        }
    });

module.exports = router;
