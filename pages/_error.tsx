import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';

function ErrorPage({ statusCode }: { statusCode: number }) {
  const router = useRouter();

  useEffect(() => {
    if (statusCode === 404 || statusCode === 500) {
      router.replace('/');
    }
  }, [router, statusCode]);
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  let statusCode = 404;
  if (res) statusCode = res.statusCode;
  else if (err?.statusCode) statusCode = err.statusCode;
  return { statusCode };
};

export default ErrorPage;
