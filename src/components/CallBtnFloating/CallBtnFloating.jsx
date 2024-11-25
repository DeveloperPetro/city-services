import { socialLinks } from '@/data';
import styles from './CallBtnFloating.module.scss';

const CallBtnFloating = () => {
  const phoneLink = socialLinks.find(
    (link) => link.title === 'Telephone'
  )?.href;
  return (
    <div className={styles.callBtn}>
      <a href={phoneLink}>
        <svg>
          <use href="/sprite.svg#phone-new" />
        </svg>
      </a>
    </div>
  );
};

export default CallBtnFloating;
