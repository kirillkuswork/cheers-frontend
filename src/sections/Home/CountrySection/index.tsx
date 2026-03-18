import { CatalogCard } from '@/entities/Home';
import { ContentWrapper } from '@/shareds/ui';
// import useBreakpoint from '@/shareds/hooks/useBreakpoint';
import { COUNTRY_ITEMS } from './constants';

function CountrySection() {
  // const breakpoint = useBreakpoint();

  // const isMobile = breakpoint === 'xs';

  return (
    <ContentWrapper
      title="Страна"
    >
      {COUNTRY_ITEMS.map(({
        id,
        title,
        href,
      }) => (
        <CatalogCard
          key={id}
          title={title}
          href={href}
        />
      ))}
    </ContentWrapper>
  );
}

export default CountrySection;
