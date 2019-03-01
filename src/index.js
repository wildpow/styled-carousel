import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import styledNormalize from "styled-normalize";
import App from "./App2";

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
  @import url('https://fonts.googleapis.com/css?family=Open+Sans|Roboto:300,400,500,700');
`;

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById("root")
);
