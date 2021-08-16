process.env.TATUM_API_KEY = '951cabe04de143b98b75c4d4ed4d2d99'

const Tatum = require('@tatumio/tatum');

const sleep = async () => await new Promise(r => setTimeout(r, 5000));

async function demo(currency = Tatum.Currency.MATIC) {
    const {account, address} = await Tatum.generateAccount({currency});
    console.log('Generated account:');
    console.log(JSON.stringify(address, null, 2));
    console.log(JSON.stringify(await Tatum.getAccountBalance(account.id), null, 2));
    console.log(`Sending blockchain transaction...`);
    const tx = await Tatum.sendTransaction(true, currency, {
        fromPrivateKey: '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236',
        to: address.address,
        amount: '0.000001'
    });
    console.log(`Explorer: https://mumbai.polygonscan.com/tx/${tx.txId}`);
    while (true) {
        await sleep();
        const balance = await Tatum.getAccountBalance(account.id);
        if (balance.accountBalance !== '0') {
            console.log('Account balance:');
            console.log(JSON.stringify(balance, null, 2));
            break;
        }
    }
}

demo();
