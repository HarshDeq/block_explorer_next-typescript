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

const StyledDiv = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
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
          <StyledDiv>
            <CustomLink href="/">
              <div className="logo">Logo</div>
            </CustomLink>
            <StyledDiv>
              <div style={{ marginRight: "1rem" }}>
                <CustomLink href="/">
                  <div style={{ textDecoration: "underline" }}>
                    Block Explorer{" "}
                  </div>
                </CustomLink>
              </div>
              <div style={{ marginRight: "1rem" }}>
                <CustomLink href="/mnemonic">
                <div  style={{ textDecoration: "underline" }}>Mnemonic</div>
                </CustomLink>
              </div>
              <div style={{ marginRight: "1rem" }}>
                <CustomLink href="/send">
                <div  style={{ textDecoration: "underline" }}>Send</div>
                </CustomLink>
              </div>
            </StyledDiv>
          </StyledDiv>
        </Container>
      </CustomAppBar>
      <ContentBody>{children}</ContentBody>
    </>
  );
};

export default Header;
