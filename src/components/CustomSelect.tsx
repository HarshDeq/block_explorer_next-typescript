import {  MenuItem, Select, SelectChangeEvent, styled } from "@mui/material";
import { ReactNode } from "react";

type Option = {
  label: string | number;
  value: string | number;
};

interface Props {
  value: number | string | null;
  options: Option[];
  onChange: (e:SelectChangeEvent<unknown>, child:ReactNode)=>void;
}


  
  const StyledSelect = styled(Select)(()=>({
    margin:'0 .5rem',
    height:'1.9rem'
  }))
  

const CustomSelect = (props: Props) => {
  const { value, options, onChange } = props;
  return (
    <>
      <StyledSelect value={value} onChange={onChange}>
       {options.map(option=>(
        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
       ))}
      </StyledSelect>
    </>
  );
};

export default CustomSelect;
