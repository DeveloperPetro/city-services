"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./ApartItem.module.scss";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import Image from "next/image";

const ApartItem = ({
  titleImg,
  address,
  price,
  roomsQuantity,
  id,
  bedsQuantity,
  complex,
  district,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <li className={styles.oneRooms}>
        <Link href={`/apartments/${id}`}>
          <figure className={styles.imgContainer}>
            <CldImage
              src={titleImg}
              alt="apartment"
              fill
              className={styles.img}
              priority
              sizes="(max-width: 768px) 324px, (max-width: 1440px) 300px"
            />
            {/* <figcaption className={styles.codeImg}>{address}</figcaption> */}
          </figure>
        </Link>
        <div className={styles.apartContent}>
          <p className={styles.priceRooms}>
            {price} ₴/{t("ApartmentsPage.PricePeriod")}
          </p>

          <div className={styles.bedContainer}>
            <p className={styles.bedsQuantity}>{bedsQuantity}</p>
            <figure className={styles.bedImg}>
              <Image
                src="/webp/Person.webp"
                fill
                sizes="24px"
                alt="кількість спальних міст"
              />
            </figure>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.complexContainer}>
            <figure className={styles.homeImg}>
              <Image
                src="/webp/Home.webp"
                fill
                sizes="24px"
                alt="кількість спальних міст"
              />
            </figure>
            <p className={styles.addressRooms}>
              {complex}&nbsp;
              {roomsQuantity}
              {t("ApartmentsPage.TextOfDescAdress")}
            </p>
          </div>
          <p className={styles.address}>{address}</p>
          <p className={styles.address}>{district}</p>
          <Link href={`/apartments/${id}`} className={styles.btnRooms}>
            {t("Buttons.CardDetailsBtn")}
          </Link>
        </div>
      </li>
    </>
  );
};

export default ApartItem;
