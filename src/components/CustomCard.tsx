import { styled } from "@mui/system";
import { ReactNode } from "react";

interface Props {
  children: ReactNode | null | undefined;
  className?: string;
}

const StyledDiv = styled("div")(() => ({}));

const CustomCard = (props: Props) => {
  const { children, className } = props;
  return <StyledDiv className={`card ${className}`}>{children}</StyledDiv>;
};

export default CustomCard;
