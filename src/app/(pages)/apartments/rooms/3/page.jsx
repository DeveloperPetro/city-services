'use client';

import React, { useContext } from 'react';
import styles from './page.module.scss';
import { data } from '../../../../../data/apartamentTest';
import ApartItem from '@/components/ApartItem/ApartItem';
import { PaginationContext } from '@/context/PaginationContext';
import Pagination from '@/components/share/Pagination/Pagination';

const ThreeRooms = () => {
  const { firstIndex, lastIndex, recordsPerPage } =
    useContext(PaginationContext);

  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  return (
    <>
      <ul className={styles.containerOneRooms}>
        {records.map((item) => (
          <ApartItem
            key={item.id}
            img={item.img}
            code={item.code}
            address={item.address}
            prise={item.prise}
          />
        ))}
      </ul>
      <Pagination numbers={numbers} />
    </>
  );
};

export default ThreeRooms;
