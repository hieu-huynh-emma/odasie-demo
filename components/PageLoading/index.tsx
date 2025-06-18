'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Spinner } from '../ui/spinner';

function PageLoading() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    // const timeout = setTimeout(() => {
    //   setLoading(false);
    // }, 500);

    // return () => clearTimeout(timeout);

    window.addEventListener('load', () => setLoading(false));

  }, [pathname]); // Trigger the effect on route change


  return (
    <div>
      {loading ? (
        <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-[#FFFFFF] bg-opacity-50">
          <Spinner size="large" />
        </div>
      ) : null}
    </div>
  );
}

export default PageLoading;
