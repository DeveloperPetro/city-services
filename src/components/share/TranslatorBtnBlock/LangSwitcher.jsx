'use client';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import styles from './TranslatorBtnBlock.module.scss';

const languagesList = [
  { id: v4(), title: 'UKR' },
  { id: v4(), title: 'ENG' },
  { id: v4(), title: 'RUS' },
];

export const LangSwitcher = ({ changeLanguage, currentLanguage }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(() =>
    currentLanguage === 'ua' ? 'UKR' : 'ENG'
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1366);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const closeLangSwitcher = () => {
    setTimeout(() => {
      setOpen(!open);
    }, 250);
  };

  const onHandleChange = () => {
    setLang((prev) => (prev === 'UKR' ? 'ENG' : 'UKR'));
    const languageUser = lang === 'UKR' ? 'en' : 'ua';
    changeLanguage(languageUser);
  };
  return (
    <div className={styles.langSwitcherContainer}>
      <button className={styles.langTitle} onClick={closeLangSwitcher}>
        {lang}
      </button>
      <ul
        className={
          open
            ? styles.langSwitcher + ' ' + styles.langSwitcherOpen
            : styles.langSwitcherClose + ' ' + styles.langSwitcher
        }
      >
        {languagesList
          .filter(({ title }) => isMobile || title !== lang)
          .map(({ id, title }) => (
            <li
              key={id}
              className={
                lang === title
                  ? styles.langSwitcherActive
                  : styles.langSwitcherItem
              }
              onClick={() => onHandleChange(title)}
            >
              {title}
            </li>
          ))}
      </ul>
    </div>
    // <div className={styles.langSwitcher}>
    //     <span className={styles.langIndicator}>{lang}</span>
    //     <div className={styles.langToggle} onClick={onHandleChange}>
    //         <div className={lang === "Укр" ? styles.ball : styles.ball + " " + styles.ballEng}
    //         ></div>
    //     </div>
    // </div>
  );
};
