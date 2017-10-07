import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider
} from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import App from './components/App';

import './index.css';

const networkInterface = createNetworkInterface({
  uri: process.env.REACT_APP_GRAPHCOOL_URI
});

const client = new ApolloClient({
  networkInterface
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
