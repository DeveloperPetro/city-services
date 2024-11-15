'use client';

import React from 'react';
import styles from './CallBtnRound.module.scss';

const CallBtnRound = () => {
  return (
    <div className={styles.callBtn}>
      <a href="tel:+380991930030">Зв’язатись</a>
    </div>
  );
};

export default CallBtnRound;
