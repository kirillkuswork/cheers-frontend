/* eslint-disable react-hooks/exhaustive-deps */
import {
  FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import clsx from 'clsx';
import { ArrayRender } from '@/shareds/utils/components';
import { PROPERTIES_KEYS } from '@/sections/Product/ProductSection/constants';
import { IPropertiesCurrent, IVolume } from '@/redux/services/types/products';
import { DropdownVintage, DropdownVolume } from '@/shareds/ui';
import styles from './styles.module.scss';
import { IMainSectionInfoProps, IOption } from './types';
import { MainSectionListItem } from './MainSectionListItem';

export const MainSectionInfo: FC<IMainSectionInfoProps> = ({
  shortDescription,
  vintages,
  className,
  productId,
  properties,
}) => {
  // отфильтровываем винтажи без года
  const filteredVintages = vintages?.filter((vintage) => vintage.year);

  // преобразовываем в нужный вид
  const vintageOptions: IOption[] | undefined = useMemo(() => (
    filteredVintages?.map(({
      year,
      rating_customer,
      rating_expert,
      selected,
      volumes,
    }) => ({
      label: year,
      value: year,
      ratingCustomer: rating_customer,
      ratingExpert: rating_expert,
      selected,
      volumes,
    }))
  ), [vintages]);

  const foundVintage: IOption | undefined = useMemo(() => (
    vintageOptions?.filter(({ selected }) => selected === true)[0]
  ), [vintageOptions, productId]);

  const foundVolume: IVolume | undefined = useMemo(() => (
    foundVintage?.volumes.filter(({ selected }) => selected === true)[0]
  ), [vintageOptions, productId]);

  const [selectedVintageOption, setSelectedVintageOption] = useState(foundVintage);
  const [selectedVolumeOption, setSelectedVolumeOption] = useState(foundVolume);
  const showDropdownVintage = vintageOptions && vintageOptions?.length > 1;
  const showDropdownVolume = foundVintage?.volumes.length ? vintageOptions && foundVintage?.volumes?.length > 1 : false;

  const handleSelectVintageChange = useCallback((value: IOption) => {
    setSelectedVintageOption(value);
  }, []);

  const handleSelectVolumeChange = useCallback((value: IVolume) => {
    setSelectedVolumeOption(value);
  }, []);

  useEffect(() => {
    setSelectedVintageOption(foundVintage);
    setSelectedVolumeOption(foundVolume);
  }, [foundVintage, vintages, foundVolume]);

  return (
    <div className={clsx(styles.wrapper, className)}>
      {properties && (
        <div className={styles.info}>
          <ArrayRender
            items={shortDescription}
            renderItem={(item) => (properties[item as keyof IPropertiesCurrent]
              ? (
                <MainSectionListItem
                  key={item}
                  title={PROPERTIES_KEYS[item as keyof IPropertiesCurrent]}
                  description={properties[item as keyof IPropertiesCurrent]}
                />
              ) : null
            )}
          />
        </div>
      )}

      {(showDropdownVintage || showDropdownVolume) && (
        <div className={styles.dropdowns}>
          {showDropdownVintage && (
            <DropdownVintage
              options={vintageOptions}
              selectedOption={selectedVintageOption}
              setSelectedOption={handleSelectVintageChange}
              label="Винтаж"
            />
          )}

          {showDropdownVolume && (
            <DropdownVolume
              options={foundVintage?.volumes}
              selectedOption={selectedVolumeOption}
              setSelectedOption={handleSelectVolumeChange}
              label="Объем"
            />
          )}
        </div>
      )}
    </div>
  );
};
