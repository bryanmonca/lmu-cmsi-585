import crypto from 'crypto';
import fetch from 'node-fetch';

/**
 * Accepts a number of U.S. cents and returns an array containing,
 * the smallest number of U.S. quarters, dimes, nickels, and pennies
 */
export function change(amount) {
  if (amount < 0) {
    throw new RangeError('amount cannot be negative');
  }
  let results = [0, 0, 0, 0];
  const coins = [25, 10, 5, 1];
  for (let i = 0; i < results.length; i++) {
    results[i] = Math.floor(amount / coins[i]);
    amount = amount % coins[i];
  }
  return results;
}

/**
 * Returns a new string equal to the receiver with the
 * i-th character repeated i times
 */
export function stretched(string) {
  const withoutSpaces = string.replace(/\s/g, '');
  let stretchedString = "";
  for (let i = 0; i < withoutSpaces.length; i++) {
    stretchedString += withoutSpaces[i].repeat(i + 1);
  }
  return stretchedString;
}

/**
 * Randomly permutes a string. All possible permutations are
 * equally likely. Implementation based on Fisher-Yates shuffle.
 */
export function scramble(string) {
  const stringArray = string.split('');
  let randomIndex;
  for (let i = stringArray.length - 1; i > 0; i--) {
    randomIndex = Math.floor(Math.random() * (i + 1));
    [stringArray[randomIndex], stringArray[i]] = [stringArray[i], stringArray[randomIndex]]
  }
  return stringArray.join('');
}

/**
 * Function that yields successive powers of a base from 1 up to some 
 * limit. It consumes the values with a callback.
 */
export function powers(base, limit, callback) {
  let value = 1;
  while (value <= limit) {
    callback(value);
    value *= base;
  }
}

/**
 * Generator function that yields successive powers of a base
 * from 1 up to some limit
 */
export function* powersGenerator(base, limit) {
  let value = 1;
  while (value <= limit) {
    yield value;
    value *= base;
  }
}

/**
 * A "Chainable" function that accepts one string per call, when called 
 * without arguments, returns the strings previously passed.
 */
export function say(string) {
  if (string === undefined) { return ''; }
  return function (nextString) {
    if (nextString === undefined) { return string; }
    return say(`${string} ${nextString}`);
  }
}

/**
 * Interleaves an array with a group of values. If the array length 
 * and the number of values are not the same, the extra elements go 
 * at the end of the result.
 */
export function interleave(array, ...values) {
  const arrayLength = array.length;
  const valuesLength = values.length;
  const maxLength = Math.max(arrayLength, valuesLength);
  const results = [];
  for (let i = 0; i < maxLength; i++) {
    if (i < arrayLength) { results.push(array[i]); }
    if (i < valuesLength) { results.push(values[i]); }
  }
  return results;
}

/**
 * Encrypts and decrypts messages from UTF-8 encoding to hex or 
 * viceversa. Both functions are returned in an array.
 */
export function makeCryptoFunctions(key, algorithm, vector) {
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
 * given Pokemon of the PokeAPI. An exception is raised when 
 * response is not successful.
 */
export function pokemonSprites(pokemonName) {
  const baseURL = "https://pokeapi.co/api/v2/pokemon/"
  return fetch(baseURL + encodeURI(pokemonName))
    .then(response => response.json())
    .then(pokeSprites => pokeSprites.sprites)
    .catch(() => {
      throw new Error('Unknown Pokemon. ');
    });
}