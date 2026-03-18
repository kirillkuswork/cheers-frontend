import React, {
  ChangeEvent,
  ClipboardEvent,
  KeyboardEvent,
  RefObject,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Input } from '@/shareds';
import { IBaseInputProps } from '@/shareds/ui/BaseInput';
import styles from './styles.module.scss';

interface CodeInputProps extends Omit<IBaseInputProps, 'onChange' | 'value'> {
  onChange?: (value: string) => void;
  error?: boolean;
  errorMsg?: string;
  value?: string;
}

// Функция для генерации уникальных идентификаторов
const generateUniqueId = () => `${Date.now()}-${Math.random()}`;

export const CodeInput = (props: CodeInputProps) => {
  const {
    onChange, error, errorMsg = '', ...inputProps
  } = props;

  // Определение наличия ошибки
  const isError = errorMsg && error;
  // Количество инпутов
  const inputsCount = 4;

  // Создание уникальных идентификаторов для каждого инпута
  const inputIds = useMemo(
    () => Array.from({ length: inputsCount }, () => generateUniqueId()),
    [inputsCount],
  );

  // Создание рефов для каждого инпута
  const inputRefs: RefObject<HTMLInputElement>[] = useMemo(
    () => Array(inputsCount)
      .fill(null)
      .map(() => React.createRef<HTMLInputElement>()),
    [inputsCount],
  );

  // Состояние для хранения введенного кода
  const [code, setCode] = useState<string[]>(Array(inputsCount).fill(''));

  // Вызываем onChange каждый раз при изменении кода
  useEffect(() => {
    onChange?.(code.join(''));
  }, [code, onChange]);

  // Устанавливаем фокус на первый инпут при монтировании компонента
  useEffect(() => {
    inputRefs[0]?.current?.focus();
  }, [inputRefs]);

  // Функция для установки фокуса на следующий инпут
  const setFocus = (currentIndex: number): void => {
    if (currentIndex < inputsCount - 1) {
      inputRefs[currentIndex + 1]?.current?.focus();
    }
  };

  // Обработчик изменения инпута
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    currentIndex: number,
  ) => {
    const { value } = e.target;
    // Проверка на ввод нечислового значения
    if (/\D/.test(value)) {
      return;
    }

    // Обновление кода
    const updatedCode = [...code];
    updatedCode[currentIndex] = value;

    setCode(updatedCode);

    // Установка фокуса на следующий инпут при вводе значения
    if (value) {
      setFocus(currentIndex);
    }
  };

  // Обработчик нажатия клавиши Backspace
  const handleKeyDownBackspace = (
    e: KeyboardEvent<HTMLInputElement>,
    currentIndex: number,
  ): void => {
    if (e.key === 'Backspace') {
      const updatedCode = [...code];
      updatedCode[currentIndex] = '';

      setCode(updatedCode);

      // Перемещение фокуса на предыдущий инпут при удалении значения
      if (currentIndex > 0) {
        inputRefs[currentIndex - 1]?.current?.focus();
      }
    }
  };

  // Обработчик нажатия клавиш
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    // Предотвращение ввода нечисловых значений
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  // Обработчик вставки значений
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pastedValue: string[] = e.clipboardData
      .getData('Text')
      .split('')
      .filter((char) => /\d/.test(char));

    const updatedCode = [...code];
    pastedValue.forEach((char, index) => {
      if (index < inputsCount) {
        updatedCode[index] = char;
      }
    });

    setCode(updatedCode);
  };

  return (
    <div>
      <div className={styles.wrapper}>
        {inputRefs.map((inputRef, index) => (
          <Input.Container
            error={error}
            className={styles.container}
            key={inputIds[index]}
          >
            <Input.Inner>
              <Input.BaseInput
                placeholder=""
                type="number"
                inputRef={inputRef}
                maxLength={1}
                error={error}
                className={styles.codeInput}
                onWheel={(e) => e.currentTarget.blur()}
                onChange={(e) => handleInputChange(e, index)}
                onPaste={handlePaste}
                onKeyDown={(e) => handleKeyDownBackspace(e, index)}
                onKeyPress={handleKeyPress}
                {...inputProps}
                value={code[index]}
              />
            </Input.Inner>
          </Input.Container>
        ))}
      </div>
      {isError && <Input.ErrorLabel>{errorMsg}</Input.ErrorLabel>}
    </div>
  );
};
