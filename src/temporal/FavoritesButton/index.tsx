/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ButtonIcon, TooltipFavorite } from '@/shareds/ui';
import { Wishlist } from '@/shareds/assets/icons';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { AuthModal } from '@/widgets/Header/AuthModal';
import { useCreateFavoriteMutation, useDeleteFavoriteMutation } from '@/redux/services/favoriteApi';
import { useAuth } from '@/shareds/providers/AuthProvider';
import {
  error, success, warning,
} from '@/shareds/helpres/AlertHelpers';
import styles from './styles.module.scss';

interface IFavoritesButtonProps {
  className?: string;
  productId: number;
  defaultLikedValue: boolean;
  buttonClassName?: string;
}

export const FavoritesButton = ({
  className,
  productId,
  defaultLikedValue = false,
  buttonClassName,
}: IFavoritesButtonProps) => {
  const [isActive, setIsActive] = useState<boolean>(defaultLikedValue);
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { isAuthenticated } = useAuth();

  const handleTooltipClose = useCallback(() => setIsTooltipOpen(false), []);
  const handleOnWrapperClick = (e: React.SyntheticEvent) => e.preventDefault();

  const [addFavorite] = useCreateFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();

  const deleteSuccess = () => {
    setIsActive(false);
    warning('Товар удален из избранного');
  };
  const addSuccess = () => {
    setIsActive(true);
    success('Товар добавлен в избранное');
  };

  const handleOnFavoriteClick = useCallback(() => {
    if (!isAuthenticated) {
      setIsTooltipOpen(true);
    } else if (isActive) {
      // Удаление из избранного
      deleteFavorite(productId).then((res) => {
        if (res) deleteSuccess();
        else error('Ошибка удаления товара из избранного');
      });
    } else {
      // Добавление в избранное
      addFavorite(productId).then((res) => {
        if (res) addSuccess();
        else error('Ошибка добавления товара в избранное');
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addFavorite, deleteFavorite, isActive, isAuthenticated, productId]);

  const handleTooltipButtonClick = useCallback(() => {
    if (!isAuthenticated) {
      setIsTooltipOpen(false);
      setIsModalOpen(true);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isActive !== defaultLikedValue) {
      setIsActive(defaultLikedValue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultLikedValue]);

  return (
    <div
      className={clsx(
        styles.wrapper,
        className,
      )}
      onClick={(e) => handleOnWrapperClick(e)}
    >
      <ButtonIcon
        onClick={handleOnFavoriteClick}
        className={clsx(buttonClassName, {
          [styles.selected]: isActive && isAuthenticated,
        })}
        size="large"
        icon={<Wishlist />}
      />

      <TooltipFavorite
        onClick={handleTooltipButtonClick}
        onClose={handleTooltipClose}
        isOpen={isTooltipOpen}
      />

      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default FavoritesButton;
