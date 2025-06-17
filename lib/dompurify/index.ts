let DPurify: {
  sanitize: (dirty: string, options?: any) => string;
};

if (typeof window !== 'undefined') {
  // Client-side: use full DOMPurify (lazy loaded)
  import('dompurify').then(({ default: DOMPurify }) => {
    DPurify = DOMPurify(window);
  });

  // Temporary fallback until DOMPurify loads
  DPurify = {
    sanitize: (dirty: string) => dirty || '',
  };
} else {
  // Server-side: use lightweight sanitization
  DPurify = {
    sanitize: (dirty: string) => {
      if (!dirty || typeof dirty !== 'string') return '';

      return dirty
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .replace(/<iframe\b[^>]*>/gi, '')
        .replace(/<object\b[^>]*>/gi, '')
        .replace(/<embed\b[^>]*>/gi, '')
        .replace(/<applet\b[^>]*>/gi, '')
        .replace(/<meta\b[^>]*>/gi, '')
        .replace(/<link\b[^>]*>/gi, '')
        .replace(/data:(?!image\/)/gi, '');
    },
  };
}

export const DOMPurifyServer = DPurify;
