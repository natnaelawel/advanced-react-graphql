// import React from 'react'
// import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
// import { endpoint } from "../config";
// import Page from "../components/Page";
// import App from 'next/app'

// const client = new ApolloClient({
//   uri: "http://localhost:4444",
//   credentials:"include",
//   cache: new InMemoryCache(),
// });

// function MyApp({Component, pageProps}) {
//   return (
//     <ApolloProvider client={client}>
//       <Page>
//         {console.log(JSON.Stringify(pageProps))}
//         <Component {...pageProps} />
//       </Page>
//     </ApolloProvider>
//   );
// }

// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps };
// };


// export default MyApp;


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


// import React from 'react'
// import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
// import { endpoint } from "../config";
// import Page from "../components/Page";
// import App from 'next/app'

// const client = new ApolloClient({
//   uri: "http://localhost:4444",
//   credentials:"include",
//   cache: new InMemoryCache(),
// });

// function MyApp({Component, pageProps}) {
//   return (
//     <ApolloProvider client={client}>
//       <Page>
//         <Component {...pageProps} />
//       </Page>
//     </ApolloProvider>
//   );
// }

// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//   appProps.query = appContext.query
//   return { ...appProps };
// };

// //   static async getInitialProps({Component, ctx}){
// //     let pageProps = {}
// //     if(Component.getInitialProps){
// //       pageProps = await Component.getInitialProps(ctx)
// //     }
// //     // this exposes the query to user
// //     pageProps.query = ctx.query
// //     return {pageProps};
// //   }


// export default MyApp;
