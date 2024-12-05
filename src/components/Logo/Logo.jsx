import React from 'react';
import logo from '/public/logo.png';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Logo.module.scss';


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
        sizes="(max-width: 1365px) 85px, 212px"
      />
    </Link>
  );
};


export default Logo;