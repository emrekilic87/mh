import YesimBanner from "@/components/affiliate/yesimBanner";
import DrimsimBanner from "@/components/affiliate/drimsimBanner";

// Yesim ve Drimsim yazılar arasında dönüşümlü gösterilir; aynı yazı her zaman aynı banner'ı alır.
// Travelpayouts panelinde iki programın kazancı karşılaştırılarak daha iyi olanı tek başına bırakılabilir.
const EsimBanner = ({ slug }: { slug: string }) => {
  const hash = [...slug].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return hash % 2 === 0 ? <YesimBanner /> : <DrimsimBanner />;
};

export default EsimBanner;
