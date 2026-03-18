import ModalAcceptAge from '@/features/About/ModalAcceptAge';
import { HorizontalLayout } from '@/layouts';
import {
  CommunitySection, GuideSection, IntroSection, PosterSection, SommelierSection,
} from '@/sections/About';

import Footer from '@/widgets/Footer';
import HeaderLanding from '@/widgets/HeaderLanding';

function Home() {
  return (
    <div>
      <HeaderLanding />
      <ModalAcceptAge />
      <HorizontalLayout
        listPages={[
          IntroSection,
          GuideSection,
          SommelierSection,
          PosterSection,
          CommunitySection,
        ]}
      />
      <Footer />
    </div>
  );
}

export default Home;
