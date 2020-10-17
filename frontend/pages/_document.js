import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}


// import Document, { Html, Head, Main, NextScript } from "next/document";

// class MyDocument extends Document {
//   static async getInitialProps(ctx) {
//     const initialProps = await Document.getInitialProps(ctx);
//     return { ...initialProps };
//   }

//   render() {
//     return (
//       <Html>
//         <Head />
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }

// export default MyDocument;


// import Document, { Head, Main, NextScript } from "next/document";
// import { ServerStyleSheet } from "styled-components";

// export default class MyDocument extends Document {
//   static getInitialProps({renderPage}) {
//     const sheet = new ServerStyleSheet();
//     // const initialProps = await Document.getInitialProps(ctx);

//     const styleTags = sheet.getStyleElement();
//     const page =renderPage((App) => (props) =>
//     sheet.collectStyles(<App {...props} />)
//     );
//     return {...page, styleTags };
//   }

//   render() {
//     return (
//       <html>
//         <Head>{this.props.styleTags}</Head>
//         <body>
//           <Main/>
//           <NextScript />
//         </body>
//       </html>
//     );
//   }
// }

// export default MyDocument;
