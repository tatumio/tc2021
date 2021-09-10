# Tatum TestCrunch Disrupt 2021

## Description

This is a simple application made for the TestCrunch Disrupt 2021 as a demo of a Tatum Platform.
It's possible to mint an NFT token to 3 different testnet blockchains - Polygon, Flow and Binance Smart Chain.

App consists of two parts - [index.html](./client/index.html), which communicates with REST API on the backend.
In the backend, there is only [1 REST API service](./src/app.service.ts#L41), which is responsible for minting the NFT.

App must be connected to the Tatum API with valid API Key, which can be for free obtained at [https://dashboard.tatum.io](https://dashboard.tatum.io).
For now, there is publicly available FREE testnet API Key provided in the app itself.

## Installation

```bash
$ yarn
```

## Running the app

```bash
$ npm run start:dev
```

Once started, it's possible to open the link in the browser [http://127.0.0.1:3000](http://127.0.0.1:3000) and mint your own NFT.

## License

This application is [MIT licensed](LICENSE).
