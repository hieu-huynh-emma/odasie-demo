//lib/tracking/index.ts
'use client';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export type VisitorType = 'visitor' | 'customer';

// Initialize dataLayer if it's not already
const initDataLayer = () => {
  if (typeof window !== 'undefined' && !Array.isArray(window.dataLayer)) {
    window.dataLayer = [];
  }
};
// Basic event push to dataLayer
const pushEvent = (event: string, data: Record<string, any> = {}) => {
  const payload = { event, ...data };
  if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  } else {
    console.warn('[dataLayer] Not initialized. Event not pushed:', payload);
  }
};

/**
 * Tracks user data on page load.
 * @param visitor_type "visitor" or "customer"
 * @param language Current site language
 * @param currency Current site currency
 * @param customer Optional customer object for logged-in users
 */
export const trackUserData = (
  visitor_type: VisitorType,
  language: string,
  currency: string,
  customer?: { email: string; phone: string },
) => {
  initDataLayer();
  const data: Record<string, any> = { visitor_type, language, currency };
  if (visitor_type === 'customer' && customer) {
    data.customer = customer;
  }
  pushEvent('user_data', data);
};

/**
 * Tracks a page view.
 * @param {string} language - The language of the page.
 * @param {string} currency - The currency used on the page.
 * @param {string} visitor_type - The type of visitor (e.g., "visitor", "customer").
 * @param {string} [email] - The email of the logged-in user (optional).
 */
export const trackPageView = (
  language: string,
  currency: string,
  visitor_type: VisitorType,
  email?: string,
  page?: string,
) => {
  initDataLayer();
  const data: Record<string, any> = { language, currency, visitor_type };
  if (email) data.email = email;
  if (page) data.page = page;
  pushEvent('page_view', data);
};

/**
 * Tracks a voyage view.
 * @param {string} country - The country of the voyage.
 * @param {string} language - The language of the page.
 */
export const trackVoyageView = (country: string, language: string) => {
  initDataLayer();
  pushEvent('voyage_view', { country, language });
};

/**
 * Tracks a form submission (Devis).
 * @param {string} email - The user's email.
 * @param {string} phone - The user's phone number.
 * @param {string} first_name - The user's first name.
 * @param {string} last_name - The user's last name.
 */
export const trackFormSubmitDevis = (
  email: string,
  phone: string,
  first_name: string,
  last_name: string,
) => {
  initDataLayer();
  pushEvent('form_submit_devis', { email, phone, first_name, last_name });
};

/**
 * Tracks a form submission (Contact).
 * @param {string} email - The user's email.
 */
export const trackFormSubmitContact = (
  email: string,
  firstName: string,
  lastName: string,
  topic: string,
) => {
  initDataLayer();
  pushEvent('form_submit_contact', {
    email,
    first_name: firstName,
    last_name: lastName,
    topic,
  });
};

/**
 * Tracks a form submission (Newsletter).
 * @param {string} email - The user's email.
 */
export const trackFormSubmitNewsletter = (email: string) => {
  initDataLayer();
  pushEvent('form_submit_newsletter', { email });
};

/**
 * Tracks search.
 * @param {string} country - The country of the voyage.
 * @param {string} arrival - The arrival of the voyage.
 * @param {number | string} duration_range - The duration range of the voyage.
 * @param {string} category - The category of the voyage.
 */
export const trackSearch = (
  country: string,
  arrival: string,
  duration_range: number | string,
  category: string,
) => {
  initDataLayer();
  pushEvent('search', { country, arrival, duration_range, category });
};

/**
 * Tracks CTA click.
 * @param {string} type - The type of CTA (e.g., "voyage", "contact", "social_icon", "call_website").
 */
export const trackClickCTA = (type: string) => {
  initDataLayer();
  pushEvent('click_cta', { type });
};

/**
 * Tracks category click.
 * @param {string} category - The category of the voyage.
 */
export const trackClickCategory = (category: string) => {
  initDataLayer();
  pushEvent('click_category', { category });
};

export const trackExpandCategoryGroup = (category: string) => {
  initDataLayer();
  pushEvent('expand_category_group', { category });
};

/**
 * Tracks contact click.
 * @param {string} type - The type of contact (e.g., "phone", "email").
 */
export const trackClickContact = (type: 'phone' | 'email') => {
  initDataLayer();
  pushEvent('click_contact', { type });
};

/**
 * Tracks social icon click.
 * @param {string} type - The type of social icon (e.g., "facebook", "instagram", "linkedin", "twitter").
 */
export const trackClickSocialIcon = (type: string) => {
  initDataLayer();
  pushEvent('click_social_icon', { type });
};

/**
 * Tracks call initiation on website.
 */
export const trackCallWebsite = () => {
  initDataLayer();
  pushEvent('call_website');
};

/**
 * SPA page view and user_data tracking hook.
 */
export const useSPAPageViewTracking = (
  language: string,
  currency: string,
  visitor_type: VisitorType,
  email?: string,
) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams.toString();
    const url = pathname + (search ? `?${search}` : '');
    // Ensure initialization and user data
    trackUserData(
      visitor_type,
      language,
      currency,
      email
        ? { email, phone: '' } // pass phone if available
        : undefined,
    );
    // Push page_view with all params
    trackPageView(language, currency, visitor_type, email, url);
  }, [pathname, searchParams, language, currency, visitor_type, email]);
};
