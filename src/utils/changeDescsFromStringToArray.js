import { v4 } from "uuid";


export const changeDescsFromStringToArray = (data) => {
    // массив для добавления description квартиры в карточку
    const descrioptionsArray = [];

    // строки из БД, которые преобразуется в массивы
    const descUaArrayFromData = data?.descriptionUa.split(" | ");
    const descEnArrayFromData = data?.descriptionEn.split(" | ");
    const descRuArrayFromData = data?.descriptionRu.split(" | ");

    // наполнение массива украинскими данными из БД
    descUaArrayFromData?.map((item) => {
        const id = v4();
        // присваивается переменной text значение item-a (описание на украинском языке)
        const textUa = item;

        //создается объект для хранения всех языков одного блока описания (украинский вариант записывается, а для английского и русского создаются переменные)
        const allLanguagesOfDescriptionObject = {
            id,
            textUa,
            textEn: "",
            textRu: "",
        };
        descrioptionsArray.push(allLanguagesOfDescriptionObject);
    });

    // английский и русский варианты записываются
    descrioptionsArray.map((item, index) => {
        item.textEn = descEnArrayFromData[index];
        item.textRu = descRuArrayFromData[index];
    });

    return descrioptionsArray;
}