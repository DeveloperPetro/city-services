import React from 'react';
import styles from './Logo.module.scss';
import logo from '/public/logo.png';
import Link from 'next/link';
import Image from 'next/image';

const Logo = ({ className }) => {
  return (
    <Link
      href="/"
      prefetch={false}
      className={styles.container + ' ' + `${className}`}
    >
      <Image
        src={logo}
        alt="Логотип"
        fill={true}
        style={{ cursor: 'pointer' }}
        sizes="(max-width: 768px) 88px, (max-width: 1200px) 212px"
      />
    </Link>
  );
};

export default Logo;
