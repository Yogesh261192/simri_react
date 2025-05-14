import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ScrollToTop() {
  const { pathname } = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [pathname]); // Runs when the route changes

  return null;
}
