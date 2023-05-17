import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      <div id="globalLoader">
        <img
          src="/CrowStore/logos/logo-crow-black-512x512.webp"
          alt="Logo CrowStore"
        />
      </div>
    </Html>
  );
}
