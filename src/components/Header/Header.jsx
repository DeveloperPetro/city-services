'use client';
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import Link from 'next/link';
import BurgerBtn from '../BurgerBtn/BurgerBtn';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import TranslatorBtnBlock from '../share/TranslatorBtnBlock/TranslatorBtnBlock';
import SocialLinks from '../SocialLinks/SocialLinks';
import { SiteContext } from '@/context/SiteContext';
import { currentLanguages, navigationData } from '@/data';
import styles from './Header.module.scss';


const Header = () => {
  const session = useSession();
  const pathname = usePathname();

  const { t, i18n } = useTranslation();

  const [burgerMenu, setBurgerMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {
    scrolledWindow,
    setScrolledWindow,
    openLangSwitcher,
    setOpenLangSwitcher,
  } = useContext(SiteContext);

  const isClient = typeof window !== 'undefined';
  const isDocument = typeof document !== 'undefined';

  const handleResize = useCallback(() => {
    if (
      window.innerWidth < 1366 ||
      (session.status === 'authenticated' && window.innerWidth < 1200)
    ) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [session.status]);

  const header = isDocument && document.getElementById('header');

  const headerScrollclassName = useCallback(() => {
    if (openLangSwitcher) {
      setOpenLangSwitcher(false);
    }
    if (burgerMenu) {
      closeBurgerMenu();
    }
    if (window.scrollY <= 12) {
      header.classList.remove(`${styles.containerHidden}`);
      header.classList.add(`${styles.containerVisible}`);
    } else if (window.scrollY > scrolledWindow) {
      header.classList.add(`${styles.containerHidden}`);
      header.classList.remove(`${styles.containerVisible}`);
    } else {
      header.classList.remove(`${styles.containerHidden}`);
      header.classList.add(`${styles.containerVisible}`);
    }

    setScrolledWindow(window.scrollY);
    // eslint-disable-next-line
  }, [
    openLangSwitcher,
    burgerMenu,
    scrolledWindow,
    setScrolledWindow,
    header?.classList,
  ]);

  const closeBurgerMenu = () => {
    setTimeout(() => {
      setBurgerMenu(false);
    }, 250);
  };

  const closeBurgerMenuOnClick = useCallback((e) => {
    const isBurgerButton = e.target.closest(`#burgerBtn`);
    if (
      isBurgerButton ||
      e.target.id === 'mobileNavigation' ||
      e.target.nodeName === 'use' ||
      e.target.nodeName === 'svg'
    ) {
      return;
    } else {
      closeBurgerMenu();
    }
  }, []);

  useEffect(() => {
    setIsLoading(false);
    // Add an event listener for window resize

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', headerScrollclassName, {
      passive: true,
    });
    window.addEventListener('click', closeBurgerMenuOnClick);

    // Initial check on component mount
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', headerScrollclassName, {
        passive: true,
      });
      window.removeEventListener('click', closeBurgerMenuOnClick);
    };
  }, [handleResize, headerScrollclassName, closeBurgerMenuOnClick]);

  return (
    <header id="header" className={styles.container}>
      <div className={styles.promotion}>
        {!isLoading && <p>{t('Header.headerSale')}</p>}
      </div>
      <div className={styles.navBarContainer}>
        <div className={`${styles.navBar} container`}>
          {!isMobile && (
            <div className={styles.leftLinks}>
              {!isLoading &&
                navigationData.slice(0, 2).map((item) => (
                  <Link
                    key={item.id}
                    href={item.path}
                    className={
                      pathname === item.path
                        ? 'activeLink'
                        : ' textLinkAnimation'
                    }
                  >
                    {(i18n.language === currentLanguages.EN && item.titleEn) ||
                      (i18n.language === currentLanguages.RU && item.titleRu) ||
                      item.titleUa}
                  </Link>
                ))}
            </div>
          )}

          {!isMobile && (
            <div className={styles.rightLinks}>
              <SocialLinks />
              <div className={styles.translatorContainer}>
                <TranslatorBtnBlock isClient={isClient} />
              </div>
            </div>
          )}

          {isMobile && <SocialLinks />}

          <Logo className={styles.logo} isClient={isClient} />

          {isMobile && (
            <BurgerBtn
              id="burgerBtn"
              onClick={() => {
                setBurgerMenu(!burgerMenu);
              }}
              burgerMenu={burgerMenu}
              isClient={isClient}
            />
          )}

          {session.status === 'authenticated' && !isLoading && (
            <button className={styles.logoutBtn} onClick={signOut}>
              {t('Buttons.LogOutBtn')}
            </button>
          )}
        </div>
      </div>

      {(isMobile || !isLoading) && (
        <Navigation
          id="mobileNavigation"
          className={
            burgerMenu
              ? styles.mobileNavigationVisible
              : styles.mobileNavigation
          }
          onClick={closeBurgerMenu}
          isClient={isClient}
        />
      )}
    </header>
  );
};


export default Header;