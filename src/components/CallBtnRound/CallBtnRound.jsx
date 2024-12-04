'use client';
import React from 'react';
import { socialLinks } from '@/data';
import styles from './CallBtnRound.module.scss';


const CallBtnRound = ({ text }) => {
  // Найти объект с телефоном
  const phoneLink = socialLinks.find(link => link.title === 'Telephone')?.href;


  return (
    <div className={styles.callBtn}>
      <a href={phoneLink}>{text}</a>
    </div>
  );
};


export default CallBtnRound;