"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { SiteContext } from "@/context/SiteContext";
import OrderBtn from "@/components/OrderBtn/OrderBtn";
import CallBtn from "@/components/CallBtn/CallBtn";
import Logo from "@/components/Logo/Logo";
import ModalR from "@/components/Modal/Modal";
import OrderForm from "@/components/OrderForm/OrderForm";
import styles from "./Footer.module.scss";
import { navigationData, currentLanguages } from "@/data";

const Footer = ({ onClick }) => {
  const { isModalOpen, openModal, closeModal, setScrolledWindow } =
    useContext(SiteContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const { i18n } = useTranslation();

  const handleSetScrolledWindow = () => {
    setScrolledWindow(0);
  };

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    // Add an event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check on component mount
    handleResize();

    setIsLoading(false);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <ModalR isOpen={isModalOpen} closeModal={closeModal}>
        <OrderForm isOpen={isModalOpen} closeModal={closeModal} />
      </ModalR>
      {/* <footer className={styles.container}>
        {isMobile && (
          <div className={styles.mobileContentWrapper}>
            <div className={styles.mobileItem}>
              <Logo className={`${styles.footerLogo}  textLinkAnimation`} />
              <Link
                href="mailto:dailyrent4@gmail.com"
                className="textLinkAnimation"
              >
                dailyrent4@gmail.com
              </Link>
            </div>
            <div className={styles.mobileItem}>
              <Link href="tel:+380991930030" className="textLinkAnimation">
                +380991930030
              </Link>
              <Link href="tel:+380675151939" className="textLinkAnimation">
                +380675151939
              </Link>
            </div>
          </div>
        )}

        
      </footer> */}
      <footer className={styles.container}>
        {isMobile && (
          <div className={styles.mobileContentWrapper}></div>
        )}

        {!isMobile && (
          <div className={styles.contentWrapper}>

            <div className="">
              <Logo className={`${styles.footerLogo}`} />
            </div>

            <div className={styles.contacts}>
              <Link href="tel:+380954515057" className="textLinkAnimation">
                +380 (95) 451 50 57
              </Link>
              <Link href="" className="textLinkAnimation">
                DailyRent_Kyiv
              </Link>
              <Link href="" className="textLinkAnimation">
                DailyRent_Kyiv
              </Link>
            </div>

            <ul className={styles.navigation}>
              {!isLoading &&
                navigationData.filter((_, index) => index !== 2).map((item) => {
                  return (
                    <li key={item.id} onClick={onClick}>
                      <Link
                        href={item.path}
                        className="textLinkAnimation"
                        onClick={handleSetScrolledWindow}
                      >
                        {i18n.language === currentLanguages.EN
                          ? item.titleEn
                          : item.title}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          
            {!isLoading && (
              <div className={styles.btnsWrapper}>
                <OrderBtn openModal={openModal} />
                <CallBtn />
              </div>
            )}
          </div>
        )}
        
      </footer>
    </>
  );
};

export default Footer;
