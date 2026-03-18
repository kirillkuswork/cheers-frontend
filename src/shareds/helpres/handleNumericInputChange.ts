import { ChangeEvent } from 'react';

// Функция для обработки изменения значения инпута, чтобы удалять все символы, кроме цифр.
// Эта функция позволяет вводить только цифры в инпуте когда инпут с типом text.
// Инпут с типом number не может ограничить ввод определенного количества символов.
// Сделано например, чтобы вводит число от 0 до 5

export const handleNumericInputChange = (
  e: ChangeEvent<HTMLInputElement>,
  onChange: (value: string) => void,
) => {
  const { value } = e.target;

  // Разрешаем только цифры от 0 до 9 и запятую
  const clearedValue = value.replace(/[^0-9,]/g, '');

  // Разрешаем только одну запятую
  const parts = clearedValue.split(',');
  if (parts.length > 2) {
    return;
  }

  // Проверяем, что значение не превышает 5 и десятые не больше 9
  const numericValue = parseFloat(clearedValue.replace(',', '.'));
  if (numericValue > 5 || (parts[1] && parseInt(parts[1], 10) > 9)) {
    return;
  }

  // Запрещаем ввод запятой после 5
  if (parts[0] && parseInt(parts[0], 10) >= 5 && parts.length === 2) {
    return;
  }

  onChange(clearedValue);
};
