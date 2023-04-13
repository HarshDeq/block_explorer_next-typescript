import Web3 from "web3";
import { IBlock } from "./interfaces";

export const ALCHEMY_URL =
  "https://eth-goerli.g.alchemy.com/v2/SgYzo2aqfbU2B47MKzYrMIo18HOftLa3";

export const web3_instance = new Web3(ALCHEMY_URL);

export const getBlocks = async (numberOfBlock: number) => {
  const latestBlockNumber = await web3_instance.eth.getBlockNumber();

  const blocksDetails: any = {};
  
  for (
    let blockNumber = latestBlockNumber;
    blockNumber > latestBlockNumber - numberOfBlock;
    blockNumber--
    ) {
    const block = await getBlockDetailByBlockNumber(blockNumber);
    blocksDetails[blockNumber] = block;
  }

  return {
    arrOfBlockNumber: Object.keys(blocksDetails).reverse(),
    blocks: blocksDetails,
  };
};

const getBlockTransactionCount = async (blockNumber: number) => {
  return await web3_instance.eth.getBlockTransactionCount(blockNumber);
};

export const getBlockDetailByBlockNumber = async (
  blockNumber: number | string
): Promise<IBlock> => {
  const blockDetails = await web3_instance.eth.getBlock(blockNumber);
  return {
    ...blockDetails,
    transactionCount: blockDetails.transactions.length,
  };
};

export const getAllTransactionsDetailList = async (transactionList: string[]) => {
  

  const transactionDetails = await Promise.all(
    transactionList?.map(async (hash) => {
      return await getTransctionDetails(hash);
    })
  );

  return transactionDetails;
};

export const getAllTransactionList = async (blockNumber: number) => {
  const blockDetails = await web3_instance.eth.getBlock(blockNumber);
  return blockDetails?.transactions;
};

export const getTransctionDetails = async (transactionHash: string) => {
  return await web3_instance.eth.getTransaction(transactionHash);
};
