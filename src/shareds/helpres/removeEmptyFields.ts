/* eslint-disable @typescript-eslint/no-unused-vars */
// Функция для удаления лишних полей в объекте
const removeEmptyFields = (obj : object) => Object.fromEntries(Object.entries(obj).filter(([_, v]) => v));
export default removeEmptyFields;
