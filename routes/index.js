const express = require('express');

const router = express.Router();

router.use('/subtract', require('./subtract'));

module.exports = router;


// global swagger schema defs
/**
 * @swagger
 * definition:
 *   errorSchema:
 *     properties:
 *       errorCode:
 *         type: string
 *       message:
 *         type: string
 *       details:
 *         description: Error details
 *         type: object
 */
