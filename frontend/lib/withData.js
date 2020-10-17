import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';
import { InMemoryCache } from '@apollo/client';



function createClient({ headers }) {
  // console.log(process.env.endpoint)
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    // cache: InMemoryCache(),
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,

      });
    },
  });
}

export default withApollo(createClient);
