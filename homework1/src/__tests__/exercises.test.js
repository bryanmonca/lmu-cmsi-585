import { ok, deepEqual, match, throws, fail } from 'assert';
import { randomBytes } from 'crypto';
import {
    change,
    stretched,
    scramble,
    say,
    powers,
    interleave,
    powersGenerator,
    makeCryptoFunctions,
    //pokemonSprites,
} from '../exercises';

describe('change', () => {
    it('handles zero', () => {
        deepEqual(change(0), [0, 0, 0, 0]);
    });

    it('computes answers for small integer values fine', () => {
        deepEqual(change(97), [3, 2, 0, 2]);
        deepEqual(change(8), [0, 0, 1, 3]);
        deepEqual(change(250), [10, 0, 0, 0]);
        deepEqual(change(144), [5, 1, 1, 4]);
        deepEqual(change(97), [3, 2, 0, 2]);
    });

    it('handles large values', () => {
        // This test only passes if the solution is efficient
        deepEqual(change(100000000000), [4000000000, 0, 0, 0]);
    });

    it('throws the proper exception for negative arguments', () => {
        throws(() => change(-50), RangeError);
    });
});

describe('stretched', () => {
    it('works on the empty string', () => {
        deepEqual(stretched(''), '');
    });

    it('stretches non-empty strings property', () => {
        deepEqual(stretched('H e   l\t\tlo'), 'Heelllllllooooo');
        deepEqual(stretched('$#'), '$##');
        deepEqual(stretched('       '), '');
    });
});

describe('scramble', () => {
    function anagramsOfEachOther(s, t) {
        return s.split('').sort().join('') === t.split('').sort().join('');
    }

    it('scrambles properly', () => {
        ['a', 'rat', 'JavaScript testing', '', 'zzz', '^*^*)^▱ÄÈËɡɳɷ'].forEach(s => {
            ok(anagramsOfEachOther(s, scramble(s)));
        });
    });

    it('is really random (produces all permutations)', () => {
        const possibilities = new Set('ABC ACB BAC BCA CAB CBA'.split(' '));
        for (let i = 0; i < 200; i += 1) {
            possibilities.delete(scramble('ABC'));
        }
        deepEqual(possibilities.size, 0);
    });
});

describe('say', () => {
    it('works when there are no words', () => {
        deepEqual(say(), '');
    });

    it('works when there are words', () => {
        deepEqual(say('hi')(), 'hi');
        deepEqual(say('hi')('there')(), 'hi there');
        deepEqual(say('hello')('my')('name')('is')('Colette')(), 'hello my name is Colette');
    });
});

describe('powers', () => {
    function generatorToArray(generator, ...args) {
        const result = [];
        generator(...args, item => result.push(item));
        return result;
    }

    it('generates sequences of powers properly', () => {
        deepEqual(generatorToArray(powers, 2, -5), []);
        deepEqual(generatorToArray(powers, 7, 0), []);
        deepEqual(generatorToArray(powers, 3, 1), [1]);
        deepEqual(generatorToArray(powers, 2, 63), [1, 2, 4, 8, 16, 32]);
        deepEqual(generatorToArray(powers, 2, 64), [1, 2, 4, 8, 16, 32, 64]);
    });
});

describe('The powers generator', () => {
    it('works as expected', () => {
        const g1 = powersGenerator(2, 1);
        deepEqual(g1.next(), { value: 1, done: false });
        deepEqual(g1.next(), { value: undefined, done: true });
        const g2 = powersGenerator(3, 100);
        deepEqual(g2.next(), { value: 1, done: false });
        deepEqual(g2.next(), { value: 3, done: false });
        deepEqual(g2.next(), { value: 9, done: false });
        deepEqual(g2.next(), { value: 27, done: false });
        deepEqual(g2.next(), { value: 81, done: false });
        deepEqual(g2.next(), { value: undefined, done: true });
    });
});

describe('interleave', () => {
    it('interleaves properly', () => {
        deepEqual(interleave([]), []);
        deepEqual(interleave([1, 4, 6]), [1, 4, 6]);
        deepEqual(interleave([], 2, 3), [2, 3]);
        deepEqual(interleave([1], 9), [1, 9]);
        deepEqual(interleave([8, 8, 3, 9], 1), [8, 1, 8, 3, 9]);
        deepEqual(interleave([2], 7, '8', {}), [2, 7, '8', {}]);
    });
});

describe('crypto functions', () => {
    it('encrypt and decrypt okay', () => {
        const key = randomBytes(32);
        const iv = randomBytes(16);
        const [e, d] = makeCryptoFunctions(key, 'aes-256-cbc', iv);
        match(e('Hello world'), /[A-F\d]{32}/i);
        ['', 'abc', 'zπøj#•¶å≈’’'].forEach(s => deepEqual(d(e(s)), s));
    });
    it('throws an error for an unknown algorithm', () => {
        const iv = 'abcdefghijklmnop';
        throws(() => makeCryptoFunctions('super dog', 'asdf*', iv)[0]('Hello'), {
            message: 'Unknown cipher',
        });
    });
});

describe('The Pokemon function', () => {
    it('returns a promise', () => {
        const p = pokemonSprites('pikachu');
        ok('then' in p);
    });
    it('produces a resolved promise with a list of sprites', done => {
        pokemonSprites('ditto')
            .then(sprites => {
                ok('front_default' in sprites);
                ok(sprites.front_shiny.includes('sprites/pokemon/shiny/132.png'));
            })
            .then(done, done);
    });
    it('produces a rejected promise for an unknown pokemon', done => {
        pokemonSprites('asdhahaslhalhdalshdajdhjakshlakjsldkjks')
            .then(() => fail('Should not get here'))
            .catch(error => {
                ok(true);
            })
            .then(done, done);
    });
});