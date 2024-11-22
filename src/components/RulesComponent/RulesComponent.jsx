"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import { RulesInApartment, Prohibited, Eviction, currentLanguages } from "@/data";
import seoStyles from "@/app/seoStyles.module.css";
import styles from "./RulesComponent.module.scss";


const RulesComponent = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);
  return (
    <section className="pageTopSection">
      <div className={`container ${styles.container}`}>
        <h1 className={seoStyles.titleHidden}>
          Оренда квартири Київ. Квартири подобово. Київ квартири.
        </h1>

        {!isLoading && <BreadCrumbs
          onClick={() => router.back()}
          title={t('BreadCrumbs.BackLink')}
          externalClass=""
        />}

        {!isLoading && (
          <>
            <h2 className={styles.rulesListTitle}>{t("RulesPage.MainTitle")}</h2>
            <ul className={styles.rulesList}>
              <li>
                <h3 className={styles.decimalListTitle}>
                  {t("RulesPage.TitleSection1")}
                </h3>
                <ol className={styles.decimalList}>
                  {RulesInApartment.map((item) => {
                    return (
                      <li key={item.id}>
                        <p>
                          {((i18n.language === currentLanguages.EN) && item.ruleEn) || ((i18n.language === currentLanguages.RU) && item.ruleRu) || item.rule}
                        </p>
                      </li>
                    );
                  })}
                </ol>
              </li>

              <li>
                <h3 className={styles.decimalListTitle}>
                  {t("RulesPage.TitleSection2")}
                </h3>
                <ol className={styles.decimalList}>
                  {Prohibited.map((item) => {
                    return (
                      <li key={item.id}>
                        <p>
                          {((i18n.language === currentLanguages.EN) && item.ruleEn) || ((i18n.language === currentLanguages.RU) && item.ruleRu) || item.rule}
                        </p>
                      </li>
                    );
                  })}
                </ol>
              </li>

              <li>
                <h3 className={styles.decimalListTitle}>
                  {t("RulesPage.TitleSection3")}
                </h3>
                <ol className={styles.decimalList}>
                  {Eviction.map((item) => {
                    return (
                      <li key={item.id}>
                        <p>
                          {((i18n.language === currentLanguages.EN) && item.ruleEn) || ((i18n.language === currentLanguages.RU) && item.ruleRu) || item.rule}
                        </p>
                      </li>
                    );
                  })}
                </ol>
              </li>
            </ul>
          </>
        )}
      </div>
    </section>
  );
};


export default RulesComponent;