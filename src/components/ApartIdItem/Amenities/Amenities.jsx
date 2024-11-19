import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { amenities, bedsData, currentLanguages } from '@/data';
import styles from './Amenities.module.scss';


const Amenities = ({ dataId }) => {
  const { t, i18n } = useTranslation();

  const bed = bedsData.find(item => item.quantity === dataId.bedsQuantity)

  console.log("dataId", dataId)
  console.log("item.quantity === dataId.bedsQuantity", item.quantity === dataId.bedsQuantity)
  console.log("bed", bed)

  const matchingAmenities = amenities.filter((amenity) =>
    dataId.amenities.includes(amenity.title)
  );

  // const matchingAmenitiesWithBed = [...matchingAmenities, bed];


  return (
    <article className={styles.propositionContainer}>
      <h5 className={styles.propositionTitle}>
        {t('ApartmentsPage.TextOfDescOptions')} ?
      </h5>
      <ul className={styles.propositionList}>
        {matchingAmenities.map((amenity) => (
          <li key={amenity.id} className={styles.propositionItem}>
            <figure
              className={
                amenity.title === dataId.bedsQuantity
                  ? styles.bedsQuantity + ' ' + styles.imgSvgContainer
                  : styles.imgSvgContainer
              }
            >
              <Image
                src={amenity.img}
                alt={
                  i18n.language === currentLanguages.EN
                    ? amenity.titleEn
                    : amenity.title
                }
                fill={true}
                className={styles.imgSvg}
                sizes="(min-width: 768px) 24px,"
              />
            </figure>
            {i18n.language === currentLanguages.EN ? (
              <figcaption>{amenity.titleEn}</figcaption>
            ) : (
              <figcaption>{amenity.title}</figcaption>
            )}
          </li>
        ))}
      </ul>
      <div className={styles.propositionItem}>
        <figure
          className={styles.bedsQuantity + ' ' + styles.imgSvgContainer}
        >
          <Image
            src={bed.img}
            alt={
              i18n.language === currentLanguages.EN
                ? `${bed.quantity} sleeping places`
                : `${bed.quantity} спальних місць`
            }
            fill={true}
            className={styles.imgSvg}
            sizes="(min-width: 768px) 24px,"
          />
        </figure>
        {i18n.language === currentLanguages.EN ? (
          <figcaption>`Sleeping places - ${bed.quantity}`</figcaption>
        ) : (
          <figcaption>`Спальних місць - ${bed.quantity}`</figcaption>
        )}
      </div>
    </article>
  );
};

export default Amenities;
