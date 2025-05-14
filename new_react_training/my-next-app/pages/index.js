import Hero from '../components/Hero';
import Header from '../components/Header';
import Footer from '../components/footer';
import Services from '../components/Services';
import Products from '../components/products';
import Head from 'next/head';

export default function HomePage() {
  return (
    <>
    <Head>
        <title>SIMDI</title>
        <meta name="description" content="pahadi and uttrakhand products as well as cab booking for char dham and all desitanation in himachal and uttrakhand" />
        <meta name="keywords" content="pahadi, uttrakhand, simdi, ride, booking, products,
        mahila, mandal" />
        <meta name="author" content="yogesh mamgain" />
        <link rel="canonical" href="http://simdi.in" />
        {/* Open Graph / Facebook */}
        <meta property="og:title" content="SIMDI" />
        <meta property="og:description" content="simdi." />
        <meta property="og:url" content="http://simdi.in" />
        <meta property="og:type" content="website" />
        {/* Twitter */}
        {/* <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Your Page Title" />
        <meta name="twitter:description" content="Your social media preview text." /> */}
      </Head>
      <main>
      <Header />
      <Hero />
      <Services/>
      <Products/>
      <Footer />
      </main>
    </>
  )}