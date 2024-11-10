"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { toast } from "react-toastify";
import DashboardForm from "@/components/DashboardForm/DashboardForm";
import Loading from "@/app/loading";
import { GetData } from "@/fetch/clientFetch";
import { handleDeleteImgFromCloudinary } from "@/utils/handleDeleteImgFromCloudinary";
import styles from "./page.module.scss";


const Dashboard = () => {
  const session = useSession();

  const { data, mutate, isLoading } = GetData();

  let sortedByUpdateData = [];

  if (!isLoading) {
    sortedByUpdateData = [...data];

    sortedByUpdateData.sort((a, b) => {
      return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    });
  }

  const router = useRouter();

  const handleDeleteApartmentFromDB = async (id, objNumber) => {
    try {
      await fetch(`/api/apartments/${id}`, { method: "DELETE" });
      // автоматически обновляет страницу при изменении кол-ва карточек
      mutate();
    } catch (error) {
      console.log(error);
    }
    toast.success(`Обʼєкт №: ${objNumber} видалено`, { theme: "dark" });
  };

  const sortedPriorities = data?.map((item) => item.priority).sort((a, b) => { return a - b }).join(", ");


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
        {!isLoading && <p className={styles.priorityList}>Значення пріоритетів: {sortedPriorities}</p>}
        {isLoading ? (
          <Loading />
        ) : (
          <div className={styles.contentWrapper}>
            <div className={styles.apartments}>
              {sortedByUpdateData.map((apart) => (
                <div key={apart._id} className={styles.apartment}>
                  <h2>Обʼєкт №: {apart.objNumber}</h2>
                  {apart.top ? <p>ТОП</p> : null}
                  <p className={styles.property}>Пріоритет: {apart.priority}</p>
                  <p className={styles.property}>Основне фото:</p>
                  <CldImage
                    width="300"
                    height="150"
                    crop="fill"
                    src={apart.titleImg}
                    alt="apartment photo"
                    priority={true}
                  />
                  <p className={styles.property}>Додаткові фото:</p>
                  <ul className={styles.imgsWrapper}>
                    {apart.imgs.map((item, index) => (
                      <li className={styles.imgsCont} key={index}>
                        <CldImage
                          width="200"
                          height="100"
                          crop="fill"
                          src={item}
                          alt="Interior photo"
                        />
                      </li>
                    ))}
                  </ul>
                  <p className={styles.address}><span className={styles.property}>Адреса українською:</span> {apart.address}</p>
                  <p className={styles.address}><span className={styles.property}>Адреса англійською:</span> {apart.addressEn}</p>
                  <p className={styles.address}><span className={styles.property}>Адреса російською:</span> {apart.addressRu}</p>
                  <p><span className={styles.property}>Номер квартири:</span> {apart.flatNumber}</p>
                  <p className={styles.property}>Місцезнаходження: <a
                    href={apart.googleMapLocation}
                    className={styles.location}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {apart.googleMapLocation}
                  </a>
                  </p>
                  <p><span className={styles.property}>Ціна:</span> {apart.price}</p>
                  <p><span className={styles.property}>Кількість кімнат:</span> {apart.roomsQuantity}</p>
                  <p className={styles.property}>BookingUrl: {apart.bookingUrl ? <a
                    href={apart.bookingUrl}
                    className={styles.platformLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {apart.bookingUrl}
                  </a> : <span className={styles.absentBooking}>{"немає"}</span>}
                  </p>
                  <p className={styles.property}>Додатковий комфорт:</p>
                  <ul>
                    {apart.amenities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <p><span className={styles.property}>Кількість спальних місць:</span> {apart.bedsQuantity}</p>
                  <p className={styles.description}><span className={styles.property}>Опис українською:</span> {apart.description}</p>
                  <p className={styles.description}><span className={styles.property}>Опис англійською:</span> {apart.descriptionEn}</p>
                  <p className={styles.description}><span className={styles.property}>Опис російською:</span> {apart.descriptionRu}</p>
                  <div className={styles.btnsWrapper}>
                    <Link
                      className={styles.editLink}
                      href={`/dashboard/${apart._id}`}
                    >
                      <svg className={styles.editIcon}>
                        <use href="/sprite.svg#icon-edit" />
                      </svg>
                    </Link>
                    <svg
                      className={styles.deleteIcon}
                      onClick={() => {
                        if (confirm("Ви впевнені, що хочете видалити цю картку?")) {
                          handleDeleteImgFromCloudinary(apart.titleImg);

                          apart.imgs.map((item) =>
                            handleDeleteImgFromCloudinary(item)
                          );

                          handleDeleteApartmentFromDB(apart._id, apart.objNumber);
                        }
                      }}
                    >
                      <use href="/sprite.svg#icon-delete" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
            <DashboardForm />
          </div>
        )
        }
      </div >
    );
  }
};


export default Dashboard;