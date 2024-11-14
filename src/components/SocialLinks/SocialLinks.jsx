import React from 'react';
import styles from './SocialLinks.module.scss';
import { socialLinks } from '@/data/socialLinks';
import Image from 'next/image';

const SocialLinks = ({ className }) => {
  return (
    <ul className={styles.socialLinks + ' ' + `${className}`}>
      {socialLinks.map((item) => {
        return (
          <li key={item.id} className={styles.socialItem}>
            <a href={item.href} target="_blank" className={styles.socialIcon}>
              <Image
                src={item.img}
                fill={true}
                alt={item.title}
                title={item.title}
              />
            </a>
            {item.title === 'Telephone' && (
              <a href={item.href} target="_blank" className={styles.phone}>
                {item.subtitle}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default SocialLinks;
