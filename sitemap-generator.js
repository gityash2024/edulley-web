// sitemap-generator.js
const fs = require('fs');
const path = require('path');

const routes = [
  '/',
  '/courses',
  '/courses-list',
  '/compare',
  '/institutions',
  '/scholarship',
  '/exam-ielts',
  '/ielts-topic',
  '/ielts-cue-card',
  '/ielts-essay',
  '/sop',
  '/lor',
  '/blog',
  '/blog-details',
  '/institution-details',
  '/faq',
  '/terms-and-condition',
  '/privacy-policy',
  '/refund-policy',
  '/contact-us',
  '/profile',
  '/career-path',
  '/course-details',
  '/carrer-details',
  '/chat-support'
];

const domain = 'https://edulley.com';

const generateSitemap = (routes) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes.map((route) => {
      return `
      <url>
        <loc>${domain}${route}</loc>
        <priority>0.80</priority>
      </url>`;
    }).join('')}
  </urlset>`;
  return xml;
};

const sitemap = generateSitemap(routes);
fs.writeFileSync(path.resolve(__dirname, 'public/sitemap.xml'), sitemap, 'utf8');
console.log('Sitemap generated successfully.');
