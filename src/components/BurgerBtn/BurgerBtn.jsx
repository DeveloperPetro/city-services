'use client';
import React from 'react';
import styles from './BurgerBtn.module.scss';


const BurgerBtn = ({ onClick, burgerMenu, id }) => {
  return (
    <button
      id={id}
      className={
        !burgerMenu
          ? styles.burgerBtn
          : styles.burgerBtn + ' ' + styles.lineClose
      }
      onClick={onClick}
      aria-label="Button burger menu"
      title="Burger Menu"
    >
      <span className={styles.line}></span>
    </button>
  );
};


export default BurgerBtn;