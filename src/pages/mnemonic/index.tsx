import DerivedAddresses from "@/components/DerivedAddresses";
import MnemonicComp from "@/components/MnemonicComp";
import { resetMnemonicGenerator } from "@/redux/mnemonic/action";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const MnemonicCodeGenerator = () => {

  const dispatch = useDispatch()

  useEffect(()=>{

    return ()=>{
      dispatch(resetMnemonicGenerator())
    }
  },[])
  
  return (
    <div style={{ margin: "2.5rem" }}>
      <div
        style={{
          textAlign: "center",
          fontSize: "1.8rem",
          fontWeight: "600",
          borderBottom: ".8px solid rgba(237, 231, 225,1)",
          marginBottom: "2rem",
        }}
      >
        Mnemonic Code Converter
      </div>
      <div>
        <h1>Mnemonic</h1>
        <MnemonicComp />
        <h1>Derived Addresses</h1>
        <DerivedAddresses />
      </div>
    </div>
  );
};

export default MnemonicCodeGenerator;
