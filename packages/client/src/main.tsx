import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {ApolloProvider} from "@apollo/client";
import {client} from "./config/apolloClient";
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './config/theme';
import { CssBaseline } from '@mui/material';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
