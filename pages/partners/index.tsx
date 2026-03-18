import ModalAcceptAge from '@/features/About/ModalAcceptAge';
import {
  BusinessSection,
  InternetSection,
  IntroSection,
  MarketSection,
  OutroSection,
  RoadmapSection,
  ServiceSection,
  ShopSection,
  WhySection,
} from '@/sections/Partners';
import Footer from '@/widgets/Footer';
import HeaderLanding from '@/widgets/HeaderLanding';
import styles from '../styles.module.scss';

function PartnersPage() {
  return (
    <div className={styles.base}>
      <div className={styles.base_sub}>
        <HeaderLanding />
        <ModalAcceptAge />

        <IntroSection />
        <MarketSection />
        <WhySection />
        <BusinessSection />
        <ShopSection />
        <InternetSection />
        <ServiceSection />
        <RoadmapSection />
        <OutroSection />
        <Footer />
      </div>
    </div>
  );
}

export default PartnersPage;
