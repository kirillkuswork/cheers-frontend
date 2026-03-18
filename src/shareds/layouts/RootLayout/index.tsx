import { Suspense } from 'react';
import Metrika from '../../../../Metrika';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function RootLayout({ children }: any) {
  return (
    <html lang="ru">
      <body>
        <main>{children}</main>
        <Suspense>
          <Metrika />
        </Suspense>
      </body>
    </html>
  );
}
