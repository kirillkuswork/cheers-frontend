/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FC, useEffect, useState, useMemo, useCallback, useRef, memo,
} from 'react';
import {
  Controller, useFieldArray, useWatch,
} from 'react-hook-form';
import { MainInput } from '@/shareds/ui/MainInput';
import { FormSectionWrapper } from '@/admin/components/FormSectionWrapper';
import { SelectInput } from '@/shareds/ui/SelectInput';
import { IconButton } from '@/shareds';
import { Plus, Trash } from '@/assets/icons';
import { ITasteNotes, ITasteNoteWithName } from '@/redux/services/types/admin';
import { IProductCardFormProps } from '@/admin/sections/Management/ProductManagement/ProductCardForm/types';
import { useLazyGetAdminTasteNoteQuery } from '@/redux/services/adminApi';
import styles from './styles.module.scss';

interface ITasteNotesForm extends IProductCardFormProps {}

export const TasteNotesForm: FC<ITasteNotesForm> = memo(({
  control,
  setValue,
  values,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'taste_notes',
  });
  const tasteNotesWatch = useWatch({
    control,
    name: 'taste_notes',
  });

  const selectRef = useRef<HTMLDivElement>(null);
  const initialTasteNotes: ITasteNoteWithName[] = values?.taste_notes;
  const [getTasteNote] = useLazyGetAdminTasteNoteQuery();

  const [localCursor, setCursor] = useState<string | null>(null);
  const [tasteNotes, setTasteNotes] = useState<ITasteNotes[]>([]);

  useEffect(() => {
    getTasteNote({
      pagination: {
        cursor: null,
        limit: 100,
      },
    }).then((res) => {
      if (res.data) {
        setCursor(res?.data?.pagination.cursor);
        setTasteNotes(res?.data?.taste_notes);
      }
    });
  }, [getTasteNote]);

  useEffect(() => {
    if (initialTasteNotes && initialTasteNotes.length > 0) {
      initialTasteNotes.forEach((note) => {
        append({ name: note.name, percent: note.percent, id: note.id });
      });
    } else {
      append({ name: '', percent: null, id: null });
    }
  }, [append]);

  const totalPercent = useMemo(
    () => tasteNotesWatch?.reduce((sum: number, note: { percent: number }) => sum + (Number(note?.percent) || 0), 0) || 0,
    [tasteNotesWatch],
  );

  const canAddNote = fields.length > 0 && fields.length < 6 && totalPercent < 100;

  const handleAddNote = useCallback(() => {
    if (canAddNote) {
      append({ name: '', percent: null, id: null });
    }
  }, [canAddNote, append]);

  const handleRemoveNote = useCallback((index: number) => {
    remove(index);
  }, [remove]);

  const handlePercentChange = (onChange: (value: string) => void, value: string, index: number) => {
    const parsedValue = Number(value);
    const remainingPercent = 100 - totalPercent + (Number(tasteNotesWatch?.[index]?.percent) || 0);

    if (parsedValue <= remainingPercent) {
      onChange(value);
    } else {
      onChange(remainingPercent.toString());
    }
  };

  // Обработка прокрутки для загрузки новой порции данных, сделал здесь потому что селекты не уникальны в данном случае
  const handleScroll = async () => {
    if (selectRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = selectRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10 && localCursor !== null) {
        const response = await getTasteNote({
          pagination: { cursor: localCursor, limit: 100 },
        });
        if (response?.data?.taste_notes) {
          setTasteNotes((prev) => [...prev, ...response?.data?.taste_notes || []]);
          setCursor(response.data?.pagination.cursor);
        }
      }
    }
  };

  return (
    <FormSectionWrapper
      title="Вкусовые нотки"
      description="Максимально можно добавить 6 ноток, в сумме должно быть 100%"
      childrenClassName={styles.container}
    >
      {fields?.map((field, index) => (
        <div key={field.id} className={styles.wrapper}>
          <Controller
            name={`taste_notes.${index}.id`}
            control={control}
            render={({ field: idField }) => <input type="hidden" {...idField} />}
          />

          <Controller
            name={`taste_notes.${index}.name`}
            control={control}
            rules={{
              validate: (value) => {
                const percent = tasteNotesWatch?.[index]?.percent;
                if (value || percent) {
                  return !!value || 'Нотка обязательна';
                }
                return true;
              },
            }}
            render={({ field: selectField, fieldState: { error } }) => (
              <SelectInput
                {...selectField}
                options={tasteNotes}
                label="Нотка"
                className={styles.note}
                handleScroll={handleScroll}
                selectRef={selectRef}
                cursor={localCursor!}
                onChange={(item) => {
                  selectField.onChange(item.value);
                  if (setValue) {
                    setValue(`taste_notes.${index}.id`, item.id);
                  }
                }}
                error={!!error}
                errorMsg={error?.message || 'Обязательно к заполнению'}
              />
            )}
          />

          <Controller
            name={`taste_notes.${index}.percent`}
            control={control}
            rules={{
              validate: (value) => {
                const name = tasteNotesWatch?.[index]?.name;
                if (value || name) {
                  return !!value || 'Процент обязателен';
                }
                return true;
              },
            }}
            render={({ field: inputField, fieldState: { error } }) => (
              <MainInput
                {...inputField}
                type="number"
                label="%"
                containerClassName={styles.percent}
                showClearButton
                onChange={(e) => handlePercentChange(inputField.onChange, e.target.value, index)}
                error={!!error}
                errorMsg={error?.message || 'Обязательно к заполнению'}
              />
            )}
          />

          <div className={styles.buttonWrapper}>
            {canAddNote && index === fields.length - 1 ? (
              <IconButton onClick={handleAddNote} className={styles.formButton} size="large" icon={<Plus />} />
            ) : (
              <IconButton onClick={() => handleRemoveNote(index)} className={styles.formButton} size="large" icon={<Trash />} />
            )}
          </div>
        </div>
      ))}
    </FormSectionWrapper>
  );
});

TasteNotesForm.displayName = 'TasteNotesForm';
