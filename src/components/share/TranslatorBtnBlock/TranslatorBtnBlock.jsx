"use client";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { SiteContext } from "@/context/SiteContext";
import { LangSwitcher } from "./LangSwitcher";
import styles from "./TranslatorBtnBlock.module.scss";


const TranslatorBtnBlock = ({ isClient }) => {
  const pathname = usePathname();
  const [language, setLanguage] = useState('ua');
  const { i18n } = useTranslation();
  const [isLoad, setIsLoad] = useState(true)

  useEffect(() => {

    const lang = localStorage.getItem("i18nextLng")
    setLanguage(() => lang ? lang : "ua");
    setIsLoad(false)
    Cookies.set('language', lang);
  }, []);


  const changeLanguage = (languageUser) => {
    localStorage.setItem("i18nextLng", languageUser);

    setLanguage(languageUser);

    i18n.changeLanguage(languageUser);
    Cookies.set('language', languageUser);
  };

  const { scrollY } = useContext(SiteContext);

  let scrollStyles;
  if (
    (pathname === "/" && isClient && scrollY >= window.innerHeight - 50) ||
    pathname !== "/"
  ) {
    scrollStyles = styles.dropdownDark;
  } else {
    scrollStyles = styles.dropdown;
  }


  return (<div className={scrollStyles}>
    {!isLoad && <LangSwitcher
      changeLanguage={changeLanguage}
      currentLanguage={language} />}
  </div>
  );
};


export default TranslatorBtnBlock;