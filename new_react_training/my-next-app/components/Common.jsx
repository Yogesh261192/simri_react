import { useRouter } from 'next/router';

const useRedirect = () => {
  const router = useRouter();
  
  const redirect = (path) => {
    router.push(path); // Use Next.js router.push for navigation
  };

  return redirect;
};

export { useRedirect };
