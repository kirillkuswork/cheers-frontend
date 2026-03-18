import { TG_BOT_URL } from '@/consts/links';
import { ButtonIcon } from '@/widgets/Header/icons';
import { CrossIcn, Profile, Wishlist } from '@/assets/icons';

export const NAV_ITEMS = [
  {
    id: 1,
    text: 'О нас',
    href: '/about',
  },
  {
    id: 2,
    text: 'Партнёрам',
    href: '/partners',
  },
];
export const MOBILE_NAV_ITEMS = [
  {
    id: 1,
    text: 'Каталог',
    href: '/',
    target: '_self',
    icon: <ButtonIcon />,
    isHidden: false,
  },
  {
    id: 2,
    text: 'Войти',
    href: '/',
    target: '_self',
    icon: <Profile />,
    onClick: null,
    isHidden: false,
  },
  {
    id: 3,
    text: 'Выйти',
    href: '/',
    target: '_self',
    icon: <CrossIcn />,
    onClick: null,
    isHidden: false,
  },
  {
    id: 4,
    text: 'Избранное',
    href: '/favorites',
    target: '_self',
    icon: <Wishlist />,
    isHidden: false,
  },
  {
    id: 5,
    text: 'О нас',
    href: '/about',
    target: '_self',
    isHidden: false,
  },
  {
    id: 6,
    text: 'Партнёрам',
    href: '/partners',
    target: '_self',
    isHidden: false,
  },
  {
    id: 7,
    text: '@cheers_support',
    href: TG_BOT_URL,
    target: '_blank',
    isHidden: false,
  },
];
