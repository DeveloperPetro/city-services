'use client';

import React, { useEffect, useState } from 'react';
import styles from './page.module.scss';
import { GetData } from '@/fetch/clientFetch';
import ApartItem from '@/components/ApartItem/ApartItem';
import IsLoading from '@/components/share/IsLoading/IsLoading';
import ButtonFilter from '@/components/share/ButtonFilter/ButtonFilter';
import Link from 'next/link';
import FilterRooms from '@/components/FilterRooms/FilterRooms';
import ButtonToBack from '@/components/share/ButtonToBack/ButtonToBack';

const Apartments = () => {
  const { data, error, isLoading } = GetData();
  const [loadedCount, setLoadedCount] = useState(9);
  const [showLoading, setShowLoading] = useState(false);

  const handleScroll = () => {
    if (!showLoading && data?.length) {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        loadedCount < data.length
      ) {
        setShowLoading(true);
        setTimeout(() => {
          setLoadedCount(loadedCount + 9);
          setShowLoading(false);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line
  }, [data, loadedCount]);

  return (
    <section className={styles.container}>
      <div className={styles.filterContainer}>
        <div className={styles.backContainer}>
          <p className="textLink">
            <Link href="/" className="textLinkAnimation">
              Головна
            </Link>
            / <span className={styles.active}>Апартаменти</span>
          </p>
        </div>
        <ButtonFilter />
      </div>
      <FilterRooms />
      {isLoading ? (
        <IsLoading />
      ) : (
        <ul className={styles.containerOneRooms}>
          {data?.length > 0 ? (
            data
              .slice(0, loadedCount)
              .map((item) => (
                <ApartItem
                  key={item._id}
                  titleImg={item.titleImg}
                  code={item.code}
                  address={item.address}
                  price={item.price}
                  objNumber={item.objNumber}
                  roomsQuantity={item.roomsQuantity}
                  id={item._id}
                />
              ))
          ) : (
            <div className={styles.notFoundText}>
              <p>Однокімнатних квартир не знайдено</p>
            </div>
          )}
        </ul>
      )}
      {showLoading && (
        <div className={styles.loading}>
          <IsLoading />
        </div>
      )}
    </section>
  );
};

export default Apartments;
