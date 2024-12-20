"use client";
import { CldUploadButton } from "next-cloudinary";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { updatingDashboardSchema } from "@/yupSchemas/updatingDashboardSchema";
import { handleDeleteImgFromCloudinary } from "@/utils/handleDeleteImgFromCloudinary";
import { isDeepEqual } from "@/utils/deepEqual";
import styles from "./UpdatingForm.module.scss";


const UpdatingForm = ({ id, apart, mutate }) => {
  const {
    objNumber,
    priority,
    titleImg,
    imgs,
    addressUa,
    addressEn,
    addressRu,
    complexUa,
    complexEn,
    complexRu,
    districtUa,
    districtEn,
    districtRu,
    flatNumber,
    googleMapLocation,
    price,
    roomsQuantity,
    bookingUrl,
    amenities,
    bedsQuantity,
    descriptionUa,
    descriptionEn,
    descriptionRu,
  } = apart;

  const currentValues = {
    priority,
    titleImg,
    imgs,
    addressUa,
    addressEn,
    addressRu,
    complexUa,
    complexEn,
    complexRu,
    districtUa,
    districtEn,
    districtRu,
    flatNumber,
    googleMapLocation,
    price,
    roomsQuantity,
    bookingUrl,
    amenities,
    bedsQuantity,
    descriptionUa,
    descriptionEn,
    descriptionRu,
  };

  const initialValues = {
    newPriority: priority,
    newTitleImg: titleImg,
    newImgs: imgs,
    newAddressUa: addressUa,
    newAddressEn: addressEn,
    newAddressRu: addressRu,
    newComplexUa: complexUa,
    newComplexEn: complexEn,
    newComplexRu: complexRu,
    newDistrictUa: districtUa,
    newDistrictEn: districtEn,
    newDistrictRu: districtRu,
    newFlatNumber: flatNumber,
    newGoogleMapLocation: googleMapLocation,
    newPrice: price,
    newRoomsQuantity: roomsQuantity,
    newBookingUrl: bookingUrl,
    newAmenities: amenities,
    newBedsQuantity: bedsQuantity,
    newDescriptionUa: descriptionUa,
    newDescriptionEn: descriptionEn,
    newDescriptionRu: descriptionRu,
  };

  const handleSubmit = async (values, actions) => {
    const {
      newPriority,
      newTitleImg,
      newImgs,
      newAddressUa,
      newAddressEn,
      newAddressRu,
      newComplexUa,
      newComplexEn,
      newComplexRu,
      newDistrictUa,
      newDistrictEn,
      newDistrictRu,
      newFlatNumber,
      newGoogleMapLocation,
      newPrice,
      newRoomsQuantity,
      newBookingUrl,
      newAmenities,
      newBedsQuantity,
      newDescriptionUa,
      newDescriptionEn,
      newDescriptionRu,
    } = values;

    const updatedValues = {
      priority: newPriority,
      titleImg: newTitleImg,
      imgs: newImgs,
      addressUa: newAddressUa,
      addressEn: newAddressEn,
      addressRu: newAddressRu,
      complexUa: newComplexUa,
      complexEn: newComplexEn,
      complexRu: newComplexRu,
      districtUa: newDistrictUa,
      districtEn: newDistrictEn,
      districtRu: newDistrictRu,
      flatNumber: newFlatNumber,
      googleMapLocation: newGoogleMapLocation,
      price: newPrice,
      roomsQuantity: newRoomsQuantity,
      bookingUrl: newBookingUrl,
      amenities: newAmenities,
      bedsQuantity: newBedsQuantity,
      descriptionUa: newDescriptionUa,
      descriptionEn: newDescriptionEn,
      descriptionRu: newDescriptionRu,
    };

    if (isDeepEqual(currentValues, updatedValues)) {
      toast.warning(`Ви не внесли змін в обʼєкт №: ${objNumber}`);
      return;
    }

    try {
      await fetch(`/api/apartments/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedValues),
      });
      // автоматично оновлює сторінку при зміні кількості карток
      mutate();
      // обнуляє форму
      actions.resetForm();
      toast.success(`Дані обʼєкту №: ${objNumber} оновлено`);
    } catch (err) {
      toast.error(`Помилка! Обʼєкт №: ${objNumber} не оновлено`);
    }
  };


  return (
    <div className={styles.formWrapper}>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={updatingDashboardSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
        }}
      >
        {(formik) => {
          const { isValid, values, setFieldValue } = formik;

          return (
            <Form className={styles.new}>
              <h1>Редагування обʼєкту</h1>
              <p>Номер обʼєкту: {objNumber}</p>

              <label htmlFor="priority">Пріоритет:</label>
              <ErrorMessage
                name="newPriority"
                className={styles.error}
                component="p"
              />
              <Field
                type="text"
                name="newPriority"
                id="priority"
                maxLength="3"
                value={values.newPriority}
                className={styles.input}
              />

              <CldUploadButton
                name="newTitleImg"
                className={styles.uploadBtn}
                onUpload={(result, widget) => {
                  handleDeleteImgFromCloudinary(titleImg);
                  setFieldValue("newTitleImg", result.info.public_id);
                  widget.close();
                }}
                options={{ multiple: false }}
                uploadPreset="unsigned_preset"
              >
                Змінити ГОЛОВНЕ фото (тільки .WEBP)
              </CldUploadButton>

              <ErrorMessage
                name="newImgs"
                className={styles.error}
                component="p"
              />
              <CldUploadButton
                name="newImgs"
                className={styles.uploadBtn}
                onUpload={(result) => {
                  setFieldValue("newImgs", [
                    ...values.newImgs,
                    result.info.public_id,
                  ]);
                }}
                uploadPreset="unsigned_preset"
              >
                Додати додаткові фото (тільки .WEBP)
              </CldUploadButton>

              <label htmlFor="newAddressUa">Адреса українською:</label>
              <ErrorMessage
                name="newAddressUa"
                className={styles.error}
                component="p"
              />
              <Field
                type="text"
                name="newAddressUa"
                id="newAddressUa"
                maxLength="100"
                value={values.newAddressUa}
                className={styles.input}
              />

              <label htmlFor="newAddressEn">Адреса англійською:</label>
              <ErrorMessage
                name="newAddressEn"
                className={styles.error}
                component="p"
              />
              <Field
                type="text"
                name="newAddressEn"
                id="newAddressEn"
                value={values.newAddressEn}
                className={styles.input}
              />

              <label htmlFor="newAddressRu">Адреса російською:</label>
              <ErrorMessage
                name="newAddressRu"
                className={styles.error}
                component="p"
              />
              <Field
                type="text"
                name="newAddressRu"
                id="newAddressRu"
                value={values.newAddressRu}
                className={styles.input}
              />

              <label htmlFor="newComplexUa">Житловий комплекс українською:</label>
              <ErrorMessage
                name="newComplexUa"
                className={styles.error}
                component="p"
              />
              <Field
                type="text"
                name="newComplexUa"
                id="newComplexUa"
                maxLength="100"
                value={values.newComplexUa}
                className={styles.input}
              />

              <label htmlFor="newComplexEn">Житловий комплекс англійською:</label>
              <ErrorMessage
                name="newComplexEn"
                className={styles.error}
                component="p"
              />
              <Field
                type="text"
                name="newComplexEn"
                id="newComplexEn"
                value={values.newComplexEn}
                className={styles.input}
              />

              <label htmlFor="newComplexRu">Житловий комплекс російською:</label>
              <ErrorMessage
                name="newComplexRu"
                className={styles.error}
                component="p"
              />
              <Field
                type="text"
                name="newComplexRu"
                id="newComplexRu"
                value={values.newComplexRu}
                className={styles.input}
              />

              <label htmlFor="newDistrictUa">Район українською:</label>
              <ErrorMessage
                name="newDistrictUa"
                className={styles.error}
                component="p"
              />
              <Field
                type="text"
                name="newDistrictUa"
                id="newDistrictUa"
                maxLength="100"
                value={values.newDistrictUa}
                className={styles.input}
              />

              <label htmlFor="newDistrictEn">Район англійською:</label>
              <ErrorMessage
                name="newDistrictEn"
                className={styles.error}
                component="p"
              />
              <Field
                type="text"
                name="newDistrictEn"
                id="newDistrictEn"
                value={values.newDistrictEn}
                className={styles.input}
              />

              <label htmlFor="newDistrictRu">Район російською:</label>
              <ErrorMessage
                name="newDistrictRu"
                className={styles.error}
                component="p"
              />
              <Field
                type="text"
                name="newDistrictRu"
                id="newDistrictRu"
                value={values.newDistrictRu}
                className={styles.input}
              />

              <label htmlFor="newFlatNumber">Квартира:</label>
              <ErrorMessage
                name="newFlatNumber"
                className={styles.error}
                component="p"
              />
              <Field
                type="text"
                name="newFlatNumber"
                id="newFlatNumber"
                maxLength="8"
                value={values.newFlatNumber}
                className={styles.input}
              />

              <label htmlFor="Location"> Місцезнаходження:</label>
              <ErrorMessage
                name="newGoogleMapLocation"
                className={styles.error}
                component="p"
              />
              <Field
                type="text"
                name="newGoogleMapLocation"
                id="Location"
                value={values.newGoogleMapLocation}
                className={styles.input}
              />

              <label htmlFor="Price">Ціна:</label>
              <ErrorMessage
                name="newPrice"
                className={styles.error}
                component="p"
              />
              <Field
                type="text"
                name="newPrice"
                id="Price"
                maxLength="7"
                value={values.newPrice}
                className={styles.input}
              />

              <fieldset className={styles.roomsQuantity}>
                <legend>Кількість кімнат:</legend>
                <Field
                  type="radio"
                  id="oneRoom"
                  name="newRoomsQuantity"
                  value="1"
                />
                <label htmlFor="oneRoom">1</label>
                <Field
                  type="radio"
                  id="twoRooms"
                  name="newRoomsQuantity"
                  value="2"
                />
                <label htmlFor="twoRooms">2</label>
                <Field
                  type="radio"
                  id="threeRooms"
                  name="newRoomsQuantity"
                  value="3"
                />
                <label htmlFor="threeRooms">3</label>
              </fieldset>

              <label html="Booking">Booking.com:</label>
              <ErrorMessage
                name="newBookingUrl"
                className={styles.error}
                component="p"
              />
              <Field
                type="text"
                name="newBookingUrl"
                id="Booking"
                value={values.newBookingUrl}
                className={styles.input}
              />

              <ErrorMessage
                name="newAmenities"
                className={styles.error}
                component="p"
              />
              <fieldset className={styles.amenities}>
                <legend>Додатковий комфорт:</legend>
                <label htmlFor="wi-fi">
                  <Field
                    type="checkbox"
                    id="wi-fi"
                    name="newAmenities"
                    value="Wi-Fi"
                  />
                  Wi-Fi
                </label>
                <label htmlFor="smartTV">
                  <Field
                    type="checkbox"
                    id="smartTV"
                    name="newAmenities"
                    value="Smart TV"
                  />
                  Smart TV
                </label>
                <label htmlFor="airCond">
                  <Field
                    type="checkbox"
                    id="airCond"
                    name="newAmenities"
                    value="Кондиціонер"
                  />
                  Кондиціонер
                </label>
                <label htmlFor="bath">
                  <Field
                    type="checkbox"
                    id="bath"
                    name="newAmenities"
                    value="Ванна"
                  />
                  Ванна
                </label>
                <label htmlFor="shower">
                  <Field
                    type="checkbox"
                    id="shower"
                    name="newAmenities"
                    value="Душова кабіна"
                  />
                  Душова кабіна
                </label>
                <label htmlFor="jacuzzi">
                  <Field
                    type="checkbox"
                    id="jacuzzi"
                    name="newAmenities"
                    value="Джакузі"
                  />
                  Джакузі
                </label>
                <label htmlFor="waterHeater">
                  <Field
                    type="checkbox"
                    id="waterHeater"
                    name="newAmenities"
                    value="Водонагрівач"
                  />
                  Водонагрівач
                </label>
                <label htmlFor="boiler">
                  <Field
                    type="checkbox"
                    id="boiler"
                    name="newAmenities"
                    value="Котел"
                  />
                  Котел
                </label>
                <label htmlFor="washingMachine">
                  <Field
                    type="checkbox"
                    id="washingMachine"
                    name="newAmenities"
                    value="Пральна машина"
                  />
                  Пральна машина
                </label>
                <label htmlFor="microwave">
                  <Field
                    type="checkbox"
                    id="microwave"
                    name="newAmenities"
                    value="Мікрохвильова піч"
                  />
                  Мікрохвильова піч
                </label>
                <label htmlFor="balcony">
                  <Field
                    type="checkbox"
                    id="balcony"
                    name="newAmenities"
                    value="Балкон"
                  />
                  Балкон
                </label>
                <label htmlFor="parking">
                  <Field
                    type="checkbox"
                    id="parking"
                    name="newAmenities"
                    value="Парковка"
                  />
                  Парковка
                </label>
              </fieldset>

              <fieldset className={styles.bedsQuantity}>
                <legend>Кількість спальних місць:</legend>
                <Field
                  type="radio"
                  id="twoBeds"
                  name="newBedsQuantity"
                  value="2"
                />
                <label htmlFor="twoBeds">2</label>
                <Field
                  type="radio"
                  id="threeBeds"
                  name="newBedsQuantity"
                  value="3"
                />
                <label htmlFor="threeBeds">3</label>
                <Field
                  type="radio"
                  id="fourBeds"
                  name="newBedsQuantity"
                  value="4"
                />
                <label htmlFor="fourBeds">4</label>
                <Field
                  type="radio"
                  id="fiveBeds"
                  name="newBedsQuantity"
                  value="5"
                />
                <label htmlFor="fiveBeds">5</label>
                <Field
                  type="radio"
                  id="sixBeds"
                  name="newBedsQuantity"
                  value="6"
                />
                <label htmlFor="sixBeds">6</label>
              </fieldset>

              <label htmlFor="newDescriptionUa">Опис українською:</label>
              <ErrorMessage
                name="newDescriptionUa"
                className={styles.error}
                component="p"
              />
              <Field
                as="textarea"
                type="text"
                name="newDescriptionUa"
                id="newDescriptionUa"
                value={values.newDescriptionUa}
                className={styles.textarea}
                rows={5}
              />

              <label htmlFor="newDescriptionEn">Опис англійською:</label>
              <ErrorMessage
                name="newDescriptionEn"
                className={styles.error}
                component="p"
              />
              <Field
                as="textarea"
                type="text"
                name="newDescriptionEn"
                id="newDescriptionEn"
                value={values.newDescriptionEn}
                className={styles.textarea}
                rows={5}
              />

              <label htmlFor="newDescriptionRu">Опис російською:</label>
              <ErrorMessage
                name="newDescriptionRu"
                className={styles.error}
                component="p"
              />
              <Field
                as="textarea"
                type="text"
                name="newDescriptionRu"
                id="newDescriptionRu"
                value={values.newDescriptionRu}
                className={styles.textarea}
                rows={5}
              />

              <button
                type="submit"
                disabled={!isValid}
                className={
                  isValid ? `${styles.button} ${styles.sendBtn}` : styles.button
                }
              >
                Оновити дані обʼєкту
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};


export default UpdatingForm;