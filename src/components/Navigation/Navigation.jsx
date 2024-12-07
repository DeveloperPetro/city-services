import React from 'react';
import { useTranslation } from 'react-i18next';
import { navigationData, currentLanguages } from '@/data';
import Link from 'next/link';
import TranslatorBtnBlock from '../share/TranslatorBtnBlock/TranslatorBtnBlock';
import styles from './Navigation.module.scss';


const Navigation = ({ className, onClick, id, isClient }) => {
  const { i18n } = useTranslation();


  return (
    <div className={styles.container + ' ' + `${className}`}>
      <button className={styles.btnClose} onClick={onClick}>
        <svg>
          <use href="sprite.svg#icon-close" />
        </svg>
      </button>
      <TranslatorBtnBlock isClient={isClient} />
      <ul className={styles.navList} id={id}>
        {navigationData.slice(0, 4).map((item) => {
          return (
            <li key={item.id} onClick={onClick}>
              <Link
                href={item.path}
                {...(item.title === 'Політика конфіденційності' && {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                })}
                className={styles.text}
              >
                {((i18n.language === currentLanguages.EN) && item.titleEn) || ((i18n.language === currentLanguages.RU) && item.titleRu) || item.titleUa}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};


export default Navigation;