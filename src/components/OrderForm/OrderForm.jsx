import { useMemo } from "react";
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
import "react-datepicker/dist/react-datepicker.css";
import { orderSchema } from "@/yupSchemas/orderSchema";
import { addDays, subDays } from "@/utils/dateUtils";
import { sendToTelegram } from "@/utils/sendToTelegram";
import { useFetcherObjectNumbers } from "@/hooks/useFetcher";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

import SuccessContent from "./SuccessContent";
import LogoForm from "./LogoForm";

import styles from "./OrderForm.module.scss";
import seoStyles from "@/app/seoStyles.module.css";

const initialValues = {
    userName: "",
    phone: "",
    objNumber: "",
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

const OrderForm = ({ isOpen, closeModal }) => {
    const { t } = useTranslation();
    const schema = useMemo(() => orderSchema(), []);
    const listOfAppartmentNumbers = useFetcherObjectNumbers();

    useLockBodyScroll(isOpen);

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
                                            Ім’я
                                        </label>
                                        <Field
                                            type='text'
                                            name='userName'
                                            id='userName'
                                            placeholder={t("Form.name")}
                                            autoComplete='off'
                                            maxLength='30'
                                            className={`${styles.input} ${
                                                errors.userName
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
                                            if (errors.phone && touched.phone) {
                                                return (
                                                    <svg
                                                        className={
                                                            styles.iconStatus
                                                        }
                                                    >
                                                        <use href='/sprite.svg#exclamation-mark' />
                                                    </svg>
                                                );
                                            } else if (
                                                !errors.phone &&
                                                values.phone
                                            ) {
                                                return (
                                                    <svg
                                                        className={
                                                            styles.iconStatus
                                                        }
                                                    >
                                                        <use href='/sprite.svg#success' />
                                                    </svg>
                                                );
                                            } else {
                                                return (
                                                    <svg
                                                        className={
                                                            styles.iconImportant
                                                        }
                                                    >
                                                        <use href='/sprite.svg#snowflake' />
                                                    </svg>
                                                );
                                            }
                                        })()}
                                        <label
                                            htmlFor='phone'
                                            className={styles.label}
                                        >
                                            Номер телефону
                                        </label>
                                        <Field
                                            type='text'
                                            name='phone'
                                            id='phone'
                                            placeholder={t("Form.phone")}
                                            autoComplete='off'
                                            maxLength='14'
                                            className={`${styles.input} ${
                                                errors.phone && touched.phone
                                                    ? styles.inputError
                                                    : touched.phone
                                                    ? styles.inputSuccess
                                                    : ""
                                            }`}
                                        />
                                        <ErrorMessage
                                            name='phone'
                                            className={styles.error}
                                            component='p'
                                        />
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
                                            Дата заїзду
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
                                                        selectsStart
                                                        className={`${
                                                            styles.input
                                                        } ${
                                                            errors.checkIn &&
                                                            touched.checkIn
                                                                ? styles.inputError
                                                                : touched.checkIn &&
                                                                  values.checkIn
                                                                ? styles.inputSuccess
                                                                : ""
                                                        }`}
                                                        placeholderText={t(
                                                            "Form.dateOfEntry"
                                                        )}
                                                        {...field}
                                                        selected={value}
                                                        onFocus={(e) =>
                                                            e.target.blur()
                                                        }
                                                        onChange={(val) =>
                                                            setFieldValue(
                                                                "checkIn",
                                                                val
                                                            )
                                                        }
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
                                            Дата виїзду
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
                                                        disabled={
                                                            !values.checkIn
                                                        }
                                                        selectsEnd
                                                        minDate={values.checkIn}
                                                        className={`${
                                                            styles.input
                                                        } ${
                                                            errors.checkOut &&
                                                            touched.checkOut
                                                                ? styles.inputError
                                                                : touched.checkOut &&
                                                                  values.checkOut
                                                                ? styles.inputSuccess
                                                                : ""
                                                        }`}
                                                        placeholderText={t(
                                                            "Form.departureDate"
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
                                            Номер об’єкту
                                        </label>
                                        <Field
                                            type='text'
                                            name='objNumber'
                                            id='objNumber'
                                            autoComplete='off'
                                            maxLength='3'
                                            placeholder={t(
                                                "Form.numberOfObject"
                                            )}
                                            className={`${styles.input} ${
                                                errors.objNumber
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
                    </div>
                );
            }}
        </Formik>
    );
};

export default OrderForm;
