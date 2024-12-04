import { useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
    Formik,
    Form,
    Field,
    ErrorMessage,
    validateYupSchema,
    yupToFormErrors,
} from "formik";
import DatePicker from "react-datepicker";
import { SiteContext } from "@/context/SiteContext";
import { orderSchema } from "@/yupSchemas/orderSchema";
import { addDays, subDays } from "@/utils/dateUtils";
import { sendToTelegram } from "@/utils/sendToTelegram";
import { useFetcherObjectNumbers } from "@/hooks/useFetcher";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useWindowResize } from "@/hooks/useWindowResize";
import { getLocaleCalendar } from "@/utils/getLocaleCalendar";
import SuccessContent from "./SuccessContent";
import LogoForm from "./LogoForm";
import styles from "./OrderForm.module.scss";
import seoStyles from "@/app/seoStyles.module.css";
import "react-datepicker/dist/react-datepicker.css";


const OrderForm = ({ id = "" }) => {
    const { t, i18n } = useTranslation();
    const schema = useMemo(() => orderSchema(), []);
    const listOfAppartmentNumbers = useFetcherObjectNumbers();
    const locale = getLocaleCalendar(i18n.language);
    const { isModalOpen, closeModal } = useContext(SiteContext);
    const { isMobile } = useWindowResize();

    useLockBodyScroll(isModalOpen);

    const initialValues = {
        userName: "",
        phone: "",
        objNumber: id,
        checkIn: null,
        checkOut: null,
    };

    const handleSubmit = (values, actions, closeModal) => {
        sendToTelegram(values);
        actions.setSubmitting(true);

        setTimeout(() => {
            closeModal();
            setTimeout(() => {
                actions.resetForm();
                actions.setSubmitting(false);
            }, 300);
        }, 2000);
    };


    return (
        <Formik
            initialValues={initialValues}
            validate={(values) => {
                try {
                    validateYupSchema(
                        values,
                        schema,
                        true,
                        listOfAppartmentNumbers
                    );
                } catch (err) {
                    return yupToFormErrors(err); //for rendering validation errors
                }

                return {};
            }}
            onSubmit={(values, actions) => {
                handleSubmit(values, actions, closeModal);
            }}
        >
            {(formik) => {
                const { errors, touched, isValid, values, isSubmitting } =
                    formik;

                return (
                    <div className={styles.container}>
                        <button
                            onClick={closeModal}
                            className={styles.closeBtn}
                        >
                            <svg className={styles.iconBtnClose}>
                                <use href='/sprite.svg#close' />
                            </svg>
                        </button>
                        <LogoForm />
                        <h3 className={seoStyles.titleHidden}>
                            Оренда квартири Київ. Київ квартири. Аренда квартиры
                            Киев.
                        </h3>
                        {isSubmitting ? (
                            <SuccessContent closeModal={closeModal} />
                        ) : (
                            <Form className={styles.form}>
                                <div className={styles.innerWrap}>
                                    <div className={styles.wrapError}>
                                        <svg className={styles.icon}>
                                            <use href='/sprite.svg#icon-user' />
                                        </svg>
                                        {errors.userName && (
                                            <svg className={styles.iconStatus}>
                                                <use href='/sprite.svg#exclamation-mark' />
                                            </svg>
                                        )}
                                        {!errors.userName &&
                                            values.userName && (
                                                <svg
                                                    className={
                                                        styles.iconStatus
                                                    }
                                                >
                                                    <use href='/sprite.svg#success' />
                                                </svg>
                                            )}
                                        <label
                                            htmlFor='userName'
                                            className={styles.label}
                                        >
                                            {t("Form.name")}
                                        </label>
                                        <Field
                                            type='text'
                                            name='userName'
                                            id='userName'
                                            placeholder={t("Form.name")}
                                            autoComplete='off'
                                            maxLength='30'
                                            className={`${styles.input} ${errors.userName
                                                    ? styles.inputError
                                                    : touched.userName &&
                                                        values.userName
                                                        ? styles.inputSuccess
                                                        : ""
                                                }`}
                                        />
                                        <ErrorMessage
                                            name='userName'
                                            className={styles.error}
                                            component='p'
                                        />
                                    </div>
                                    <div className={styles.wrapError}>
                                        <svg className={styles.icon}>
                                            <use href='/sprite.svg#icon-phone' />
                                        </svg>
                                        {(() => {
                                            const icon =
                                                (errors.phone &&
                                                    touched.phone) ||
                                                    (errors.phone && !isValid)
                                                    ? "/sprite.svg#exclamation-mark"
                                                    : !errors.phone &&
                                                        values.phone
                                                        ? "/sprite.svg#success"
                                                        : "/sprite.svg#snowflake";

                                            const iconClass =
                                                (errors.phone &&
                                                    touched.phone) ||
                                                    (errors.phone && !isValid)
                                                    ? styles.iconStatus
                                                    : !errors.phone &&
                                                        values.phone
                                                        ? styles.iconStatus
                                                        : styles.iconImportant;

                                            return (
                                                <svg className={iconClass}>
                                                    <use href={icon} />
                                                </svg>
                                            );
                                        })()}
                                        <label
                                            htmlFor='phone'
                                            className={styles.label}
                                        >
                                            {t("Form.phone")}
                                        </label>
                                        <Field
                                            type='text'
                                            name='phone'
                                            id='phone'
                                            placeholder={t("Form.phone")}
                                            autoComplete='off'
                                            maxLength='14'
                                            className={`${styles.input} ${errors.phone && touched.phone
                                                    ? styles.inputError
                                                    : touched.phone
                                                        ? styles.inputSuccess
                                                        : ""
                                                }`}
                                        />

                                        {(errors.phone && touched.phone) ||
                                            (errors.phone && !isValid) ? (
                                            <p className={styles.error}>
                                                {errors.phone}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                                <div className={styles.innerWrap}>
                                    <div className={styles.wrapError}>
                                        <svg
                                            className={`${styles.icon} ${styles.iconPicker}`}
                                        >
                                            <use href='/sprite.svg#icon-calendar' />
                                        </svg>

                                        {!values.checkIn && (
                                            <svg
                                                className={`${styles.icon} ${styles.iconPickerRight}`}
                                            >
                                                <use href='/sprite.svg#icon-chevron-down' />
                                            </svg>
                                        )}

                                        {values.checkIn && touched.checkIn && (
                                            <svg className={styles.iconStatus}>
                                                <use href='/sprite.svg#success' />
                                            </svg>
                                        )}
                                        <label
                                            htmlFor='checkIn'
                                            className={styles.label}
                                        >
                                            {t("Form.fieldDateOfEntry")}
                                        </label>
                                        <Field name='checkIn' id='checkIn'>
                                            {({ form, field }) => {
                                                const { setFieldValue } = form;
                                                const { value } = field;

                                                return (
                                                    <DatePicker
                                                        id='checkIn'
                                                        autoComplete='off'
                                                        dateFormat='dd/MM/yyyy'
                                                        locale={locale}
                                                        selectsStart
                                                        className={`${styles.input
                                                            } ${errors.checkIn &&
                                                                touched.checkIn
                                                                ? styles.inputError
                                                                : touched.checkIn &&
                                                                    values.checkIn
                                                                    ? styles.inputSuccess
                                                                    : ""
                                                            }`}
                                                        placeholderText={t(
                                                            "Form.plcHolderDateOfEntry"
                                                        )}
                                                        {...field}
                                                        selected={value}
                                                        onFocus={(e) =>
                                                            e.target.blur()
                                                        }
                                                        onChange={(val) => {
                                                            setFieldValue(
                                                                "checkOut",
                                                                null
                                                            );
                                                            setFieldValue(
                                                                "checkIn",
                                                                val
                                                            );
                                                        }}
                                                        excludeDateIntervals={[
                                                            {
                                                                start: subDays(
                                                                    new Date(),
                                                                    100
                                                                ),
                                                                end: addDays(
                                                                    new Date(),
                                                                    0
                                                                ),
                                                            },
                                                        ]}
                                                        includeDateIntervals={[
                                                            {
                                                                start: subDays(
                                                                    new Date(),
                                                                    2
                                                                ),
                                                                end: addDays(
                                                                    new Date(),
                                                                    700
                                                                ),
                                                            },
                                                        ]}
                                                    />
                                                );
                                            }}
                                        </Field>
                                        <ErrorMessage
                                            name='checkIn'
                                            className={styles.error}
                                            component='p'
                                        />
                                    </div>
                                    {/* check_Out  */}
                                    <div className={styles.wrapError}>
                                        <svg
                                            className={`${styles.icon} ${styles.iconPicker}`}
                                        >
                                            <use href='/sprite.svg#icon-calendar' />
                                        </svg>
                                        {!values.checkOut && (
                                            <svg
                                                className={`${styles.icon} ${styles.iconPickerRight}`}
                                            >
                                                <use href='/sprite.svg#icon-chevron-down' />
                                            </svg>
                                        )}

                                        {values.checkOut &&
                                            touched.checkOut && (
                                                <svg
                                                    className={
                                                        styles.iconStatus
                                                    }
                                                >
                                                    <use href='/sprite.svg#success' />
                                                </svg>
                                            )}
                                        <label
                                            htmlFor='checkOut'
                                            className={styles.label}
                                        >
                                            {t("Form.fieldDepartureDate")}
                                        </label>
                                        <Field name='checkOut' id='checkOut'>
                                            {({ form, field }) => {
                                                const { setFieldValue } = form;
                                                const { value } = field;
                                                return (
                                                    <DatePicker
                                                        id='checkOut'
                                                        autoComplete='off'
                                                        dateFormat='dd/MM/yyyy'
                                                        locale={locale}
                                                        disabled={
                                                            !values.checkIn
                                                        }
                                                        selectsEnd
                                                        minDate={values.checkIn}
                                                        className={`${styles.input
                                                            } ${errors.checkOut &&
                                                                touched.checkOut
                                                                ? styles.inputError
                                                                : touched.checkOut &&
                                                                    values.checkOut
                                                                    ? styles.inputSuccess
                                                                    : ""
                                                            }`}
                                                        placeholderText={t(
                                                            "Form.plcHolderDepartureDate"
                                                        )}
                                                        {...field}
                                                        selected={value}
                                                        onFocus={(e) =>
                                                            e.target.blur()
                                                        }
                                                        onChange={(val) =>
                                                            setFieldValue(
                                                                "checkOut",
                                                                val
                                                            )
                                                        }
                                                        includeDateIntervals={[
                                                            {
                                                                start: subDays(
                                                                    new Date(),
                                                                    2
                                                                ),
                                                                end: addDays(
                                                                    new Date(),
                                                                    700
                                                                ),
                                                            },
                                                        ]}
                                                    />
                                                );
                                            }}
                                        </Field>
                                        <ErrorMessage
                                            name='checkOut'
                                            className={styles.error}
                                            component='p'
                                        />
                                    </div>
                                </div>
                                <div className={styles.innerWrap}>
                                    <div className={styles.wrapError}>
                                        <svg className={styles.icon}>
                                            <use href='/sprite.svg#location' />
                                        </svg>
                                        {errors.objNumber && (
                                            <svg className={styles.iconStatus}>
                                                <use href='/sprite.svg#exclamation-mark' />
                                            </svg>
                                        )}
                                        {!errors.objNumber &&
                                            values.objNumber && (
                                                <svg
                                                    className={
                                                        styles.iconStatus
                                                    }
                                                >
                                                    <use href='/sprite.svg#success' />
                                                </svg>
                                            )}

                                        <label
                                            htmlFor='objNumber'
                                            className={styles.label}
                                        >
                                            {t("Form.fieldNumberObject")}
                                        </label>
                                        <Field
                                            type='text'
                                            name='objNumber'
                                            id='objNumber'
                                            autoComplete='off'
                                            maxLength='3'
                                            placeholder={t(
                                                "Form.plcHolderNumberOfObject"
                                            )}
                                            className={`${styles.input} ${errors.objNumber
                                                    ? styles.inputError
                                                    : touched.objNumber &&
                                                        values.objNumber
                                                        ? styles.inputSuccess
                                                        : ""
                                                }`}
                                        />
                                        <ErrorMessage
                                            name='objNumber'
                                            className={styles.error}
                                            component='p'
                                        />
                                    </div>
                                    <p className={styles.explainText}>
                                        * {t("Form.fieldsDesc")}
                                    </p>
                                </div>

                                <button
                                    disabled={!isValid}
                                    type='submit'
                                    className={
                                        isValid
                                            ? `${styles.button} ${styles.activeBtn}`
                                            : styles.button
                                    }
                                >
                                    {t("Buttons.OrderBtn")}
                                </button>
                            </Form>
                        )}
                        {isMobile && (
                            <p className={styles.stretchText}>
                                It is a hidden text to stretch content in a
                                small size
                            </p>
                        )}
                    </div>
                );
            }}
        </Formik>
    );
};


export default OrderForm;