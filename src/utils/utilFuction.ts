export const createLinkForTransaction =(blockNumber:string | number)=>{
    return `/txs?block=${blockNumber}`
} 

export const createLinkForBlock = (blockNumber:string|number)=>{
    return `/block/${blockNumber}`
}