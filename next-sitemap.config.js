/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.multihatsblog.com/",
  generateRobotsTxt: false,
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/admin", "/api"],
};
