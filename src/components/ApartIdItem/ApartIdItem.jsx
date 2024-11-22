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
  const allLangsOfDescsArray = [];

  // строки из БД, которые преобразуется в массивы
  const descArrayFromData = data?.description.split(' | ');
  const descEnArrayFromData = data?.descriptionEn.split(' | ');
  const descRuArrayFromData = data?.descriptionRu.split(' | ');

  // наполнение массива украинскими данными из БД
  descArrayFromData?.map((item) => {
    const id = v4();
    // присваивается переменной text значение item-a (описание на украинском языке)
    const text = item;

    //создается объект для хранения всех языков одного блока описания (украинский вариант записывается, а для английского и русского создаются переменные)
    const allLanguagesOfDescription = {
      id,
      text,
      textEn: '',
      textRu: '',
    };
    allLangsOfDescsArray.push(allLanguagesOfDescription);
  });

  // английский и русский варианты записываются
  allLangsOfDescsArray.map((item, index) => {
    item.textEn = descEnArrayFromData[index];
    item.textRu = descRuArrayFromData[index];
  });

  // общий массив для рендера, созданный путем распыления массивов данных из локальной data и БД
  const allInformation = [...allLangsOfDescsArray, ...textInfoAppartId];

  const { t, i18n } = useTranslation();
  const { isModalOpen, openModal, closeModal } = useContext(SiteContext);

  return (
    <section className='pageTopSection'>
      <div className={`container ${styles.container}`}>
        <h1 className={seoStyles.titleHidden}>
          Оренда квартири Київ. Київ квартири. Зняти квартиру Київ. Киев.
        </h1>

        {!isLoading && <BreadCrumbs
          onClick={() => router.back()}
          title={t('BreadCrumbs.BackLink')}
          externalClass=""
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
            <ItemSlider dataId={dataId} customClass={styles.sliderWrapper} />
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
                  {!isLoading && ((i18n.language === currentLanguages.EN) && dataId.addressEn) || ((i18n.language === currentLanguages.RU) && dataId.addressRu) || dataId.address
                    // (i18n.language === "ua"
                    //   ? dataId.address
                    //   : dataId.addressEn)
                  }
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
                    {el.title && <h5 className={styles.textInfoTitle}>
                      {((i18n.language === currentLanguages.EN) && el.titleEn) || ((i18n.language === currentLanguages.RU) && el.titleRu) || el.title}

                      {/* {i18n.language === currentLanguages.EN
                        ? el.titleEn
                        : el.title} */}
                    </h5>}
                    {/* <p className={index === (allInformation.length - 2) ? `${styles.textInfoRules} ${styles.accentRule}` : styles.textInfoRules}>
                      {((i18n.language === currentLanguages.EN) && el.textEn) || ((i18n.language === currentLanguages.RU) && el.textRu) || el.text}
                      
                      {el.title === 'Правила:' &&
                        el.rulesList.map((el, index) => {
                          return (
                            <span key={index}>
                              {((i18n.language === currentLanguages.EN) && el.rulesEn) || ((i18n.language === currentLanguages.RU) && el.rulesRu) || el.rules}                              
                            </span>
                          );
                        })}
                    </p> */}


                    {el.title === 'Правила:' ? <ul className={styles.rulesList}>
                      {el.rulesList.map((el, index) => {
                        return (
                          <li key={index} className={styles.rulesItem}>
                            {((i18n.language === currentLanguages.EN) && el.rulesEn) || ((i18n.language === currentLanguages.RU) && el.rulesRu) || el.rules}
                          </li>
                        );
                      })}
                    </ul> : <p className={index === (allInformation.length - 2) ? styles.accentRule : ""}>
                      {((i18n.language === currentLanguages.EN) && el.textEn) || ((i18n.language === currentLanguages.RU) && el.textRu) || el.text}</p>
                    }

                  </li>
                );
              })}
          </ul>
        </article>
      </div>
    </section>
  );
};


export default ApartIdItem;
