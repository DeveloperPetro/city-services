import React from 'react';
import { socialLinks } from '@/data/socialLinks';
import styles from './SocialLinksFooter.module.scss';


const SocialLinksFooter = ({ className }) => {


  return (
    <ul className={styles.socialLinks + ' ' + `${className}`}>
      {socialLinks.map((item) => {
        return (
          <li key={item.id} className={styles.socialItem}>
            <a
              href={item.href}
              {...(item.title !== 'Telephone' && {
                target: '_blank',
                rel: 'noopener noreferrer',
              })}
              className={styles.socialIcon}
            >
              <div className={styles.icon}>
                <svg>
                  <use href={item.icon} />
                </svg>
              </div>

              <p className={styles.subtitle + ' ' + 'textLinkAnimation'}>
                {item.subtitle}
              </p>
            </a>
          </li>
        );
      })}
    </ul>
  );
};


export default SocialLinksFooter;