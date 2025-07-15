import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export function SEOHead({
  title = 'كليدچ - Kledje | متجر العناية بالبشرة والشعر الطبيعية',
  description = 'اكتشفي أفضل منتجات العناية بالبشرة والشعر الطبيعية في متجر كليدچ. منتجات عالية الجودة بأسعار مناسبة مع توصيل مجاني داخل مصر.',
  keywords = 'كليدچ, kledje, منتجات طبيعية, عناية بشرة, عناية شعر, متجر تجميل, منتجات جمال, كريمات, سيروم, زيوت شعر',
  image = '/lovable-uploads/9d8b59e3-ff2b-428f-bea9-4301b56293b4.png',
  url = 'https://kledje.com'
}: SEOHeadProps) {
  
  useEffect(() => {
    // تحديث عنوان الصفحة
    document.title = title;
    
    // تحديث meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };

    // SEO Meta Tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph Meta Tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', 'website', true);
    
    // Twitter Meta Tags
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    
    // Structured Data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Store",
      "name": "كليدچ - Kledje",
      "description": description,
      "url": url,
      "logo": image,
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": ["Arabic", "English"]
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "EG"
      }
    };

    let scriptElement = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify(structuredData);
    
  }, [title, description, keywords, image, url]);

  return null;
}