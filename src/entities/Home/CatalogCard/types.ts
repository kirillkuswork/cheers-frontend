export interface ICatalogCardProps {
  title?: string;
  className?: string;
  classNameForImage?: string;
  href: string;
  size?: 's' | 'l';
  img?: string;
  onError?: () => void;
  backgroundColor?: string | null;
  secondaryColor?: string | null;
}
