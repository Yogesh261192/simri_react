// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Font Awesome CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {/* Note: Don't include <title> here */}
        <meta name="description" content="E-commerce for Himalayas and ride facility for driving and NGO" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
