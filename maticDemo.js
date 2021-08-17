process.env.TATUM_API_KEY = '4966d428-9507-45cb-9f90-02cca00674bd_100'

const Tatum = require('@tatumio/tatum');
const {readFileSync} = require('fs');

async function demo() {
    console.log('Minting new NFT token on MATIC.')
    const result = await Tatum.createNFT(true, {
        to: '0x80d8bac9a6901698b3749fe336bbd1385c1f98f2',
        contractAddress: '0x6d8eae641416B8b79e0fB3a92b17448CfFf02b11',
        chain: Tatum.Currency.MATIC,
        tokenId: `${Date.now()}`,
        fromPrivateKey: '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab',
    }, readFileSync('/Users/ssramko/Downloads/logo_tatum.png'), 'Tatum LOGO')
    console.log(result);
    console.log(`Explorer: https://mumbai.polygonscan.com/tx/${result.txId}`);
}

demo();
