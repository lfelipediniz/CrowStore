import Head from "next/head";
import Wrap from "../components/Wrap/Wrap";

export default function Home() {
  return (
    <>
      <Head>
        <meta httpEquiv="content-language" content="pt-br" />
        <meta
          name="description"
          content="CrowStore | Empresa especialista em moda desde de 2023."
        />
        <meta property="og:title" content="CrowStore | Street Fashion" />
        <meta property="og:site_name" content="CrowStore | Street Fashion"/>
        <meta property="og:description" content="CrowStore | Empresa especialista em Street Fashion."/>
        <title>CrowStore</title>
      </Head>
      <Wrap />
    </>
  );
}
