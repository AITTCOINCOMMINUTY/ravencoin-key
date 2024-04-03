var $g5Y9E$buffer = require("buffer");
var $g5Y9E$hyperbitjschains = require("@hyperbitjs/chains");
var $g5Y9E$bip39 = require("bip39");
var $g5Y9E$coinkey = require("coinkey");
var $g5Y9E$hdkey = require("hdkey");


function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "getCoinType", () => $80bd448eb6ea085b$export$23109f16a8a07245);
$parcel$export(module.exports, "getAddressPair", () => $80bd448eb6ea085b$export$6e3ac79f8c0a2892);
$parcel$export(module.exports, "getHDKey", () => $80bd448eb6ea085b$export$6c78ccde21ad48f6);
$parcel$export(module.exports, "getAddressByPath", () => $80bd448eb6ea085b$export$6fc951b76952b95e);
$parcel$export(module.exports, "generateMnemonic", () => $80bd448eb6ea085b$export$9f993213e5806bf0);
$parcel$export(module.exports, "isMnemonicValid", () => $80bd448eb6ea085b$export$2b99b9ff149202f3);
$parcel$export(module.exports, "getAddressByWIF", () => $80bd448eb6ea085b$export$f43d70cb4ddd5664);
$parcel$export(module.exports, "entropyToMnemonic", () => $80bd448eb6ea085b$export$4becd65eb23312e6);
$parcel$export(module.exports, "generateAddressObject", () => $80bd448eb6ea085b$export$de190b37be25f71b);
$parcel$export(module.exports, "generateAddress", () => $80bd448eb6ea085b$export$e2e336010351d8a8);
$parcel$export(module.exports, "default", () => $80bd448eb6ea085b$export$2e2bcd8739ae039);
//Gives us meta data about coins/chains



var $80bd448eb6ea085b$require$Buffer = $g5Y9E$buffer.Buffer;


function $80bd448eb6ea085b$var$getNetwork(name) {
    const c = name.toLowerCase(); //Just to be sure
    const map = {
        aitt: (0, $g5Y9E$hyperbitjschains.chains).aitt.mainnet.versions
    };
    const network = map[c];
    if (!network) throw new Error("network must be of value " + Object.keys(map).toString());
    return network;
}
function $80bd448eb6ea085b$export$23109f16a8a07245(network) {
    const chain = $80bd448eb6ea085b$var$getNetwork(network);
    return chain.bip44;
}
function $80bd448eb6ea085b$export$6e3ac79f8c0a2892(network, mnemonic, account, position) {
    const hdKey = $80bd448eb6ea085b$export$6c78ccde21ad48f6(network, mnemonic);
    const coin_type = $80bd448eb6ea085b$export$23109f16a8a07245(network);
    //https://github.com/satoshilabs/slips/blob/master/slip-0044.md
    //Syntax of BIP44
    //m / purpose' / coin_type' / account' / change / address_index
    const externalPath = `m/44'/${coin_type}'/${account}'/0/${position}`;
    const externalAddress = $80bd448eb6ea085b$export$6fc951b76952b95e(network, hdKey, externalPath);
    //change address
    const internalPath = `m/44'/${coin_type}'/${account}'/1/${position}`;
    const internalAddress = $80bd448eb6ea085b$export$6fc951b76952b95e(network, hdKey, internalPath);
    return {
        internal: internalAddress,
        external: externalAddress,
        position: position
    };
}
function $80bd448eb6ea085b$export$6c78ccde21ad48f6(network, mnemonic) {
    const chain = $80bd448eb6ea085b$var$getNetwork(network);
    const seed = $g5Y9E$bip39.mnemonicToSeedSync(mnemonic).toString("hex");
    //From the seed, get a hdKey, can we use CoinKey instead?
    const hdKey = $g5Y9E$hdkey.fromMasterSeed($80bd448eb6ea085b$require$Buffer.from(seed, "hex"), chain.bip32);
    return hdKey;
}
function $80bd448eb6ea085b$export$6fc951b76952b95e(network, hdKey, path) {
    const chain = $80bd448eb6ea085b$var$getNetwork(network);
    const derived = hdKey.derive(path);
    var ck2 = new $g5Y9E$coinkey(derived.privateKey, chain);
    return {
        address: ck2.publicAddress,
        path: path,
        privateKey: ck2.privateKey.toString("hex"),
        WIF: ck2.privateWif
    };
}
function $80bd448eb6ea085b$export$9f993213e5806bf0() {
    return $g5Y9E$bip39.generateMnemonic();
}
function $80bd448eb6ea085b$export$2b99b9ff149202f3(mnemonic) {
    //Check all languages
    const wordlists = Object.values($g5Y9E$bip39.wordlists);
    //If mnemonic is valid in any language, return true, otherwise false
    for (const wordlist of wordlists){
        const v = $g5Y9E$bip39.validateMnemonic(mnemonic, wordlist);
        if (v === true) return true;
    }
    return false;
}
function $80bd448eb6ea085b$export$f43d70cb4ddd5664(network, privateKeyWIF) {
    const coinKey = $g5Y9E$coinkey.fromWif(privateKeyWIF);
    coinKey.versions = $80bd448eb6ea085b$var$getNetwork(network);
    return {
        address: coinKey.publicAddress,
        privateKey: coinKey.privateKey.toString("hex"),
        WIF: coinKey.privateWif
    };
}
const $80bd448eb6ea085b$export$4becd65eb23312e6 = $g5Y9E$bip39.entropyToMnemonic;
function $80bd448eb6ea085b$export$de190b37be25f71b(network = "aitt") {
    const mnemonic = $80bd448eb6ea085b$export$9f993213e5806bf0();
    const account = 0;
    const position = 0;
    const addressPair = $80bd448eb6ea085b$export$6e3ac79f8c0a2892(network, mnemonic, account, position);
    const addressObject = addressPair.external;
    const result = {
        ...addressObject,
        mnemonic: mnemonic,
        network: network
    };
    return result;
}
function $80bd448eb6ea085b$export$e2e336010351d8a8(network = "aitt") {
    return $80bd448eb6ea085b$export$de190b37be25f71b(network);
}
var $80bd448eb6ea085b$export$2e2bcd8739ae039 = {
    entropyToMnemonic: $80bd448eb6ea085b$export$4becd65eb23312e6,
    generateAddress: $80bd448eb6ea085b$export$e2e336010351d8a8,
    generateMnemonic: $80bd448eb6ea085b$export$9f993213e5806bf0,
    getAddressByPath: $80bd448eb6ea085b$export$6fc951b76952b95e,
    getAddressByWIF: $80bd448eb6ea085b$export$f43d70cb4ddd5664,
    getAddressPair: $80bd448eb6ea085b$export$6e3ac79f8c0a2892,
    getCoinType: $80bd448eb6ea085b$export$23109f16a8a07245,
    getHDKey: $80bd448eb6ea085b$export$6c78ccde21ad48f6,
    isMnemonicValid: $80bd448eb6ea085b$export$2b99b9ff149202f3
};


//# sourceMappingURL=main.js.map
