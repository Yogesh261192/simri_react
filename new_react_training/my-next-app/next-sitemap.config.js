/*/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://simdi.in',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/emailverification', '/layout', '/product-detail'], // exclude internal pages
};