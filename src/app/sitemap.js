export default function sitemap() {
  return [
    {
      url: 'https://currencystrenghthmeter.com/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://currencystrengthmeter.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://currencystrengthmeter.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
        url: 'https://currencystrengthmeter.com/blog/use-currency-strength-meter',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
    },
    {
        url: 'https://currencystrengthmeter.com/blog/top-5-strategies',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
    },
    {
        url: 'https://currencystrengthmeter.com/blog/short-vs-long-term',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
    },
    {
      url: 'https://currencystrengthmeter.com/privacy-policy',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://currencystrengthmeter.com/terms',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}