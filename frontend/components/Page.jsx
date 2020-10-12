import React, { Component } from "react";
import Header from "./Header";
import Meta from "./Meta";

import styled, { ThemeProvider, injectGlobal } from "styled-components";

export default class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
          <Button color="green">Hello World</Button>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

const theme = {
  red: "#FF0000",
  black: "#393939",
  grey: "#3A3A3A",
  lightgrey: "#E1E1E1",
  success: "#33cc33",
  primary: "#0099ff",
  danger: "#ff0000",
  offWhite: "#EDEDED",
  maxWidth: "1000px",

  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)",
};

injectGlobal`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'radnika_next';
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
  button {  font-family: 'radnika_next'; }
`;

const StyledPage = styled.div`
  background-color: ${(props) => props.theme.offWhite};
  color: ${(props) => props.theme.black};
`;

const Inner = styled.div`
  max-width: 1000px;
  background-color: rgba(0,200, 100, 1)
  margin: 0 auto;
  padding: 2rem;
`;

const Button = styled.button`
  background-color: ${(props) => props.color};
  padding: 10px 20px;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 30px;
  box-shadow: 1px 3px 2px rgba(0, 0, 0, 0.5);
  .primary {
    background: blue;
    color: white;
  }
  .success {
    background: green;
    color: white;
  }
  .info {
    background: rgb(0, 0, 200);
  }
`;
