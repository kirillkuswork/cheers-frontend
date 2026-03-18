/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/style-prop-object */
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ru">
        <Head>
          {/* <link rel="icon" href="/favicon.ico" /> */}

          <link rel="icon" href="/apple-icn.png" type="image/png" />
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
          <link rel="mask-icon" href="/favicon.svg" color="#F11969" />
          <link
            href="https://fonts.googleapis.com/css2?family=Onest&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap"
            rel="stylesheet"
          />
          <meta name="description" content="Cheers, выбор со вкусом" />
          <meta
            name="keywords"
            content="сервис для поиска, выбора и покупки алкоголя, алкогольный напиток, сканер этикетки, редкие напитки, поможем быстро выбрать качественный и вкусный напиток под ваш вкус, вкусовой профиль клиента, сообщество профессиональных сомелье, привлекать новых покупателей и повышать уровень лояльности к вашему бренду, отзывы экспертов, партнерская скидка, честные отзывы, выгодные предложения, ближайший магазин для покупки алкоголя, события и мероприятия в мире алкоголя, выбор напитков, алкомаркет, купить алкоголь, доставка алкоголя, cheers, чирз, видеообзоры и трансляции про алкоголь, лучшие алкогольные напитки, поиск алкоголя по этикетке, дегустация вин, сканер этикетки, реклама алкоголя, каталог алкоголя"
          />
          <meta name="author" content="cheers" />
          <meta property="og:title" content="Cheers" />
          <meta property="og:description" content="Cheers, выбор со вкусом" />
          {/* <meta property="og:image" content="URL картинки для соцсетей" /> */}
          {/* <meta property="og:url" content="URL вашей страницы" /> */}
          {/* <meta name="twitter:card" content="summary_large_image" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
