import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { TG_BOT_URL, APP_STORE, GOOGLE_PLAY } from '@/shareds/consts/links';

function Redirect() {
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;

    if (/android/i.test(userAgent)) {
      window.location.href = GOOGLE_PLAY;
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      window.location.href = APP_STORE;
    } else {
      window.location.href = TG_BOT_URL;
    }
  }, []);

  return null;
}

export default Redirect;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const userAgent = req.headers['user-agent'] || '';

  if (/android/i.test(userAgent)) {
    res.writeHead(302, { Location: GOOGLE_PLAY });
  } else if (/iPad|iPhone|iPod/.test(userAgent)) {
    res.writeHead(302, { Location: APP_STORE });
  } else {
    res.writeHead(302, { Location: TG_BOT_URL });
  }
  res.end();

  return { props: {} };
};
