import React from 'react';
import styles from './page.module.scss';
import ApartItem from '@/components/ApartItem/ApartItem';
// import OrderBtn from "@/components/OrderBtn/OrderBtn";
import CallBtn from '@/components/CallBtn/CallBtn';
import Link from 'next/link';
import Filter from '@/components/Filter/Filter';
import Button from '@/components/Button/Button';

// async function getData() {
//   const result = await fetch(`${process.env.NEXTAUTH_URL}/api/apartments`, { cache: "no-store" })

//   if (!result.ok) {
//     throw new Error("Failed to fetch data.")
//   }

//   return result.json();
// }

// const data = await getData();

const Apartments = () => {
  // console.log("data", data);

  return (
    <div className={styles.container}>
      <h1>Apart Page</h1>
      <Filter />
      {/* <ApartItem />
    <ApartItem />
    <ApartItem />
    <ApartItem /> */}
      <Link href="/apartments/rooms" style={{ backgroundColor: 'green' }}>
        Move to page for choose quantity of rooms
      </Link>
      {/* <OrderBtn /> */}
      <Button />
      <CallBtn />
    </div>
  );
};

export default Apartments;
