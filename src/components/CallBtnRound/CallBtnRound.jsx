'use client';

import React from 'react';
import { socialLinks } from "@/data";
import styles from './CallBtnRound.module.scss';

const CallBtnRound = ({text}) => {
  return (
    <div className={styles.callBtn}>
      <a href={socialLinks.href}>{text}</a>
    </div>
  );
};

export default CallBtnRound;
