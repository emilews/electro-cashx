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
                type: 'string'
            }
        ]
    }
};

const getAddressesArray = () => {
    let arr: string[] = [];
    let res = store.get('addresses', null);
    res.map((item:any) => {
        arr.push(item[1]);
    })
    return arr;
}

export const getAddresses = () => {
    let adrs;
    let res = store.get('seed', null);
    if(res === null){
        let newSeed = bitbox.Mnemonic.generate();
        store.set('seed', newSeed);
        store.set('addresses', 1);
        adrs = bitbox.Mnemonic.toKeypairs(newSeed, 1);
    }else{
        adrs = bitbox.Mnemonic.toKeypairs(res, store.get('numAddrs', 1));
    }
    return adrs;
}

export const getBalance = async () => {
    let bal:number;
    bal = store.get('balance', 0);
    try{
        let details = await bitbox.Address.details(getAddressesArray());
        if(isArray(details)){
            details.map((item:any) => {
                bal += item.balance;
            })
        }else{
            bal += details.balance;
        }
    }catch(e){
        //Nothing
    }
    return bal;
}

var store = new Store({Schema});
let adrs = getAddresses();
store.set('addresses', adrs);