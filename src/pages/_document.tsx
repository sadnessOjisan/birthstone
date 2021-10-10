import Document, { Head, Html, Main, NextScript } from "next/document";
import { createStitches } from "@stitches/react";
import { getCssText } from "../util/stitches.config";

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
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
          <link rel="icon" type="image/png" href="/favicon.ico" sizes="16x16" />
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta property="og:site_name" content="Birthstone" />
          <meta
            property="og:image"
            content="https://birthstone.web.app/ogp.png"
          />
          <meta property="og:url" content="https://birthstone.web.app" />
          <meta property="og:title" content="birthstone" />
          <meta name="twitter:creator" content="@sadnessOjisan" />
          <meta
            property="og:description"
            content="ソシャゲの過去リリース日を一覧できるカレンダーです。周年アイテムをたくさん貰って、たくさんガチャを引いて、たくさんリセマラしよう。"
          />
          <meta name="twitter:card" content="summary" />
          <link rel="manifest" href="manifest.json" />
          <title>Birthstone</title>
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
