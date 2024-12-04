import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { SiteContext } from "@/context/SiteContext";
import styles from "./OrderBtn.module.scss";


const OrderBtn = ({ className }) => {
    const { t } = useTranslation();
    const { openModal } = useContext(SiteContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);


    return (
        <>
            {!isLoading && (
                <button
                    type='button'
                    className={styles.button + " " + `${className}`}
                    onClick={openModal}
                >
                    {t("Buttons.OrderBtn")}
                </button>
            )}
        </>
    );
};


export default OrderBtn;