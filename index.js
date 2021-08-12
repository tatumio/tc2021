process.env.TATUM_API_KEY='951cabe04de143b98b75c4d4ed4d2d99'

const {generateAccount, getAccountBalance, getTransactionsByAccount, sendTransaction, Currency} = require('@tatumio/tatum');

const wallet = async () => {
    console.log(`Generating account`);
    const {account, address} = await generateAccount({currency: Currency.CELO});
    console.log('Generated address:');
    console.log(JSON.stringify(address, null, 2));

    console.log(`Account balance:`);
    console.log(JSON.stringify(await getAccountBalance(account.id), null, 2));

    console.log(`Send blockchain transaction...`);
    const tx = await sendTransaction(true, Currency.CELO, {
        fromPrivateKey: '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236',
        to: address.address,
        amount: '0.001'
    });
    console.log(`Transaction hash: ${tx.txId}`);
    console.log(`Transaction in explorer: https://alfajores-blockscout.celo-testnet.org/tx/${tx.txId}/token-transfers`);

    while (true) {
        console.log(`Checking for balance update in 5s.....`);
        await new Promise(r => setTimeout(r, 5000));
        console.log('Account balance:');
        const balance = await getAccountBalance(account.id);
        console.log(JSON.stringify(balance, null, 2));
        if (balance.accountBalance !== '0') {
            break;
        }
    }

    console.log(`Account transactions:`);
    console.log(await getTransactionsByAccount({id: account.id}));
    console.log(`End of execution.`)
};

wallet();
