export interface IAuthModal {
  isOpen: boolean;
  onClose?: () => void;
}

export interface ISteps extends Pick<IAuthModal, 'onClose'> {
  setSteps: (value?: number) => void;
  isLoading?: boolean;
}

export interface IModalHeader {
  title: string;
  description?: string;
}
