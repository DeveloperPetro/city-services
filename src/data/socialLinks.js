import { v4 } from 'uuid';

export const socialLinks = [
  {
    id: v4(),
    title: 'Telephone',
    subtitle: '+380 (95) 451 50 57',
    img: '/social-links/Telephone.webp',
    href: 'tel:+380954515057',
    icon: '/sprite.svg#phone-new'
  },
  {
    id: v4(),
    title: 'Instagram',
    subtitle: 'DailyRent_Kyiv',
    img: '/social-links/Instagram.webp',
    href: 'https://www.instagram.com/daily.rent.sumy',
    icon: '/sprite.svg#instagram-new'
  },
  {
    id: v4(),
    title: 'Facebook',
    subtitle: 'DailyRent_Kyiv',
    img: '/social-links/Facebook.webp',
    href: '#',
    icon: '/sprite.svg#facebook-new'
  },
];
