const numberHelper = require('./../helpers/numberHelper');


const getSubtractDataObj = (allowBorrowing, questionsDetailObj) => {
    const minuend = numberHelper.getRandomNumber(questionsDetailObj.minuend_digits);
    let options;
    let subtrahend = 0;

    if (allowBorrowing) {
        subtrahend = numberHelper.getRandomNumber(questionsDetailObj.subtrahend_digits
            , minuend);
    } else {
        let baseNumber = minuend;
        let x = 0;

        while (baseNumber > 0
            && subtrahend.toString().length < questionsDetailObj.subtrahend_digits) {
            const remainder = baseNumber % 10;
            let rand = numberHelper.getRandomNumber(1, remainder);
            for (let i = 0; i < x; i += 1) {
                rand *= 10;
            }
            subtrahend += rand;
            x += 1;
            baseNumber = Math.floor(baseNumber / 10);
        }
    }

    const correctAnswer = minuend - subtrahend;
    options = numberHelper.getOptions(questionsDetailObj.minuend_digits,
        correctAnswer, minuend);

    return { minuend, subtrahend, correctAnswer, options };
}

module.exports = {
    /**
     * 
     * @param {*} body 
     * @returns 
     */
    getSubtractionData(body) {
        const subtractionData = [];
        const { allowBorrowing, numberOfQuestions, questionsDetails } = body;

        for (let i = 0; i < numberOfQuestions; i += 1) {
            subtractionData.push(getSubtractDataObj(allowBorrowing, questionsDetails[i]));
        }


        return subtractionData;
    },
};
