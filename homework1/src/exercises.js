/**
 * Accepts a number of U.S cents and returns an array containing
 * the smallest number of quarters, dimes, nickels and pennies.
 * @param amount the amount to be converted to coins
 * @returns array containing the respective number
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
 * @param stringToStretch String to be transformed
 * @returns stretched string
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
 * @param stringToScramble string to be transformed
 * @returns string scrambled 
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
 * @param base power will be obtained from this number
 * @param limit maximum power of a base
 * @param callback asynchronous function
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
 * @param base power will be obtained from this number
 * @param limit maximum power of a base
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
 * @param array to be interleaved
 * @param otherParams values to be interleaved with array
 * @returns interleaved array
 */
export function interleave(array, ...otherParams) {
    const arrayOtherParams = [...otherParams];
    const interleavedArray = [];
    const minLength = Math.min(array.length, arrayOtherParams.length)

    for (let i = 0; i < minLength; i++) {
        interleavedArray.push(array[i], arrayOtherParams[i]);
    }

    const lengthDifference = array.length - arrayOtherParams.length;
    if (lengthDifference < 0) {
        interleavedArray.push(...arrayOtherParams.slice(minLength, arrayOtherParams.length));
    }
    else if (lengthDifference > 0) {
        interleavedArray.push(...array.slice(minLength, array.length));
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

/**
 * Returns a promise that resolves to all of the sprites for a 
 * given Pokemon of the PokeAPI.
 * @param pokemonName name of the Pokemon
 * @returns promise resolves to a JS object with the sprite
 * data from the API call
 */
export function pokemonSprites(pokemonName) {
    const fetch = require('node-fetch');
    const pokemon = "https://pokeapi.co/api/v2/pokemon/" + pokemonName;
    return fetch(pokemon)  // return this promise
        .then(response => response.json())
        .then(pokeSprites => pokeSprites.sprites)
        .catch(() => {
            throw new Error('Unknown Pokemon. ');
        });
}