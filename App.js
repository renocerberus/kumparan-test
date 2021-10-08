import React from 'react';
import fetch from 'cross-fetch';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink
} from "@apollo/client";
import Main from './app/Main/Main'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://apollo-fullstack-tutorial.herokuapp.com/', fetch }),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
};

export default App;
