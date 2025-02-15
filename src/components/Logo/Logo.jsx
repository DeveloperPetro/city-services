import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWindowResize } from '@/hooks/useWindowResize';

import styles from './Logo.module.scss';

const Logo = ({ className }) => {
  const { isDesktop } = useWindowResize();

  return (
    <Link
      href="/"
      prefetch={false}
      className={styles.container + ' ' + `${className}`}
    >
      <Image
        src={!isDesktop ? '/logoBlackSmall.webp' : '/logoBlackBig.webp'}
        alt="Логотип"
        fill={true}
        style={{ cursor: 'pointer' }}
        sizes="(max-width: 1365px) 85px, 212px"
      />
    </Link>
  );
};

export default Logo;
