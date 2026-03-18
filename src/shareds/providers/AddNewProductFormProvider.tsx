import {
  createContext, FC, ReactNode, useCallback, useContext, useMemo, useState,
} from 'react';
import { IUploadedFile } from '@/admin/components/UploadImage/types';

interface IFileContext {
  uploadedImages: IUploadedFile[];
  addProductImage: (file: IUploadedFile) => void;
  removeProductImage: (fileId: number) => void;
  clearProductImages: () => void;
  addProducerImage: (file: IUploadedFile) => void;
  uploadedProducerImage: IUploadedFile | null;
  removeProducerImage: () => void;
}

interface IAddNewProductFormProviderProps {
  children: ReactNode;
}

const FileContext = createContext<IFileContext | undefined>(undefined);

export const useAddNewProductFormContext = (): IFileContext => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error(
      'useAddNewProductFormContext must be used within a AddNewProductFormProvider',
    );
  }
  return context;
};

export const AddNewProductFormProvider: FC<IAddNewProductFormProviderProps> = ({
  children,
}) => {
  const [uploadedImages, setUploadedImages] = useState<IUploadedFile[]>([]);
  const [uploadedProducerImage, setUploadedProducerImage] = useState<IUploadedFile | null>(null);

  const addProductImage = useCallback((file: IUploadedFile) => {
    setUploadedImages((prevFiles) => [...prevFiles, file]);
  }, []);
  const removeProductImage = useCallback((fileId: number) => {
    setUploadedImages((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
  }, []);
  const clearProductImages = useCallback(() => {
    setUploadedImages([]);
  }, []);

  const addProducerImage = useCallback((file: IUploadedFile) => {
    setUploadedProducerImage(file);
  }, []);
  const removeProducerImage = useCallback(() => {
    setUploadedProducerImage(null);
  }, []);

  const contextValue = useMemo(
    () => ({
      uploadedImages,
      addProductImage,
      removeProductImage,
      clearProductImages,
      uploadedProducerImage,
      addProducerImage,
      removeProducerImage,
    }),
    [uploadedImages,
      addProductImage,
      removeProductImage,
      clearProductImages,
      uploadedProducerImage,
      addProducerImage,
      removeProducerImage],
  );

  return (
    <FileContext.Provider
      value={contextValue}
    >
      {children}
    </FileContext.Provider>
  );
};
