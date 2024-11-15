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
        style={{ cursor: 'pointer' }} // Удобно для пользователя
      />
    </Link>
  );
};

export default Logo;
