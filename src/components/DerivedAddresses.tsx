import React, { useEffect } from 'react'
import CustomTabs from './CustomTabs'
import { useDispatch, useSelector } from 'react-redux'
import { generateAddresses, resetAddresses, setDerivedPath, setPathIndex } from '@/redux/mnemonic/action'
import { RootState } from '@/redux/store'
import DerivedAddressesTable from './DerivedAddressesTable'

const TAB_OPTIONS = [
    {label:'BIP32', value:`m/0/`,index:0},
    {label:'BIP44', value:`m/44'/60'/0'/0/`, index:1}
]

const DerivedAddresses = () => {
    const dispatch = useDispatch()
     const {pathIndex,entropy,derivedPath,derivedAddresses} = useSelector((state:RootState)=>state.mnemonicGenerator)

    const handleTabChange = (e: React.SyntheticEvent, newValue: number)=>{
        dispatch(resetAddresses())
        dispatch(setPathIndex(newValue))
        dispatch(setDerivedPath(TAB_OPTIONS[newValue].value))
    }

    const geneRateNewAddresses = ()=>{
        console.log(derivedPath)
      
        dispatch<any>(generateAddresses({path:derivedPath, entropy,startFrom:derivedAddresses.length }))
    }

    useEffect(()=>{
        
        if(entropy){
            geneRateNewAddresses()
        }
    },[derivedPath, entropy])


  return (
    <div>
        <CustomTabs tabs={TAB_OPTIONS} handleChange={handleTabChange} value ={pathIndex}/>
        <DerivedAddressesTable />
    </div>
  )
}

export default DerivedAddresses