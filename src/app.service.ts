import { Injectable } from '@nestjs/common';
import * as Tatum from '@tatumio/tatum';

const PRIVATE_KEYS = {
  [Tatum.Currency.MATIC]:
    '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab',
  [Tatum.Currency.BSC]:
    '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab',
  [Tatum.Currency.FLOW]:
    '3881849dd540a0c80383c3727951d35e3e9e8c238ec82a581726c3fc2ca17bc4',
};

const RECIPIENT = {
  [Tatum.Currency.MATIC]: '0x80d8bac9a6901698b3749fe336bbd1385c1f98f2',
  [Tatum.Currency.BSC]: '0x80d8bac9a6901698b3749fe336bbd1385c1f98f2',
  [Tatum.Currency.FLOW]: '0x10247089e55180c9',
};

const NFT_ADDRESS = {
  [Tatum.Currency.MATIC]: '0x6d8eae641416B8b79e0fB3a92b17448CfFf02b11',
  [Tatum.Currency.BSC]: '0x6d8eae641416B8b79e0fB3a92b17448CfFf02b11',
  [Tatum.Currency.FLOW]: '2d103773-50e2-4a37-ac3d-61bc6af8faee',
};

const SENDER_ADDRESS = {
  [Tatum.Currency.MATIC]: undefined,
  [Tatum.Currency.BSC]: undefined,
  [Tatum.Currency.FLOW]: '0x10247089e55180c9',
};

@Injectable()
export class AppService {
  async createNFT(
    file: Buffer,
    name: string,
    description: string,
    chain: Tatum.Currency,
  ) {
    console.log(`Minting new NFT token on ${chain}.`);

    return await Tatum.createNFT(
      true,
      {
        to: RECIPIENT[chain],
        contractAddress: NFT_ADDRESS[chain],
        account: SENDER_ADDRESS[chain],
        chain,
        tokenId: `${Date.now()}`,
        fromPrivateKey: PRIVATE_KEYS[chain],
      } as any,
      file,
      name,
      description,
    );
  }
}
