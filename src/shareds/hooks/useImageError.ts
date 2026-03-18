import { useState } from 'react';

export const useImageError = () => {
  const [errorImages, setErrorImages] = useState<{ [id: number]: boolean }>({});

  const handleError = (id: number) => {
    setErrorImages((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  return {
    handleError, errorImages,
  };
};
