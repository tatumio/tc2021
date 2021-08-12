process.env.TATUM_API_KEY='951cabe04de143b98b75c4d4ed4d2d99'

const {generateAccount, getAccountBalance, getTransactionsByAccount, sendTransaction, Currency} = require('@tatumio/tatum');

const wallet = async (currency) => {
    console.log(`Generating account`);
    const {account, address} = await generateAccount({currency});
    console.log('Generated address:');
    console.log(JSON.stringify(address, null, 2));

    console.log(`Account balance:`);
    console.log(JSON.stringify(await getAccountBalance(account.id), null, 2));

    console.log(`Send blockchain transaction...`);
    const tx = await sendTransaction(true, currency, {
        fromPrivateKey: '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236',
        to: address.address,
        amount: '0.001'
    });
    console.log(`Transaction hash: ${tx.txId}`);
    if (currency === Currency.CELO) {
        console.log(`Transaction in CELO explorer: https://alfajores-blockscout.celo-testnet.org/tx/${tx.txId}/token-transfers`);
    } else {
        console.log(`Transaction in BSC explorer: https://testnet.bscscan.com/tx/${tx.txId}`);
    }

    while (true) {
        console.log(`Checking for balance update in 5s.....`);
        await new Promise(r => setTimeout(r, 5000));
        const balance = await getAccountBalance(account.id);
        if (balance.accountBalance !== '0') {
            console.log('Account balance:');
            console.log(JSON.stringify(balance, null, 2));
            break;
        }
    }

    console.log(`Account transactions:`);
    console.log(await getTransactionsByAccount({id: account.id}));
    console.log(`End of execution.`)
};

async function demo() {
    await wallet(Currency.CELO);
    await wallet(Currency.BSC);

}

demo();
