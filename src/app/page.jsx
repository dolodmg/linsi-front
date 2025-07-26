import Banner from './components/banner';
import SectionA from './components/sectionA';
import SectionB from './components/sectionB';
import SectionNews from './components/sectionNews';
import SectionC
 from './components/sectionC';
export default function Home() {
  return (
    <div>
      <Banner />
      <SectionNews />
      <SectionA />
      <SectionB />
      <SectionC />
    </div>
  );
}
