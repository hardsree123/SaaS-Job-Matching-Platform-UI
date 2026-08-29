import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'product';
  jsonLd?: Record<string, any>;
}

export function SEOHead({
  title = 'DibsMatch | Claim your next role — AI Job Matching SaaS & ATS Platform',
  description = 'Claim your next role with DibsMatch. Launch your own branded AI recruitment marketplace and ATS platform. Turnkey white-label SaaS with vector skill matching, dual candidate & recruiter portals, Kanban tracking, and Stripe monetization.',
  keywords,
  canonicalUrl,
  ogType = 'website',
  jsonLd,
}: SEOHeadProps) {
  const location = useLocation();
  const currentUrl = canonicalUrl || `https://dibsmatch.io${location.pathname}`;

  useEffect(() => {
    // Update Title
    document.title = title;

    // Helper to update or create meta tags
    const setMetaTag = (selector: string, attr: string, value: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        const [attrName, attrVal] = selector.replace('meta[', '').replace(']', '').split('=');
        element.setAttribute(attrName, attrVal.replace(/['"]/g, ''));
        document.head.appendChild(element);
      }
      element.setAttribute(attr, value);
    };

    // Update Primary Meta
    setMetaTag('meta[name="description"]', 'content', description);
    if (keywords) {
      setMetaTag('meta[name="keywords"]', 'content', keywords);
    }

    // Update Open Graph
    setMetaTag('meta[property="og:title"]', 'content', title);
    setMetaTag('meta[property="og:description"]', 'content', description);
    setMetaTag('meta[property="og:url"]', 'content', currentUrl);
    setMetaTag('meta[property="og:type"]', 'content', ogType);

    // Update Twitter Cards
    setMetaTag('meta[name="twitter:title"]', 'content', title);
    setMetaTag('meta[name="twitter:description"]', 'content', description);

    // Update Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // Inject Dynamic JSON-LD if provided
    let scriptEl: HTMLScriptElement | null = null;
    if (jsonLd) {
      scriptEl = document.createElement('script');
      scriptEl.type = 'application/ld+json';
      scriptEl.id = 'dynamic-route-jsonld';
      scriptEl.text = JSON.stringify(jsonLd);
      document.head.appendChild(scriptEl);
    }

    return () => {
      if (scriptEl && document.head.contains(scriptEl)) {
        document.head.removeChild(scriptEl);
      }
    };
  }, [title, description, keywords, currentUrl, ogType, jsonLd]);

  return null;
}
