// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        {/* 🔽 Add CDN here — for example, Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        //   integrity="sha512-y2ebcMZHBaREyMg4/ZoG7O2g7jVj9Ya+haxDoVnF5vHJbXIBDHD0kyaJhJm2NLaKdwThwGSc1jBhAk3E87eOog=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
                  <title>SIMDI</title>
          <meta name="description" content="E-commerce for Himalayas and ride facility for driving and NGO" />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
