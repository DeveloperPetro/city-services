'use client';
import React, { useLayoutEffect } from 'react';
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
  const { t, i18n } = useTranslation();
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setIsLoading(false);
  // }, []);

  useLayoutEffect(() => {
    const apartamentContainer = document.querySelector('.apartamentContainer');

    const handleScroll = () => {
      if (window.scrollY > 300) {
        apartamentContainer.classList.add('slideIn');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
              />
            </figure>
          </div>
        </div>
      </div>
      {isLoading ? (
        <IsLoading />
      ) : (
        <ul className={styles.apartamentContainer}>
          {data?.length > 0 &&
            data?.map((item) => (
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
    </section>
  );
};

export default Hero;
