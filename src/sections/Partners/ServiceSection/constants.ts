import {
  BarcodeIcon,
  BeerBottleIcon,
  BinocularsIcon,
  CalendarHeartIcon,
  ThumbsUpIcon,
  UsersThreeIcon,
} from './icons';

const SERVICE_ITEMS = [
  {
    id: 1,
    title: 'Надёжный гид',
    text: 'Собираем и создаём важную информацию для выбора и обогащаем мнением независимых экспертов',
    icon: BeerBottleIcon(),
  },
  {
    id: 2,
    title: 'Сообщество пользователей',
    text: 'Мы собираем мнения людей об алкогольной продукции со всего интернета и даём пользователям возможность открыто делиться своими впечатлениями о напитках и магазинах',
    icon: UsersThreeIcon(),
  },
  {
    id: 3,
    title: 'Технологии computer vision',
    text: 'Создаём технологии поиска, позволяющие быстро определять напитки и узнавать, что они из себя представляют',
    icon: BarcodeIcon(),
  },
  {
    id: 4,
    title: 'Помощник в поиске алкоголя',
    text: 'Помогаем найти и выгодно купить самый подходящий напиток',
    icon: BinocularsIcon(),
  },
  {
    id: 5,
    title: 'Сообщество экспертов',
    text: 'Эксперты создают на напитки, подробно рассказывая про историю, вкусовые ощущения и прочие важные характеристики, интересующие пользователей',
    icon: ThumbsUpIcon(),
  },
  {
    id: 6,
    title: 'Афиша',
    text: 'Рассказываем о важных событиях и мероприятиях в мире алкоголя',
    icon: CalendarHeartIcon(),
  },
];

export default SERVICE_ITEMS;
