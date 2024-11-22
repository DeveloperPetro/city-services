import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { amenities, bedsData, currentLanguages } from '@/data';
import styles from './Amenities.module.scss';


const Amenities = ({ dataId, customClass }) => {
  const { t, i18n } = useTranslation();

  let bed;
  if (dataId) {
    bed = bedsData.find(item => item.quantity === dataId?.bedsQuantity);
  }

  const matchingAmenities = amenities.filter((amenity) =>
    dataId.amenities.includes(amenity.title)
  );


  return (
    <article className={`${styles.propositionContainer} ${customClass}`}>
      <h5 className={styles.propositionTitle}>
        {t('ApartmentsPage.TextOfDescOptions')} ?
      </h5>
      <ul className={styles.propositionList}>
        {matchingAmenities.map((amenity) => (
          <li key={amenity.id} className={styles.propositionItem}>
            <figure className={styles.imgSvgContainer}>
              <Image
                src={amenity.img}
                alt={
                  ((i18n.language === currentLanguages.EN) && amenity.titleEn) || ((i18n.language === currentLanguages.RU) && amenity.titleRu) || amenity.title }
                fill={true}
                className={styles.imgSvg}
                sizes="24px"
              />
            </figure>
              <figcaption>{((i18n.language === currentLanguages.EN) && amenity.titleEn) || ((i18n.language === currentLanguages.RU) && amenity.titleRu) || amenity.title}</figcaption>
          </li>
        ))}
      </ul>

      <div className={styles.bedsProposition}>
        <figure
          className={styles.imgSvgContainer}
        >
          <Image
            src={bed?.img}
            alt={
              ((i18n.language === currentLanguages.EN) && bed?.titleEn) || ((i18n.language === currentLanguages.RU) && bed?.titleRu) || bed?.title }
            fill={true}
            className={styles.imgSvg}
            sizes="24px"
          />
        </figure>
          <figcaption>{((i18n.language === currentLanguages.EN) && bed?.titleEn) || ((i18n.language === currentLanguages.RU) && bed?.titleRu) || bed?.title}</figcaption>
      </div>
    </article>
  );
};


export default Amenities;