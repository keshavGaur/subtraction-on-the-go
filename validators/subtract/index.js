const Joi = require('joi');
const HttpError = require('standard-http-error');
const HttpStatusCode = { ...HttpError };

const itemValidator = Joi.object().keys({
    minuend_digits: Joi.number().min(1).required(),
    subtrahend_digits: Joi.number().min(1).required(),
});

/**
 * Joi Object Schema for validation
 */
const requestValidatorGet = {
    options: {
        flatten: true,
        status: 400,
        allowUnknownBody: false,
    },
    headers: Joi.object({
        'x-method-override': Joi.string().valid('get').required(),
    }),
    body: Joi.object({
        numberOfQuestions: Joi.number()
            .min(1).required(),
        questionsDetails: Joi.array()
            .items(itemValidator).min(1).required(),
        allowBorrowing: Joi.boolean().required(),
    }).required(),
};

const customValidationGet = (req, res, next) => {
    if (req.body.numberOfQuestions !== req.body.questionsDetails.length) {
        throw new HttpError(HttpStatusCode.BAD_REQUEST,
            'Input Validation Failed',
            {
                stack: null,
                details: { error: "questionsDetails length should be equal to numberOfQuestions" },
                errorCode: 'INVALID_INPUT',
            });
    }
    const wrongData = req.body.questionsDetails.find(x => x.minuend_digits < x.subtrahend_digits);
    if (wrongData) {
        throw new HttpError(HttpStatusCode.BAD_REQUEST,
            'Input Validation Failed',
            {
                stack: null,
                details: { error: "subtrahend_digits cannot be greater than minuend_digits" },
                errorCode: 'INVALID_INPUT',
            });
    }

    next();
}

module.exports = {
    requestValidatorGet,
    customValidationGet,
}