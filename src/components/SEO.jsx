import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title, 
  description,
  robotsContent = "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  canonicalUrl = null,
  language = "English",
  author = "Edulley",
  revisitAfter = "1 days",
  ogType = "website",
  ogUrl = null,
  ogTitle = null,
  ogDescription = null,
  ogImage = "https://edulley.com/logo.png",
  twitterCard = "summary_large_image",
  twitterTitle = null,
  twitterDescription = null,
  twitterImage = null,
  contentType = "text/html; charset=utf-8",
  keywords = "",
  schema = null
}) => {
  const location = useLocation();
  const baseUrl = 'https://edulley.com';
  const canonical = canonicalUrl || `${baseUrl}${location.pathname}`;

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta name="robots" content={robotsContent} />
      
      <meta httpEquiv="Content-Type" content={contentType} />
      <meta name="language" content={language} />
      <meta name="revisit-after" content={revisitAfter} />
      <meta name="author" content={author} />
      {keywords && <meta name="keywords" content={keywords} />}

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={ogUrl || canonical} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Edulley" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={twitterTitle || ogTitle || title} />
      <meta name="twitter:description" content={twitterDescription || ogDescription || description} />
      <meta name="twitter:image" content={twitterImage || ogImage} />
      
      <link rel="canonical" href={canonical} />
      
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;