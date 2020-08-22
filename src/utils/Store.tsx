import { BITBOX } from 'bitbox-sdk';
import { isArray } from 'util';
let bitbox = new BITBOX();
const Store = require('electron-store');
const Schema = {
    balance: {
        type: 'number'
    },
    seed: {
        type: 'string'
    },
    numAddrs: {
        type: 'number'
    },
    addresses: {
        type: 'array',
        items: [
            {
                type: 'string'
            },
            {
                type: 'string'
            }
        ]
    },
    tx: {
        type: 'array',
        items: [
            {
                type: 'string'
            },
            {
                type: 'number'
            },
            {
                type: 'array',
                items: [
                    {
                        type: 'string'
                    }
                ]
            }
        ]
    },
    //BCH Network info
    latestPrice: {
        type: 'number'
    }
};

export const isNewInstall = () => {
    return store.hasKey('seed');
}

const getAddressesArray = () => {
    let arr: string[] = [];
    let res = store.get('addresses', null);
    res.map((item: any) => {
        arr.push(item.address);
    })
    return arr;
}

export const setLatestPrice = (bitboxPrice: number) => {
    store.set('latestPrice', bitboxPrice);
}

export const getLatestPrice = () => {
    return store.get('latestPrice', 0);
}

export const getAddresses = () => {
    let adrs;
    let res = store.get('seed', null);
    if (res === null) {
        let newSeed = bitbox.Mnemonic.generate();
        store.set('seed', newSeed);
        store.set('numAddrs', 1);
        adrs = bitbox.Mnemonic.toKeypairs(newSeed, 1);
        store.set('addresses', adrs);
    } else {
        adrs = bitbox.Mnemonic.toKeypairs(res, store.get('numAddrs', 1));
    }
    return adrs;
}

export const getLiveBalance = async () => {
    let bal: number = 0;
    try {
        let details = await bitbox.Address.details(getAddressesArray());
        if (isArray(details)) {
            details.map((item: any) => {
                bal += item.balance;
            })
        } else {
            bal += details.balance;
        }
    } catch (e) {
        //Nothing
        console.log(e);
    }
    return bal;
}

export const getSavedBalance = () => {
    return store.get('balance', 0);
}

export const saveBalance = (nBalance: number) => {
    store.set('balance', nBalance);
}

export const getTxs = async () => {
    console.log("Getting txs...")
    let txs: any[] = [];
    txs = store.get('tx', null);
    if (txs === null) {
        let adrsTxs: string[] = [];
        let adrsDetails = await bitbox.Address.details(getAddressesArray());
        if (isArray(adrsDetails)) {
            adrsDetails.map((item: any) => {
                item.transactions.map((tx: string) => {
                    adrsTxs.push(tx);
                });
            });
        }
        if (adrsTxs.length !== 0) {
            let details = await bitbox.Transaction.details(adrsTxs);
            if (isArray(details)) {
                details.map((item: any) => {
                    txs.push({ txid: item.txid, vout: item.valueOut, who: item.vout.scriptPubKey.adresses });
                })
            }
        }
        store.set('tx', txs);
    }
    console.log(txs);
    return txs;
}
var store = new Store({ Schema });
getAddresses();
