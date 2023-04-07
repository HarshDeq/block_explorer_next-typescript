import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';



export const generateMnemonicWordSeedAndEnt =(wordLength:number)=>async(dispatch)=>{

    const mnemonicWord = bip39.generateMnemonic(wordlist,wordLength);
    const seedBuffer = await bip39.mnemonicToSeed(mnemonicWord);
    const entropyBuffer = bip39.mnemonicToEntropy(mnemonicWord, wordlist)


}