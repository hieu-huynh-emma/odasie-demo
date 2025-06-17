import { useEffect, useState } from 'react';
import { appConfig } from '@/configs/config';

// Define the type for window.grecaptcha
declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string },
      ) => Promise<string>;
    };
  }
}

export const useReCaptcha = () => {
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  // Load reCAPTCHA v3 script
  useEffect(() => {
    // Check if script is already loaded
    if (document.querySelector('script[src*="recaptcha/api.js"]')) {
      setRecaptchaLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${appConfig.recaptchaSiteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => setRecaptchaLoaded(true);
    document.head.appendChild(script);

    return () => {
      // Clean up script if component unmounts
      const loadedScript = document.querySelector(
        'script[src*="recaptcha/api.js"]',
      );
      if (loadedScript && loadedScript.parentNode) {
        loadedScript.parentNode.removeChild(loadedScript);
      }
    };
  }, []);

  const executeReCaptcha = async (
    action = 'form_submit',
  ): Promise<string | null> => {
    if (!window.grecaptcha || !recaptchaLoaded) {
      return null;
    }

    try {
      return new Promise<string | null>(resolve => {
        window.grecaptcha?.ready(async () => {
          try {
            const token = await window.grecaptcha?.execute(
              appConfig.recaptchaSiteKey,
              {
                action,
              },
            );
            resolve(token || null);
          } catch (error) {
            console.error(error);
            resolve(null);
          }
        });
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return {
    recaptchaLoaded,
    executeReCaptcha,
  };
};

export default useReCaptcha;
