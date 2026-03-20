import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="cs">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#1565c0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9033242502600387"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
