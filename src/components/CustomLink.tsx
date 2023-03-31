import { ChildrenProp } from "@/utils/interfaces";
import { styled } from "@mui/system";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children?: ChildrenProp
  href: string;
  label?: string | null;
}

const StyledLink = styled(Link)(() => ({
  textDecoration: "none",
}));

const CustomLink = (props: Props) => {
  const { children, label, href } = props;
  return <StyledLink href={href}>{children ?? label}</StyledLink>;
};

export default CustomLink;
