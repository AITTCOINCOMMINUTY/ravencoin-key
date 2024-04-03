import * as bip39 from "bip39";
interface IAddressObject {
    address: string;
    mnemonic?: string;
    path: string;
    privateKey: string;
    WIF: string;
}
export type Network = "aitt";
/**
 *
 * @param network
 * @returns the coin type for the network (blockchain), for example Ravencoin has coin type 175
 */
export function getCoinType(network: Network): any;
/**
 * @param network - should have value "rvn", "rvn-test", "evr" or "evr-test"
 * @param mnemonic - your mnemonic
 * @param account - accounts in BIP44 starts from 0, 0 is the default account
 * @param position - starts from 0
 */
export function getAddressPair(network: Network, mnemonic: string, account: number, position: number): {
    internal: IAddressObject;
    external: IAddressObject;
    position: number;
};
export function getHDKey(network: Network, mnemonic: string): any;
export function getAddressByPath(network: Network, hdKey: any, path: string): IAddressObject;
export function generateMnemonic(): string;
export function isMnemonicValid(mnemonic: string): boolean;
/**
 *
 * @param privateKeyWIF
 * @param network  should be "rvn" or "rvn-test"
 * @returns object {address, privateKey (hex), WIF}
 */
export function getAddressByWIF(network: Network, privateKeyWIF: string): {
    address: any;
    privateKey: any;
    WIF: any;
};
export const entropyToMnemonic: typeof bip39.entropyToMnemonic;
export function generateAddressObject(network?: Network): IAddressObject;
/**
 * Generates a random Address Object
 *
 * @deprecated use generateAddressObject
 * @param network
 * @returns
 */
export function generateAddress(network?: Network): IAddressObject;
declare const _default: {
    entropyToMnemonic: typeof bip39.entropyToMnemonic;
    generateAddress: typeof generateAddress;
    generateMnemonic: typeof generateMnemonic;
    getAddressByPath: typeof getAddressByPath;
    getAddressByWIF: typeof getAddressByWIF;
    getAddressPair: typeof getAddressPair;
    getCoinType: typeof getCoinType;
    getHDKey: typeof getHDKey;
    isMnemonicValid: typeof isMnemonicValid;
};
export default _default;

//# sourceMappingURL=types.d.ts.map
