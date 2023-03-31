import { AppBar, Container, styled } from "@mui/material";
import { ReactNode } from "react";
import CustomLink from "./CustomLink";

interface Props {
  children: ReactNode;
}

const CustomAppBar = styled(AppBar)(() => ({
  background: "#fff",
  color: "#000",
  padding: "1rem 0rem",
  "& .logo": {
    fontSize: "1.5rem",
    letterSpaccing: ".1rem",
    fontWeight: "500",
  },
}));

const ContentBody = styled("div")(() => ({
  marginTop: "5rem",
}));

const Header = (props: Props) => {
  const { children } = props;
  return (
    <>
      <CustomAppBar>
        <Container maxWidth="xl">
          <CustomLink href="/">
            <div className="logo">Logo</div>
          </CustomLink>
        </Container>
      </CustomAppBar>
      <ContentBody>{children}</ContentBody>
    </>
  );
};

export default Header;
