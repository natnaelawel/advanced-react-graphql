import App, { Container } from "next/app";
import Page from "../components/Page";
// import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData";
import { ApolloProvider } from "@apollo/client";

class MyApp extends App {
  static async getInitialProps({Component, ctx}){
    let pageProps = {}
    if(Component.getInitialProps){
      pageProps = await Component.getInitialProps(ctx)
    }

    // this exposes the query to user
    pageProps.query = ctx.query
    return {pageProps};
  }

  render() {
    const { Component, apollo, pageProps } = this.props;
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}
export default withData(MyApp);

// import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
// import { endpoint } from "../config";


// import React from 'react'

// const client = new ApolloClient({
//   uri: endpoint,
//   credentials:"include",
//   cache: new InMemoryCache(),
// });

// function App({Component, pageProps}) {
//   return (
//     <ApolloProvider client={client}>
//       <Page>
//         <Component {...pageProps} />
//       </Page>
//     </ApolloProvider>
//   );
// }

// export default App
