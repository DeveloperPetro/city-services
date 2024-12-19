"use client";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Image from "next/image";
import CallBtnRound from "../CallBtnRound/CallBtnRound";
import { GetData } from "@/fetch/clientFetch";
import ApartItem from "../ApartItem/ApartItem";
import IsLoading from "../share/IsLoading/IsLoading";
import { currentLanguages } from "@/data";
import styles from "./Hero.module.scss";
import Loading from "@/app/loading";

const Hero = () => {
  const { data, isLoading } = GetData();
  const [loadedCount, setLoadedCount] = useState(12);
  const [showLoading, setShowLoading] = useState(false);
  const { t, i18n } = useTranslation();

  let sortedData = [];

  if (!isLoading) {
    sortedData = [...data];
    sortedData.sort((a, b) => {
      return Number(a.priority) - Number(b.priority);
    });
  }

  const loaderRef = useRef();

  const handleScroll = () => {
    if (!showLoading && data?.length) {
      const container = loaderRef.current;
      if (container) {
        const { bottom } = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (bottom < windowHeight + 100 && loadedCount < data?.length) {
          setShowLoading(true);

          setTimeout(() => {
            setLoadedCount((prev) => {
              const remaining = data.length - prev;
              return prev + Math.min(12, remaining);
            });
            setShowLoading(false);
          }, 500);
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line
  }, [data, loadedCount, showLoading]);

  return (
    <section className={`${styles.container} pageTopSection`}>
      <div className={`${styles.hero} container`}>
        <h1 className={styles.title}>
          {!isLoading && t("MainPage.heroTitle")}
        </h1>
        <div className={styles.heroContainer}>
          <figure className={styles.imgFirst}>
            <Image
              src="/heroImgs/Hero-first.webp"
              alt="hero image"
              fill={true}
              priority={true}
              sizes="(max-width: 768px) 334px, (max-width: 1200px) 704px"
            />
          </figure>
          <div className={styles.heroContent}>
            <h2 className={styles.subTitle}>
              {!isLoading && t("MainPage.heroSubTitle")}
            </h2>
            <div className={styles.callContiner}>
              {!isLoading && <CallBtnRound text={t("Buttons.CalltBtn")} />}
            </div>
            <figure className={styles.imgSecond}>
              <Image
                src="/heroImgs/Hero-second.webp"
                alt="hero image"
                fill={true}
                sizes="(max-width: 768px) 334px, (max-width: 1200px) 496px"
              />
            </figure>
          </div>
        </div>
      </div>
      <div className={`${styles.apartamentContainer} container`}>
        {isLoading ? (
          <Loading />
        ) : (
          <ul className={styles.apartamentList} ref={loaderRef}>
            {sortedData?.slice(0, loadedCount).map((item) => (
              <ApartItem
                key={item._id}
                titleImg={item.titleImg}
                code={item.code}
                address={
                  (i18n.language === currentLanguages.EN && item.addressEn) ||
                  (i18n.language === currentLanguages.RU && item.addressRu) ||
                  item.addressUa
                }
                price={item.price}
                objNumber={item.objNumber}
                roomsQuantity={item.roomsQuantity}
                id={item._id}
                bedsQuantity={item.bedsQuantity}
                complex={
                  (i18n.language === currentLanguages.EN && item.complexEn) ||
                  (i18n.language === currentLanguages.RU && item.complexRu) ||
                  item.complexUa
                }
                district={
                  (i18n.language === currentLanguages.EN && item.districtEn) ||
                  (i18n.language === currentLanguages.RU && item.districtRu) ||
                  item.districtUa
                }
              />
            ))}
          </ul>
        )}
        <div ref={loaderRef} className={styles.loading}>
          {showLoading && <IsLoading />}
        </div>
      </div>
    </section>
  );
};

export default Hero;
