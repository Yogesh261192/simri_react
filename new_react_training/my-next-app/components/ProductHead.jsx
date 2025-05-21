import Head from "next/head";

export default function ProductHead({ product }) {
  // Example fallback if product.description missing
  const description = product.description 
    ? product.description.slice(0, 160) // keep meta description <160 chars
    : `Get details about ${product.name} on SIMDI – your reliable ride and delivery service to the Himalayas.`;

  // Generate canonical URL dynamically (assuming product.slug exists)
  const canonicalUrl = `https://simdi.in/products/${product.slug}`;

  // Keywords could be expanded dynamically, here static for example
  const keywords = [
    "ride booking",
    "delivery service",
    "Delhi to Himalayas",
    "Uttarakhand",
    "Himachal Pradesh",
    "eco-friendly travel",
    "Himalayan delivery",
    "pahadi transport",
    "SIMDI ride",
    "SIMDI delivery",
    product.name.toLowerCase(),
  ].join(", ");

  return (
    <Head>
      <title>{`The product ${product.name} | SIMDI`}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Yogesh Mamgain" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={`Book Ride or Delivery – ${product.name} | SIMDI`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />

      {/* Optional: Open Graph Image if product has image */}
      {product.image && (
        <meta property="og:image" content={product.image.url || product.image} />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`Book Ride or Delivery – ${product.name} | SIMDI`} />
      <meta name="twitter:description" content={description} />
      {product.image && (
        <meta name="twitter:image" content={product.image.url || product.image} />
      )}
       <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "about",
            name: "Simdi",
            url: `https://www.simdi.in/${product.name}`,
            image: product.image.url || product.image,
            description: "Buy authentic Pahadi and Uttarakhand products online",
            sameAs: [
              "https://www.instagram.com/yoursimdi/",
              "https://www.facebook.com/Yoursimdi"
            ]
          })}
        </script>
    </Head>
  );
}
