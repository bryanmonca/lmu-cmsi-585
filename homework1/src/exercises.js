/**
 * Accepts a number of U.S cents and returns an array containing
 * the smallest number of quarters, dimes, nickels and pennies.
 * @param {number} amount the amount to be converted to coins
 * @returns {array} array containing the respective number
 * of quarters, dimes, nickels and pennies.
 */
export function change(amount) {
    if (amount < 0) {
        throw new RangeError('amount cannot be negative');
    }
    let resultArray = [0, 0, 0, 0];
    const coins = [25, 10, 5, 1];
    let currentAmount = amount;
    for (let i = 0; i < resultArray.length; i++) {
        resultArray[i] = Math.trunc(currentAmount / coins[i]);
        currentAmount = currentAmount % coins[i];
    }
    return resultArray;
}

/**
 * Accepts a string and returns a new string equal to the initial
 * string with all whitespace removed and ith character repeated
 * i times.
 * @param {string} stringToStretch String to be transformed
 * @returns {string} stretched string
 */
export function stretched(stringToStretch) {
    const stringNoSpace = stringToStretch.replace(/\s/g, '');
    let stretchedString = "";
    for (let i = 0; i < stringNoSpace.length; i++) {
        stretchedString += stringNoSpace[i].repeat(i + 1);
    }
    return stretchedString;
}

/**
 * Randomly permutes a string. All possible permutations are
 * equally likely.
 * @param {string} stringToScramble string to be transformed
 * @returns {string} string scrambled 
 */
export function scramble(stringToScramble) {
    const arrayString = Array.from(stringToScramble);
    let randomInt, temp;
    for (let i = arrayString.length - 1; i > 0; i--) {
        randomInt = Math.floor(Math.random() * (i + 1));    // random int [0, i]
        temp = arrayString[randomInt];
        arrayString[randomInt] = arrayString[i];
        arrayString[i] = temp;
    }
    const stringScrambled = arrayString.join('');
    return stringScrambled;
}

/**
 * Yields successive powers of a base from 1 up to some limit.
 * It consumes the values with a callback.
 * @param {number} base power will be obtained from this number
 * @param {number} limit maximum power of a base
 * @param {function} callback asynchronous function
 */
export function powers(base, limit, callback) {
    if (limit <= 0) {
        return;
    }

    let value = 1;
    while (value <= limit) {
        callback(value);
        value *= base;
    }
}

/**
 * Generator function that yields successive powers of a base
 * from 1 up to some limit
 * @param {number} base power will be obtained from this number
 * @param {number} limit maximum power of a base
 */
export function* powersGenerator(base, limit) {
    let value = 1;
    while (value <= limit) {
        yield value;
        value *= base;
    }
}

/**
 * "Chainable" function that accepts one string per call.
 * When called without arguments, returns the words previously
 * passed, in order, separated by a single space.
 */
export function say(currentString) {
    if (currentString === undefined) {
        return '';
    }
    else {
        return function (nextString) {
            if (nextString === undefined) {
                return currentString;
            }
            else {
                return say(`${currentString} ${nextString}`);
            }
        }
    }
}

/**
 * Interleaves an array with other values. Extra elements should 
 * end up at the end of the result.
 * @param {array} array to be interleaved
 * @param  {...any} otherParams values to be interleaved with array
 * @returns {array} interleaved array
 */
export function interleave(array, ...otherParams) {
    const arrayOtherParams = [...otherParams];
    const interleavedArray = [];
    const lengthDifference = array.length - arrayOtherParams.length;
    if (lengthDifference < 0) {
        let i;
        for (i = 0; i < array.length; i++) {
            interleavedArray.push(array[i], arrayOtherParams[i]);
        }
        for (i; i < arrayOtherParams.length; i++) {
            interleavedArray.push(arrayOtherParams[i]);
        }
    } else if (lengthDifference > 0) {
        let i;
        for (i = 0; i < arrayOtherParams.length; i++) {
            interleavedArray.push(array[i], arrayOtherParams[i]);
        }
        for (i; i < array.length; i++) {
            interleavedArray.push(array[i]);
        }
    } else {
        for (let i = 0; i < array.length; i++) {
            interleavedArray.push(array[i], arrayOtherParams[i]);
        }
    }

    return interleavedArray;
}

/**
 * Encrypts and decrypts messages. Returns two functions in
 * an array. The first one is an encrypt function, the second one
 * a decrypt function.
 */
export function makeCryptoFunctions(key, algorithm, vector) {
    const crypto = require('crypto');
    const encrypt = (data) => {
        const cipher = crypto.createCipheriv(algorithm, key, vector);
        const encrypted = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
        return encrypted;
    };
    const decrypt = (data) => {
        const decipher = crypto.createDecipheriv(algorithm, key, vector);
        const decrypted = decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
        return decrypted;
    };
    return [encrypt, decrypt];
}