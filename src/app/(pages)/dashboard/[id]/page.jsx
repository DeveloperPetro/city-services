"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { toast } from "react-toastify";
import UpdatingForm from "@/components/UpdatingForm/UpdatingForm";
import { handleDeleteImgFromMongoDB } from "@/utils/handleDeleteImgFromMongoDB";
import { handleDeleteImgFromCloudinary } from "@/utils/handleDeleteImgFromCloudinary";
import Loading from "@/app/loading";
import { GetDataById } from "@/fetch/clientFetch";
import styles from "./page.module.scss";


const EditCard = ({ params }) => {
  const { id } = params;

  const session = useSession();

  const { data, mutate, isLoading } = GetDataById(id);

  let changedData = {};

  if (!isLoading) {
    changedData = { ...data };

    changedData.descriptionUa = data?.descriptionUa.split(" | ");
    changedData.descriptionEn = data?.descriptionEn.split(" | ");
    changedData.descriptionRu = data?.descriptionRu.split(" | ");
  }

  const router = useRouter();

  if (session.status === "loading") {
    return <Loading />;
  }

  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
  }

  if (
    session.status === "authenticated" &&
    session.data.user.email !== process.env.NEXT_PUBLIC_ADMIN
  ) {
    router.push("/");
  }

  if (
    session.status === "authenticated" &&
    session.data.user.email === process.env.NEXT_PUBLIC_ADMIN
  ) {
    return (
      <div className={`pageTopSection ${styles.container}`}>
        <p className={styles.displaySizeMessage}>
          Для користування цим функціоналом розмір Вашого екрану повинен бути не
          менше 768 пікселів.
        </p>
        {isLoading ? (
          <Loading />
        ) : (
          <div className={styles.contentWrapper}>
            <div key={changedData._id} className={styles.apartment}>
              <h2 className={styles.objNumber}>Обʼєкт №: {changedData.objNumber}</h2>
              <p className={styles.property}>Пріоритет: {changedData.priority}</p>
              <p className={styles.property}>Основне фото:</p>
              <CldImage
                width="300"
                height="150"
                crop="fill"
                src={changedData.titleImg}
                alt="apartment photo"
                priority={true}

              />
              <p className={styles.property}>Додаткові фото:</p>
              <ul className={styles.imgsWrapper}>
                {changedData.imgs.map((item, index) => (
                  <li className={styles.imgsItem} key={index}>
                    <div className={styles.imgCont}>
                      <CldImage
                        width="200"
                        height="100"
                        crop="fill"
                        src={item}
                        alt="Interior photo"
                      />
                    </div>
                    <svg
                      className={styles.deleteIcon}
                      onClick={async () => {
                        if (confirm("Хочете видалити це фото?")) {
                          handleDeleteImgFromMongoDB(
                            changedData,
                            changedData._id,
                            item,
                            mutate
                          );

                          handleDeleteImgFromCloudinary(item);

                          toast.success(`Фото видалено`, { theme: "dark" });
                        }
                      }}
                    >
                      <use href="/sprite.svg#icon-delete" />
                    </svg>
                  </li>
                ))}
              </ul>
              <p><span className={styles.property}>Адреса українською:</span> {changedData.addressUa}</p>
              <p><span className={styles.property}>Адреса англійською:</span> {changedData.addressEn}</p>
              <p><span className={styles.property}>Адреса російською:</span> {changedData.addressRu}</p>
              {changedData.complexUa && <p><span className={styles.property}>Житловий комплекс українською:</span> {changedData.complexUa}</p>}
              {changedData.complexEn && <p><span className={styles.property}>Житловий комплекс англійською:</span> {changedData.complexEn}</p>}
              {changedData.complexRu && <p><span className={styles.property}>Житловий комплекс російською:</span> {changedData.complexRu}</p>}
              <p><span className={styles.property}>Район українською:</span> {changedData.districtUa}</p>
              <p><span className={styles.property}>Район англійською:</span> {changedData.districtEn}</p>
              <p><span className={styles.property}>Район російською:</span> {changedData.districtRu}</p>
              <p><span className={styles.property}>Номер квартири:</span> {changedData.flatNumber}</p>
              <p className={`${styles.property} ${styles.overHid}`}>Місцезнаходження: <a
                href={changedData.googleMapLocation}
                className={styles.locationLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {changedData.googleMapLocation}
              </a>
              </p>
              <p><span className={styles.property}>Ціна:</span> {changedData.price}</p>
              <p><span className={styles.property}>Кількість кімнат:</span> {changedData.roomsQuantity}</p>
              <p className={styles.property}>BookingUrl: {changedData.bookingUrl ? <a
                href={changedData.bookingUrl}
                className={styles.platformLink}
              >{changedData.bookingUrl}
              </a> : <span className={styles.absentBookingLink}>{"немає"}</span>}
              </p>
              <p className={styles.property}>Додатковий комфорт:</p>
              <ul>
                {changedData.amenities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p><span className={styles.property}>Кількість спальних місць:</span> {changedData.bedsQuantity}</p>
              <p className={styles.property}>Опис українською:</p>
              <ul>
                {changedData.descriptionUa.map((item, index) => <li key={index} className={styles.descriptionItem}>{item}</li>)}
              </ul>
              <p className={styles.property}>Опис англійською:</p>
              <ul>
                {changedData.descriptionEn.map((item, index) => <li key={index} className={styles.descriptionItem}>{item}</li>)}
              </ul>
              <p className={styles.property}>Опис російською:</p>
              <ul>
                {changedData.descriptionRu.map((item, index) => <li key={index} className={styles.descriptionItem}>{item}</li>)}
              </ul>
            </div>
            <UpdatingForm id={id} apart={data} mutate={mutate} />
          </div>
        )}
      </div>
    );
  }
};


export default EditCard;