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
      <div className={styles.container}>
        <p className={styles.displaySizeMessage}>
          Для користування цим функціоналом розмір Вашого екрану повинен бути не
          менше 768 пікселів.
        </p>
        {isLoading ? (
          <Loading />
        ) : (
          <div className={styles.contentWrapper}>
            <div key={data._id} className={styles.apartment}>
              <h2>Обʼєкт №: {data.objNumber}</h2>
              {data.top ? <p>ТОП</p> : null}
              <p className={styles.property}>Пріоритет: {data.priority}</p>
              <p className={styles.property}>Основне фото:</p>
              <CldImage
                width="300"
                height="150"
                crop="fill"
                src={data.titleImg}
                alt={data.address}
              />
              <p className={styles.property}>Додаткові фото:</p>
              <ul className={styles.imgsWrapper}>
                {data.imgs.map((item, index) => (
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
                            data,
                            data._id,
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
              <p className={styles.address}><span className={styles.property}>Адреса українською:</span> {data.address}</p>
              <p className={styles.address}><span className={styles.property}>Адреса англійською:</span> {data.addressEn}</p>
              <p className={styles.address}><span className={styles.property}>Адреса російською:</span> {data.addressRu}</p>
              <p><span className={styles.property}>Номер квартири:</span> {data.flatNumber}</p>
              <p className={styles.property}>Місцезнаходження: <a
                href={data.googleMapLocation}
                className={styles.location}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.googleMapLocation}
              </a>
              </p>
              <p><span className={styles.property}>Ціна:</span> {data.price}</p>
              <p><span className={styles.property}>Кількість кімнат:</span> {data.roomsQuantity}</p>
              <p className={styles.property}>BookingUrl: {data.bookingUrl ? <a
                href={data.bookingUrl}
                className={styles.platformLink}
              >{data.bookingUrl}
              </a> : <span className={styles.absentBooking}>{"немає"}</span>}
              </p>
              <p className={styles.property}>Додатковий комфорт:</p>
              <ul>
                {data.amenities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p><span className={styles.property}>Кількість спальних місць:</span> {data.bedsQuantity}</p>
              <p className={styles.description}><span className={styles.property}>Опис українською:</span> {data.description}</p>
              <p className={styles.description}><span className={styles.property}>Опис англійською:</span> {data.descriptionEn}</p>
              <p className={styles.description}><span className={styles.property}>Опис російською:</span> {data.descriptionRu}</p>
            </div>
            <UpdatingForm id={id} apart={data} mutate={mutate} />
          </div>
        )}
      </div>
    );
  }
};


export default EditCard;