import {Buffer as $hCgyA$Buffer} from "buffer";
import {chains as $hCgyA$chains} from "@hyperbitjs/chains";
import {mnemonicToSeedSync as $hCgyA$mnemonicToSeedSync, generateMnemonic as $hCgyA$generateMnemonic, wordlists as $hCgyA$wordlists, validateMnemonic as $hCgyA$validateMnemonic, entropyToMnemonic as $hCgyA$entropyToMnemonic} from "bip39";
import * as $hCgyA$coinkey from "coinkey";
import {fromMasterSeed as $hCgyA$fromMasterSeed} from "hdkey";

//Gives us meta data about coins/chains



var $c3f6c693698dc7cd$require$Buffer = $hCgyA$Buffer;


function $c3f6c693698dc7cd$var$getNetwork(name) {
    const c = name.toLowerCase(); //Just to be sure
    const map = {
        aitt: (0, $hCgyA$chains).aitt.mainnet.versions
    };
    const network = map[c];
    if (!network) throw new Error("network must be of value " + Object.keys(map).toString());
    return network;
}
function $c3f6c693698dc7cd$export$23109f16a8a07245(network) {
    const chain = $c3f6c693698dc7cd$var$getNetwork(network);
    return chain.bip44;
}
function $c3f6c693698dc7cd$export$6e3ac79f8c0a2892(network, mnemonic, account, position) {
    const hdKey = $c3f6c693698dc7cd$export$6c78ccde21ad48f6(network, mnemonic);
    const coin_type = $c3f6c693698dc7cd$export$23109f16a8a07245(network);
    //https://github.com/satoshilabs/slips/blob/master/slip-0044.md
    //Syntax of BIP44
    //m / purpose' / coin_type' / account' / change / address_index
    const externalPath = `m/44'/${coin_type}'/${account}'/0/${position}`;
    const externalAddress = $c3f6c693698dc7cd$export$6fc951b76952b95e(network, hdKey, externalPath);
    //change address
    const internalPath = `m/44'/${coin_type}'/${account}'/1/${position}`;
    const internalAddress = $c3f6c693698dc7cd$export$6fc951b76952b95e(network, hdKey, internalPath);
    return {
        internal: internalAddress,
        external: externalAddress,
        position: position
    };
}
function $c3f6c693698dc7cd$export$6c78ccde21ad48f6(network, mnemonic) {
    const chain = $c3f6c693698dc7cd$var$getNetwork(network);
    const seed = $hCgyA$mnemonicToSeedSync(mnemonic).toString("hex");
    //From the seed, get a hdKey, can we use CoinKey instead?
    const hdKey = $hCgyA$fromMasterSeed($c3f6c693698dc7cd$require$Buffer.from(seed, "hex"), chain.bip32);
    return hdKey;
}
function $c3f6c693698dc7cd$export$6fc951b76952b95e(network, hdKey, path) {
    const chain = $c3f6c693698dc7cd$var$getNetwork(network);
    const derived = hdKey.derive(path);
    var ck2 = new $hCgyA$coinkey(derived.privateKey, chain);
    return {
        address: ck2.publicAddress,
        path: path,
        privateKey: ck2.privateKey.toString("hex"),
        WIF: ck2.privateWif
    };
}
function $c3f6c693698dc7cd$export$9f993213e5806bf0() {
    return $hCgyA$generateMnemonic();
}
function $c3f6c693698dc7cd$export$2b99b9ff149202f3(mnemonic) {
    //Check all languages
    const wordlists = Object.values($hCgyA$wordlists);
    //If mnemonic is valid in any language, return true, otherwise false
    for (const wordlist of wordlists){
        const v = $hCgyA$validateMnemonic(mnemonic, wordlist);
        if (v === true) return true;
    }
    return false;
}
function $c3f6c693698dc7cd$export$f43d70cb4ddd5664(network, privateKeyWIF) {
    const coinKey = $hCgyA$coinkey.fromWif(privateKeyWIF);
    coinKey.versions = $c3f6c693698dc7cd$var$getNetwork(network);
    return {
        address: coinKey.publicAddress,
        privateKey: coinKey.privateKey.toString("hex"),
        WIF: coinKey.privateWif
    };
}
const $c3f6c693698dc7cd$export$4becd65eb23312e6 = $hCgyA$entropyToMnemonic;
function $c3f6c693698dc7cd$export$de190b37be25f71b(network = "aitt") {
    const mnemonic = $c3f6c693698dc7cd$export$9f993213e5806bf0();
    const account = 0;
    const position = 0;
    const addressPair = $c3f6c693698dc7cd$export$6e3ac79f8c0a2892(network, mnemonic, account, position);
    const addressObject = addressPair.external;
    const result = {
        ...addressObject,
        mnemonic: mnemonic,
        network: network
    };
    return result;
}
function $c3f6c693698dc7cd$export$e2e336010351d8a8(network = "aitt") {
    return $c3f6c693698dc7cd$export$de190b37be25f71b(network);
}
var $c3f6c693698dc7cd$export$2e2bcd8739ae039 = {
    entropyToMnemonic: $c3f6c693698dc7cd$export$4becd65eb23312e6,
    generateAddress: $c3f6c693698dc7cd$export$e2e336010351d8a8,
    generateMnemonic: $c3f6c693698dc7cd$export$9f993213e5806bf0,
    getAddressByPath: $c3f6c693698dc7cd$export$6fc951b76952b95e,
    getAddressByWIF: $c3f6c693698dc7cd$export$f43d70cb4ddd5664,
    getAddressPair: $c3f6c693698dc7cd$export$6e3ac79f8c0a2892,
    getCoinType: $c3f6c693698dc7cd$export$23109f16a8a07245,
    getHDKey: $c3f6c693698dc7cd$export$6c78ccde21ad48f6,
    isMnemonicValid: $c3f6c693698dc7cd$export$2b99b9ff149202f3
};


export {$c3f6c693698dc7cd$export$23109f16a8a07245 as getCoinType, $c3f6c693698dc7cd$export$6e3ac79f8c0a2892 as getAddressPair, $c3f6c693698dc7cd$export$6c78ccde21ad48f6 as getHDKey, $c3f6c693698dc7cd$export$6fc951b76952b95e as getAddressByPath, $c3f6c693698dc7cd$export$9f993213e5806bf0 as generateMnemonic, $c3f6c693698dc7cd$export$2b99b9ff149202f3 as isMnemonicValid, $c3f6c693698dc7cd$export$f43d70cb4ddd5664 as getAddressByWIF, $c3f6c693698dc7cd$export$4becd65eb23312e6 as entropyToMnemonic, $c3f6c693698dc7cd$export$de190b37be25f71b as generateAddressObject, $c3f6c693698dc7cd$export$e2e336010351d8a8 as generateAddress, $c3f6c693698dc7cd$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=module.js.map
