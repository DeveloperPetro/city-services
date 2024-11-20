'use client';

import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { v4 } from 'uuid';
import { SiteContext } from '@/context/SiteContext';
import ModalR from '@/components/Modal/Modal';
import OrderForm from '@/components/OrderForm/OrderForm';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import OrderBtn from '../OrderBtn/OrderBtn';
import Amenities from './Amenities/Amenities';
import ItemSlider from './ItemSlider/ItemSlider';
import IsLoading from '../share/IsLoading/IsLoading';
import { GetDataById } from '@/fetch/clientFetch';
import { currentLanguages, textInfoAppartId } from '@/data';
import seoStyles from '@/app/seoStyles.module.css';
import styles from './ApartIdItem.module.scss';


const ApartIdItem = ({ params }) => {
  const router = useRouter();
  const { data, error, isLoading } = GetDataById(params.id)

  const dataId = data && !isLoading ? data : error;

  // массив для добавления description квартиры в карточку
  const descsToPushArray = [];

  // строки из БД, которые преобразуется в массивы
  const descArrayFromData = data?.description.split(' | ');
  const descEnArrayFromData = data?.descriptionEn.split(' | ');

  // наполнение массива данными из БД
  descArrayFromData?.map((item) => {
    const id = v4();
    const text = item;
    const obj = {
      id,
      text,
      textEn: '',
    };
    descsToPushArray.push(obj);
  });

  descsToPushArray.map((item, index) => {
    item.textEn = descEnArrayFromData[index];
  });

  // общий массив для рендера, созданный путем распыления массивов данных из локальной data и БД
  const allInformation = [...descsToPushArray, ...textInfoAppartId];

  const { t, i18n } = useTranslation();
  const { isModalOpen, openModal, closeModal } = useContext(SiteContext);

  return (
    <section className={`pageTopSection ${styles.container}`}>
      <h1 className={seoStyles.titleHidden}>
        Оренда квартири суми. Суми квартири. Зняти квартиру суми. Сумы.
      </h1>

      {!isLoading && <BreadCrumbs
        onClick={() => router.back()}
        title={t('BreadCrumbs.BackLink')}
      />}

      <ModalR isOpen={isModalOpen} closeModal={closeModal}>
        <OrderForm isOpen={isModalOpen} closeModal={closeModal} />
      </ModalR>

      {isLoading ? (
        <IsLoading />
      ) : (
        <article className={styles.apartContent}>
          <h3 className={seoStyles.titleHidden}>
            Detailed information about the apartments
          </h3>
          <ItemSlider dataId={dataId} />
          <article className={styles.content}>
            <h4 className={seoStyles.titleHidden}>
              Detailed information about the amenities
            </h4>
            <p className={styles.quantityRoomsInfo}>
              {dataId.roomsQuantity}
              {t("ApartmentsPage.TextOfDescAdress")}
            </p>
            <address className={styles.address}>
              <a
                href={dataId?.googleMapLocation}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.locationLink}
              >
                <svg className={styles.icon}>
                  <use href="/sprite.svg#location"></use>
                </svg>
                {!isLoading && (i18n.language === "ua"
                  ? dataId.address
                  : dataId.addressEn)}
              </a>
            </address>

            <Amenities dataId={dataId} customClass={styles.amenitiesWrapper} />

            <div className={styles.numberAndPriceWrapper}>
              <figure className={styles.objNumberWrapper}>
                <svg className={styles.svgHash}>
                  <use href="/sprite.svg#icon-hash" />
                </svg>
                <figcaption>{dataId.objNumber}.</figcaption>
              </figure>
              <p className={styles.price}>{dataId.price} ₴</p>
            </div>

            <OrderBtn className={styles.orderBtn} openModal={openModal} />
          </article>
        </article>
      )}

      <article className={styles.textGrid}>
        <ul className={styles.textInfoContainer}>
          {!isLoading &&
            allInformation.map((el, index) => {
              return (
                <li key={index}>
                  <h5 className={styles.textInfoTitle}>
                    {i18n.language === currentLanguages.EN
                      ? el.titleEn
                      : el.title}
                  </h5>
                  <p className={styles.textInfoRulse}>
                    {i18n.language === currentLanguages.EN
                      ? el.textEn
                      : el.text}

                    {el.title === 'Правила:' &&
                      el.rulesList.map((el, index) => {
                        return (
                          <span key={index}>
                            {i18n.language === currentLanguages.EN
                              ? el.rulesEN
                              : el.rules}
                          </span>
                        );
                      })}
                  </p>
                </li>
              );
            })}
        </ul>
      </article>
    </section>
  );
};

export default ApartIdItem;
