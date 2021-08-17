process.env.TATUM_API_KEY = '4966d428-9507-45cb-9f90-02cca00674bd_100'

const Tatum = require('@tatumio/tatum');
const {readFileSync} = require('fs');

async function demo() {
    console.log('Minting new NFT token on FLOW.')
    const result = await Tatum.createNFT(true, {
        to: '0x10247089e55180c9',
        contractAddress: '2d103773-50e2-4a37-ac3d-61bc6af8faee',
        chain: Tatum.Currency.FLOW,
        account: '0x10247089e55180c9',
        privateKey: '3881849dd540a0c80383c3727951d35e3e9e8c238ec82a581726c3fc2ca17bc4'
    }, readFileSync('/Users/ssramko/Downloads/logo_tatum.png'), 'Tatum LOGO')
    console.log(result)
    console.log(`Explorer: https://flow-view-source.com/testnet/tx/${result.txId}`);
}

demo();
