import { useTranslation } from "react-i18next";

import styles from "./OrderForm.module.scss";

const SuccessContent = ({ closeModal }) => {
    const { t } = useTranslation();

    return (
        <div className={styles.successContainer}>
            <div className={styles.successWrap}>
                <p className={styles.successText}>
                    {t("Form.formSubmitedMsg1")}
                </p>

                <p className={styles.successText}>
                    {t("Form.formSubmitedMsg2")}
                </p>
            </div>
            <button
                onClick={closeModal}
                className={`${styles.button} ${styles.activeBtn}`}
            >
                {t("Buttons.CloseBtn")}
            </button>
        </div>
    );
};

export default SuccessContent;
