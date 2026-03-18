import { RatingModal } from '@/entities/Rating';
import { IMyReview } from '@/redux/services/types/products';
import { useAuth } from '@/shareds/providers/AuthProvider';
import { AuthModal } from '@/widgets/Header/AuthModal';
import React, { useEffect, useCallback, useState } from 'react';

interface IProps {
  isOpen: boolean,
  productId?: string,
  myReviewId?: number,
  myReview?: IMyReview,
  onClose: () => void,
}

const ModalController = ({
  isOpen, productId, myReviewId, myReview, onClose,
}: IProps) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const { isAuthenticated: isAuth } = useAuth();

  const handleAuthModalClose = useCallback(() => setIsAuthModalOpen(false), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleRatingModalClose = useCallback(() => onClose(), []);

  useEffect(() => {
    if (isAuth && isOpen) setIsRatingModalOpen(true);
    else if (!isAuth && isOpen) setIsAuthModalOpen(true);
    if (!isOpen) setIsRatingModalOpen(false);
  }, [isOpen, isAuth]);

  return (
    <>
      <AuthModal isOpen={isAuthModalOpen} onClose={handleAuthModalClose} />
      <RatingModal
        isOpen={isRatingModalOpen}
        myReviewId={myReviewId}
        myReview={myReview}
        productId={productId}
        onClose={handleRatingModalClose}
      />
    </>
  );
};

export default React.memo(ModalController);
