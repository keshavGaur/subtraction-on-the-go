/**
 * return random number with given number of digits
 * @param {*} numberOfDigits 
 */
const getRandomNumber = (numberOfDigits, maxLimit = null, options = null, correctAnswer = null, rangeNumber = null) => {
    let max = 1;
    let min = 0;

    for (i = 0; i < numberOfDigits; i++) {
        max *= 10;
    }

    min = max / 10;

    if (maxLimit !== null && maxLimit < max) {
        max = maxLimit
    }

    if (rangeNumber && correctAnswer) {
        max = Math.min(max, correctAnswer + rangeNumber);
        min = Math.max(min, correctAnswer - rangeNumber);
    }
    let randomNumber = Math.floor(min + (max - min) * Math.random());

    if (options !== null) {
        while (options.includes(randomNumber)) {
            randomNumber = Math.floor(min + (max - min) * Math.random());
        }
    }

    return randomNumber;
}

const shuffle = (array) => {
    var currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

const getOptions = (numberOfDigits, correctAnswer, minuend) => {
    const options = [];
    let rangeNumber = 5;
    options.push(correctAnswer);

    for (let i = 1; i < numberOfDigits-1; i += 1) {
        rangeNumber *= 10;
    }
    options.push(getRandomNumber(numberOfDigits, null, options, correctAnswer, rangeNumber));
    options.push(getRandomNumber(numberOfDigits, null, options, correctAnswer, rangeNumber));
    options.push(getRandomNumber(numberOfDigits, null, options, correctAnswer, rangeNumber));

    return shuffle(options);
}

module.exports = {
    getRandomNumber,
    getOptions,
}