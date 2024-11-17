'use client';
import { SiteContext } from '@/context/SiteContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import styles from './TranslatorBtnBlock.module.scss';

const languagesList = [
  { id: v4(), title: 'UKR' },
  { id: v4(), title: 'ENG' },
  { id: v4(), title: 'RUS' },
];

export const LangSwitcher = ({ changeLanguage, currentLanguage }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [lang, setLang] = useState(() =>
    currentLanguage === 'ua' ? 'UKR' : 'ENG'
  );

  const { openLangSwitcher, setOpenLangSwitcher } = useContext(SiteContext);

  const containerRef = useRef(null);

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
      setOpenLangSwitcher(!openLangSwitcher);
    }, 250);
  };

  const onHandleChange = () => {
    setLang((prev) => (prev === 'UKR' ? 'ENG' : 'UKR'));
    const languageUser = lang === 'UKR' ? 'en' : 'ua';
    changeLanguage(languageUser);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpenLangSwitcher(false);
      }
    };

    if (openLangSwitcher) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openLangSwitcher]);
  return (
    <div className={styles.langSwitcherContainer} ref={containerRef}>
      <button className={styles.langTitle} onClick={closeLangSwitcher}>
        {lang}
      </button>
      <ul
        className={
          openLangSwitcher
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
