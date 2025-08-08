import Banner from '@/components/ui/banner';
import SectionA from '@/components/ui/sectionA';
import SectionB from '@/components/ui/sectionB';
import SectionNews from '@/components/ui/sectionNews';
import SectionC from '@/components/ui/sectionC';
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
