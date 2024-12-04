"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { socialLinks } from "@/data";
import styles from "./CallBtn.module.scss";


const CallBtn = ({ className }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  // Найти объект с телефоном
  const phoneLink = socialLinks.find(link => link.title === "Telephone")?.href;

  useEffect(() => {
    setIsLoading(false);
  }, []);


  return (
    <a href={phoneLink} className={`${styles.button} ${className}`}>
      {!isLoading && t("Buttons.CalltBtn")}
    </a>
  );
};


export default CallBtn;