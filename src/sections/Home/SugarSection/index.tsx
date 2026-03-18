import { CatalogCard } from '@/entities/Home';
import { ContentWrapper } from '@/shareds/ui';
// import useBreakpoint from '@/shareds/hooks/useBreakpoint';
import { SUGAR_ITEMS } from './constants';

function SugarSection() {
  // const breakpoint = useBreakpoint();

  // const isMobile = breakpoint === 'xs';

  return (
    <ContentWrapper
      title="Содержание сахара"
    >
      {SUGAR_ITEMS.map(({
        id,
        title,
        href,
        // variant,
      }) => (
        <CatalogCard
          key={id}
          title={title}
          href={href}
          // showBgIcon={!isMobile}
          // showArrowButton={!isMobile}
        />
      ))}
    </ContentWrapper>
  );
}

export default SugarSection;
