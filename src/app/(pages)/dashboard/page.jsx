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
  // const sortedPriorities = data?.map(item => `${item.priority}(#${item.objNumber})`).sort((a, b) => parseInt(a.slice(0, a.indexOf('(#'))) - parseInt(b.slice(0, b.indexOf('(#')))).join(", ");

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
        {!isLoading && <p className={styles.priorityList}>Значення пріоритетів: {sortedPriorities}</p>}
        {isLoading ? (
          <Loading />
        ) : (
          <div className={styles.contentWrapper}>
            <div className={styles.apartments}>
              {sortedByUpdateData.map((apart) => {
                const descsUaArray = apart.descriptionUa.split(" | ");
                const descsEnArray = apart.descriptionEn.split(" | ");
                const descsRuArray = apart.descriptionRu.split(" | ");

                return <div key={apart._id} className={styles.apartment}>
                  <h2 className={styles.objNumber}>Обʼєкт №: {apart.objNumber}</h2>
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
                  <p><span className={styles.property}>Адреса українською:</span> {apart.addressUa}</p>
                  <p><span className={styles.property}>Адреса англійською:</span> {apart.addressEn}</p>
                  <p><span className={styles.property}>Адреса російською:</span> {apart.addressRu}</p>
                  {apart.complexUa && <p><span className={styles.property}>Житловий комплекс українською:</span> {apart.complexUa}</p>}
                  {apart.complexEn && <p><span className={styles.property}>Житловий комплекс англійською:</span> {apart.complexEn}</p>}
                  {apart.complexRu && <p><span className={styles.property}>Житловий комплекс російською:</span> {apart.complexRu}</p>}
                  <p><span className={styles.property}>Район українською:</span> {apart.districtUa}</p>
                  <p><span className={styles.property}>Район англійською:</span> {apart.districtEn}</p>
                  <p><span className={styles.property}>Район російською:</span> {apart.districtRu}</p>
                  <p><span className={styles.property}>Номер квартири:</span> {apart.flatNumber}</p>
                  <p className={`${styles.property} ${styles.overHid}`}>Місцезнаходження: <a
                    href={apart.googleMapLocation}
                    className={styles.locationLink}
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
                  </a> : <span className={styles.absentBookingLink}>{"немає"}</span>}
                  </p>
                  <p className={styles.property}>Додатковий комфорт:</p>
                  <ul>
                    {apart.amenities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <p><span className={styles.property}>Кількість спальних місць:</span> {apart.bedsQuantity}</p>
                  <p className={styles.property}>Опис українською:</p>
                  <ul>
                    {descsUaArray.map((item, index) => <li key={index} className={styles.descriptionItem}>{item}</li>)}
                  </ul>
                  <p className={styles.property}>Опис англійською:</p>
                  <ul>
                    {descsEnArray.map((item, index) => <li key={index} className={styles.descriptionItem}>{item}</li>)}
                  </ul>
                  <p className={styles.property}>Опис російською:</p>
                  <ul>
                    {descsRuArray.map((item, index) => <li key={index} className={styles.descriptionItem}>{item}</li>)}
                  </ul>
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
              }
              )}
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