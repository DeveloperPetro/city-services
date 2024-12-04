import { v4 } from 'uuid';


export const navigationData = [
  {
    id: v4(),
    title: 'Апартаменти',
    titleEn: 'Apartments',
    titleRu: 'Апартаменты',
    path: '/apartments',
  },
  {
    id: v4(),
    title: 'Правила',
    titleEn: 'Rules',
    titleRu: 'Правила',
    path: '/rules',
  },
  {
    id: v4(),
    title: 'Політика конфіденційності',
    titleEn: 'Privacy Policy',
    titleRu: 'Политика конфиденциальности',
    path: '/privacy-policy.pdf',
    rel: 'noopener noreferrer',
    target: '_blank',
  },
];