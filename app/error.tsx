'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Logged to console:', error);
  }, [error]);

  return (
    <html>
      <body className="flex h-screen flex-col items-center justify-center">
        <h1 className="typo-3xl-semibold text-primary-500">
          Something went wrong!
        </h1>
        <p className="mt-2 text-gray-600">{error.message}</p>
        <button
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          onClick={() => reset()}>
          Try Again
        </button>
      </body>
    </html>
  );
}
