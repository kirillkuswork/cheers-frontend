/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-extraneous-dependencies */
import { AppProps } from 'next/app';
import '@/styles/globals.scss';
import '@/styles/mixins.scss';
import { BreakpointProvider } from '@/shareds/providers/BreakpointContext';
import { YandexMetricaProvider } from 'next-yandex-metrica';
import { wrapper } from '@/redux/store/store';
import { useGetEnumQuery } from '@/redux/services/enumApi';
import { AuthProvider } from '@/providers/AuthProvider';
import { ModalProvider } from '@/shareds/providers/ModalProvider';

function MyApp({ Component, pageProps }: AppProps) {
  useGetEnumQuery();
  return (
    <YandexMetricaProvider
      tagID={97442541}
      initParameters={{ clickmap: true, trackLinks: true, accurateTrackBounce: true }}
    >
      <ModalProvider>
        <AuthProvider>
          <BreakpointProvider>
            <Component {...pageProps} />
          </BreakpointProvider>
        </AuthProvider>
      </ModalProvider>
    </YandexMetricaProvider>
  );
}

export default wrapper.withRedux(MyApp);
