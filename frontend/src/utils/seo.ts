// SEO helper for meta tags
export const SEO = {
  home: {
    title: 'Biovitam - Organic Biofertilizers for Kenya',
    description: 'Premium organic biofertilizers for floriculture and agriculture in Kenya. KEPHIS & ECOCERT certified. Increase crop yields, improve soil health.',
    keywords: 'biofertilizers Kenya, organic fertilizers, floriculture, agriculture, crop growth, sustainable farming',
    ogImage: '/og-image.jpg',
  },
  products: {
    title: 'Our Products - Biovitam Biofertilizers',
    description: 'Explore our 4 scientifically formulated biofertilizer products. All Growth, Strong Plant, Bloom Booster, and Root Vigor.',
    keywords: 'biofertilizer products, NPK ratios, organic fertilizers, plant nutrients, crop fertilizers Kenya',
  },
  about: {
    title: 'About Biovitam - Organic Biofertilizer Company',
    description: 'Learn about Biovitam (Nova Gardens Ltd). Founded 2015, KEPHIS and ECOCERT certified organic biofertilizers for sustainable agriculture.',
    keywords: 'about Biovitam, organic certification, sustainable agriculture Kenya, Nova Gardens Ltd',
  },
  benefits: {
    title: 'Benefits of Biofertilizers - Biovitam',
    description: 'Discover how Biovitam biofertilizers increase crop yields, improve soil health, and support sustainable farming practices.',
    keywords: 'biofertilizer benefits, crop yield increase, soil health, sustainable agriculture, organic farming benefits',
  },
  contact: {
    title: 'Contact Biovitam - Biofertilizers Kenya',
    description: 'Get in touch with Biovitam. Off Thika Road, Kenya. Email, phone, WhatsApp, or contact form. KEPHIS certified biofertilizers.',
    keywords: 'contact Biovitam, biofertilizer supplier Kenya, agricultural supplier contact',
  },
}

export const updatePageMeta = (
  title: string,
  description: string,
  keywords?: string,
  ogImage?: string
) => {
  // Title
  document.title = title

  // Meta description
  let metaDescription = document.querySelector('meta[name="description"]')
  if (!metaDescription) {
    metaDescription = document.createElement('meta')
    metaDescription.setAttribute('name', 'description')
    document.head.appendChild(metaDescription)
  }
  metaDescription.setAttribute('content', description)

  // Meta keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]')
  if (!metaKeywords && keywords) {
    metaKeywords = document.createElement('meta')
    metaKeywords.setAttribute('name', 'keywords')
    document.head.appendChild(metaKeywords)
  }
  if (metaKeywords && keywords) {
    metaKeywords.setAttribute('content', keywords)
  }

  // OpenGraph tags
  let ogTitle = document.querySelector('meta[property="og:title"]')
  if (!ogTitle) {
    ogTitle = document.createElement('meta')
    ogTitle.setAttribute('property', 'og:title')
    document.head.appendChild(ogTitle)
  }
  ogTitle.setAttribute('content', title)

  let ogDescription = document.querySelector('meta[property="og:description"]')
  if (!ogDescription) {
    ogDescription = document.createElement('meta')
    ogDescription.setAttribute('property', 'og:description')
    document.head.appendChild(ogDescription)
  }
  ogDescription.setAttribute('content', description)

  if (ogImage) {
    let ogImageMeta = document.querySelector('meta[property="og:image"]')
    if (!ogImageMeta) {
      ogImageMeta = document.createElement('meta')
      ogImageMeta.setAttribute('property', 'og:image')
      document.head.appendChild(ogImageMeta)
    }
    ogImageMeta.setAttribute('content', ogImage)
  }
}
