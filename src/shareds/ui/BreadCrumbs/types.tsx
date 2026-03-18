export interface ICrumbProps {
  title: string;
  href?: string;
}

export interface IBreadCrumbsProps {
  crumbs: ICrumbProps[];
  className?: string;
}
