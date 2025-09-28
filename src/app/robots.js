export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '*',
      disallow: '/private/',
    },
    sitemap: 'https://currencystrengthmeter.com/sitemap.xml',
  }
}