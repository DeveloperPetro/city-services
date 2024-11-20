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
import SocialLinksFooter from "../SocialLinks/SocialLinksFooter";

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
    if (window.innerWidth < 1366) {
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
      
      <footer id="footer" className={styles.container}>
        {isMobile && (
          <div className={styles.mobileContentWrapper}>

            <div className="footer-logo-wrapper">
              <Logo className={`${styles.footerLogo}`} />
            </div>

            {!isLoading && (
              <div className={styles.btnsWrapper}>
                <OrderBtn openModal={openModal} />
                <CallBtn />
              </div>
            )}

          </div>
        )}

        {!isMobile && (
          <div className={styles.contentWrapper}>

            <div className="footer-logo-wrapper">
              <Logo className={`${styles.footerLogo}`} />
            </div>

            <SocialLinksFooter />

            <ul className={styles.navigation}>
              {!isLoading &&
                navigationData.filter((_, index) => index !== 2).map((item) => {
                  return (
                    <li key={item.id} onClick={onClick}>
                      <Link
                        href={item.path}
                        className="textLinkAnimation"
                        onClick={handleSetScrolledWindow}
                        rel={item.rel}
                        target={item.target}
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
