import Document, { Head, Html, Main, NextScript } from "next/document";
import { createStitches } from "@stitches/react";

const stitches = createStitches();

const reset = ` *,
*:after,
*:before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
  font-family: sans-serif;
}

body {
  box-sizing: border-box;
}`;

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <style>{reset}</style>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: stitches.getCssText() }}
          />
          <link rel="icon" type="image/png" href="/favicon.ico" sizes="16x16" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
