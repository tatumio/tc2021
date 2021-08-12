process.env.TATUM_API_KEY = '951cabe04de143b98b75c4d4ed4d2d99'

const Tatum = require('@tatumio/tatum');

const wallet = async (currency) => {
    const {account, address} = await Tatum.generateAccount({currency});
    console.log('Generated account:');
    console.log(JSON.stringify(address, null, 2));
    console.log(JSON.stringify(await Tatum.getAccountBalance(account.id), null, 2));
    console.log(`Sending blockchain transaction...`);
    const tx = await Tatum.sendTransaction(true, currency, {
        fromPrivateKey: '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236',
        to: address.address,
        amount: '0.001'
    });
    console.log(`Explorer: https://alfajores-blockscout.celo-testnet.org/tx/${tx.txId}/token-transfers`);
    while (true) {
        await new Promise(r => setTimeout(r, 5000));
        const balance = await Tatum.getAccountBalance(account.id);
        if (balance.accountBalance !== '0') {
            console.log('Account balance:');
            console.log(JSON.stringify(balance, null, 2));
            break;
        }
    }
};

async function demo() {
    await wallet(Tatum.Currency.MATIC);
    // await wallet(Currency.BSC);
    // await wallet(Currency.TRON);
    // await wallet(Currency.CELO);
    // await wallet(Currency.ETH);

    await Tatum.sendStoreDataTransaction({
        fromPrivateKey: '',
        from: '',
        data: 'Hello guys!!!',
        chain: Tatum.Currency.MATIC,
    })



}

demo();
