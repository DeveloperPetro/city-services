"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { currentLanguages } from "@/data";
import styles from "./FilterItem.module.scss";


const FilterItem = ({
  id,
  titleEn,
  title,
  titleRu,
  activeIndex,
  setActiveIndex,
  setAmenitiesArr,
  isFilterClear,
  setIsFilterClear,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoad, setIsLoad] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    setIsChecked(false);
    setIsFilterClear(false);
    setAmenitiesArr([]);
  }, [isFilterClear]);

  useEffect(() => {
    setIsLoad(false);
  }, []);

  const isAmenityChecked = () =>
    id === activeIndex ? setIsChecked(!isChecked) : null;

  const toggleAmenityForFilter = () => {
    if (!isChecked) {
      setAmenitiesArr((amenitiesArr) => [...amenitiesArr, title]);
    } else {
      setAmenitiesArr((amenitiesArr) =>
        amenitiesArr.filter((amenity) => amenity != title)
      );
    }
  };

  useEffect(() => {
    isAmenityChecked();
  }, [activeIndex]);

  const filterCheckboxStyles = isChecked
    ? styles.filterInputCheckbox__Checked
    : styles.filterInputCheckbox;


  return (
    <>
      {!isLoad && (
        <li className={styles.filterItem}>
          <p className={styles.filterCheckboxTitle}>
            {((i18n.language === currentLanguages.EN) && titleEn) || ((i18n.language === currentLanguages.RU) && titleRu) || title}
          </p>
          <input
            id={id}
            type="checkbox"
            className={filterCheckboxStyles}
            aria-label={((i18n.language === currentLanguages.EN) && titleEn) || ((i18n.language === currentLanguages.RU) && titleRu) || title}
            checked={isChecked}
            onChange={() => {
              setActiveIndex(id),
                isAmenityChecked(),
                toggleAmenityForFilter(),
                setIsFilterClear(false);
            }}
          />
        </li>
      )}
    </>
  );
};


export default FilterItem;