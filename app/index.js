import React from "react";
import ReactDOM from "react-dom";
import App from './app';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Root = () =>(
    <MuiThemeProvider>
    <App/>
  </MuiThemeProvider>
);

ReactDOM.render(
    <Root />,
    document.getElementById('app')
);

module.hot.accept();
