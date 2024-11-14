import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Navigation.module.scss';
import { navigationData, currentLanguages } from '@/data';
import Link from 'next/link';
import TranslatorBtnBlock from '../share/TranslatorBtnBlock/TranslatorBtnBlock';

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
          if (item.titleEn !== 'Contacts')
            return (
              <li key={item.id} onClick={onClick}>
                <Link href={item.path} className={styles.text}>
                  {i18n.language === currentLanguages.EN
                    ? item.titleEn
                    : item.title}
                </Link>
              </li>
            );
        })}
      </ul>
    </div>
  );
};

export default Navigation;
