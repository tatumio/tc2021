process.env.TATUM_API_KEY = '951cabe04de143b98b75c4d4ed4d2d99'

const Tatum = require('@tatumio/tatum');

const sleep = async () => await new Promise(r => setTimeout(r, 5000));

async function demo() {
    console.log('Minting new NFT token on MATIC.')
    const tokenId = `${Date.now()}`;
    const nft = await Tatum.mintNFTWithUri(true, {
        chain: Tatum.Currency.MATIC,
        fromPrivateKey: '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab',
        contractAddress: '0x6d8eae641416B8b79e0fB3a92b17448CfFf02b11',
        to: '0x80d8bac9a6901698b3749fe336bbd1385c1f98f2',
        tokenId: tokenId,
        url: 'https://tatum.io/token/1/metadata.json'
    })
    console.log(`Explorer: https://mumbai.polygonscan.com/tx/${nft.txId}`);
    await sleep();
    const {data: metadata} = await Tatum.getNFTMetadataURI(Tatum.Currency.MATIC, '0x6d8eae641416B8b79e0fB3a92b17448CfFf02b11', tokenId);
    console.log(`Metadata stored with the NFT: ${metadata}`);
}

demo();
