import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DEFAULT_TITLE = 'OMA Shop | Luxury Watches, Fragrances, Hair and Accessories';
const DEFAULT_DESCRIPTION =
  'Shop premium fashion and lifestyle products at OMA Shop. Discover top sales, new arrivals, and pre-order batches.';
const DEFAULT_KEYWORDS =
  'OMA Shop, luxury store, watches, fragrances, hair, accessories, pre-order products';

function setMeta(selector, attribute, value) {
  const el = document.querySelector(selector);
  if (el) {
    el.setAttribute(attribute, value);
  }
}

function getSeoForPath(pathname) {
  if (pathname === '/') {
    return {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      keywords: DEFAULT_KEYWORDS,
      robots: 'index, follow',
    };
  }

  if (pathname === '/shop') {
    return {
      title: 'Shop Products | OMA Shop',
      description: 'Browse all OMA Shop products across watches, fragrances, hair, and accessories.',
      keywords: 'shop products, oma shop products, luxury products',
      robots: 'index, follow',
    };
  }

  if (pathname === '/pre-order' || pathname === '/pre-order/products') {
    return {
      title: 'Pre-Order Products | OMA Shop',
      description: 'Reserve products in upcoming pre-order batches and secure your slot before stock is available.',
      keywords: 'pre-order products, batch order, reserve products',
      robots: 'index, follow',
    };
  }

  if (pathname === '/about') {
    return {
      title: 'About OMA Shop',
      description: 'Learn about OMA Shop and our mission to provide premium products with trusted delivery.',
      keywords: 'about oma shop, oma shop story',
      robots: 'index, follow',
    };
  }

  if (pathname === '/contact') {
    return {
      title: 'Contact OMA Shop',
      description: 'Contact OMA Shop support for orders, product help, and general inquiries.',
      keywords: 'contact oma shop, customer support',
      robots: 'index, follow',
    };
  }

  if (pathname.startsWith('/product/')) {
    return {
      title: 'Product Details | OMA Shop',
      description: 'View product details, pricing, and purchase options on OMA Shop.',
      keywords: 'product detail, buy products online',
      robots: 'index, follow',
    };
  }

  if (pathname === '/cart') {
    return {
      title: 'Your Cart | OMA Shop',
      description: 'Review items in your OMA Shop cart before checkout.',
      keywords: 'shopping cart',
      robots: 'noindex, nofollow',
    };
  }

  if (pathname === '/checkout' || pathname === '/login' || pathname === '/register') {
    return {
      title: 'Secure Page | OMA Shop',
      description: 'Secure account and checkout page on OMA Shop.',
      keywords: 'checkout, login, register',
      robots: 'noindex, nofollow',
    };
  }

  return {
    title: 'OMA Shop',
    description: DEFAULT_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS,
    robots: 'index, follow',
  };
}

function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
    const page = getSeoForPath(pathname);
    const canonicalUrl = `${siteUrl}${pathname}`;
    const ogImage = `${siteUrl}/OmaShop.png`;

    document.title = page.title;
    setMeta('meta[name="description"]', 'content', page.description);
    setMeta('meta[name="keywords"]', 'content', page.keywords);
    setMeta('meta[name="robots"]', 'content', page.robots);
    setMeta('meta[property="og:title"]', 'content', page.title);
    setMeta('meta[property="og:description"]', 'content', page.description);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[property="og:image"]', 'content', ogImage);
    setMeta('meta[name="twitter:title"]', 'content', page.title);
    setMeta('meta[name="twitter:description"]', 'content', page.description);
    setMeta('meta[name="twitter:image"]', 'content', ogImage);
    setMeta('link[rel="canonical"]', 'href', canonicalUrl);
  }, [pathname]);

  return null;
}

export default SeoManager;
