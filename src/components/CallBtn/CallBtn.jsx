"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { socialLinks } from "@/data";
import styles from "./CallBtn.module.scss";


const CallBtn = ({ className }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);
  return (
    <>
      <a href={socialLinks.href} className={styles.button + " " + `${className}`}>
        {!isLoading && t("Buttons.CalltBtn")}
      </a>
    </>
  );
};

export default CallBtn;
