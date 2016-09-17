/* global app */

app.misc.minhash = () => {

    const RANDOM_MAX = 11;
    const HASH_MASK = 131071;
    const HASH_SHIFT = 4;
    const SETS = 2;
    const SIMILAR_SETS = 1;

    return Object.freeze({
        similarity
    });

    function similarity(set1, set2) {
        if (set1.size || set2.size) {
            const hashes = initHashes(set1, set2);
            const bitMap = buildBitMap(set1, set2);
            const minhashValues = initializeHashBuckets(hashes.length);
            computeMinHashForSet(set1, 0, minhashValues, bitMap, hashes);
            computeMinHashForSet(set2, 1, minhashValues, bitMap, hashes);
            const value = computeSimilarityFromSignatures(minhashValues, hashes.length);
            return value == SIMILAR_SETS ? SIMILAR_SETS : value * 2;
        } else {
            return SIMILAR_SETS;
        }
    }

    function initHashes(set1, set2) {
        const hashes = [];
        for (let indexHash = 0; indexHash < set1.size + set2.size; indexHash++) {
            const a = getRandom(), b = getRandom(), c = getRandom();
            hashes.push(hash(a * b * c, a, b, c));
        }
        return hashes;
    }

    function getRandom() {
        return Math.ceil(Math.random() * RANDOM_MAX);
    }

    function buildBitMap(set1, set2) {
        const bitArray = new Map();
        for (let key of set1) {
            bitArray.set(key, [true, false]);
        }
        for (let key of set2) {
            bitArray.set(key, bitArray.has(key) ? [true, true] : [false, true]);
        }
        return bitArray;
    }

    function initializeHashBuckets(hashFunctions) {
        const minhashValues = [];
        for (let indexSet = 0; indexSet < SETS; indexSet++) {
            minhashValues[indexSet] = [];
            for (let indexHash = 0; indexHash < hashFunctions; indexHash++) {
                minhashValues[indexSet][indexHash] = Infinity;
            }
        }
        return minhashValues;
    }

    function computeSimilarityFromSignatures(minhashValues, hashFunctions) {
        let identicalMinHashes = 0;
        for (let indexHash = 0; indexHash < hashFunctions; indexHash++) {
            if (minhashValues[0][indexHash] == minhashValues[1][indexHash]) {
                identicalMinHashes++;
            }
        }
        return identicalMinHashes / hashFunctions;
    }

    function hash(x, a, b, c) {
        return Math.abs(Math.ceil((a * (x >> HASH_SHIFT) + b * x + c) & HASH_MASK));
    }

    function computeMinHashForSet(set, setIndex, minhashValues, bitArray, hashes) {
        let index = 0;
        for (let element of bitArray.keys()) {
            for (let indexHash = 0; indexHash < hashes.length; indexHash++) {
                if (set.has(element)) {
                    if (hashes[index] < minhashValues[setIndex][index]) {
                        minhashValues[setIndex][indexHash] = hashes[index];
                    }
                }
            }
            index++;
        }
    }

};