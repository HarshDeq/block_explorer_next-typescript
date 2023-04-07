import { Button, ButtonPropsVariantOverrides, styled } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";

interface Props {
  label?: string | number ;
  onClick: ()=>void;
  variant?:  OverridableStringUnion<
  'text' | 'outlined' | 'contained',
  ButtonPropsVariantOverrides
>;
children?: string
}

const StyledButton = styled(Button)(() => ({
  margin: "0 .5rem",
  height: "1.8rem",
}));

const CustomButton = (props:Props) => {

    const {label,onClick,variant,children} = props

  return <StyledButton variant={variant} onClick={onClick} >{label ?? children}</StyledButton>;
};

export default CustomButton;
