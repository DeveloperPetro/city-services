'use client';
import React, { useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import styles from './Hero.module.scss';
// import seoStyles from '@/app/seoStyles.module.css';
import Image from 'next/image';
import CallBtnRound from '../CallBtnRound/CallBtnRound';
import { GetData } from '@/fetch/clientFetch';
import ApartItem from '../ApartItem/ApartItem';
import IsLoading from '../share/IsLoading/IsLoading';
import { currentLanguages } from '@/data';

const Hero = () => {
  const { data, error, isLoading } = GetData();
  const [loadedCount, setLoadedCount] = useState(12);
  const [showLoading, setShowLoading] = useState(false);
  const { t, i18n } = useTranslation();

  const loaderRef = useRef();

  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setIsLoading(false);
  // }, []);

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
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line
  }, [data, loadedCount, showLoading]);

  return (
    <section className={`${styles.container}`}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Оренда квартир подобово</h1>
        <div className={styles.heroContainer}>
          <figure className={styles.imgFirst}>
            <Image
              src="/heroImgs/Hero-first.webp"
              alt="hero image"
              fill={true}
              sizes="(max-width: 768px) 334px, (max-width: 1200px) 704px"
            />
          </figure>
          <div className={styles.heroContent}>
            <h2 className={styles.subtitle}>
              подобова та погодинна оренда квартир у Києві
            </h2>
            <CallBtnRound />
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
      <div className={styles.apartamentContainer}>
        {isLoading ? (
          <IsLoading />
        ) : (
          <ul className={styles.apartamentList} ref={loaderRef}>
            {data?.slice(0, loadedCount).map((item) => (
              <ApartItem
                key={item._id}
                titleImg={item.titleImg}
                code={item.code}
                address={
                  i18n.language === currentLanguages.EN
                    ? item.addressEn
                    : item.address
                }
                price={item.price}
                objNumber={item.objNumber}
                roomsQuantity={item.roomsQuantity}
                id={item._id}
                bedsQuantity={item.bedsQuantity}
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
