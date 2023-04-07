import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';

export const generateMnemonicWordAndSeed = async(words:number)=>{

   const mnemonicWord = bip39.generateMnemonic(wordlist,words);
   const seed = await bip39.mnemonicToSeed(mnemonicWord);
   const ent = bip39.mnemonicToEntropy(mnemonicWord, wordlist)

   return {
    mnemonicWord,seed,entropy :ent
   }
}