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

export function stretched(stringToStretch) {
    const stringNoSpace = stringToStretch.replace(/\s/g, '');
    let stretchedString = "";
    for (let i = 0; i < stringNoSpace.length; i++) {
        stretchedString += stringNoSpace[i].repeat(i + 1);
    }
    return stretchedString;
}

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

export function* powersGenerator(base, limit) {
    let value = 1;
    while (value <= limit) {
        yield value;
        value *= base;
    }
}

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