import React from 'react';
import styles from './page.module.scss';
import { data } from '../../../../../data/apartamentTest';
import ApartItem from '@/components/ApartItem/ApartItem';

const ThreeRooms = () => {
  return (
    <ul className={styles.containerOneRooms}>
      {data.map((item) => (
        <ApartItem
          key={item.id}
          img={item.img}
          code={item.code}
          address={item.address}
          prise={item.prise}
        />
      ))}
    </ul>
    // <div className={styles.container}>ThreeRooms</div>
  );
};

export default ThreeRooms;