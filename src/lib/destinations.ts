import { posts } from "@/lib/posts";
import { AFFILIATE_REL, klookSearchLink } from "@/lib/affiliate";

type Post = (typeof posts)[number];

// Her destinasyonun ülke anahtarı. Ülke yazısı varsa slug'ı `discover-${ülke}` olur.
const countryBySlug: Record<string, string> = {
  "discover-japan": "japan",
  "discover-tokyo": "japan",
  "discover-mexico": "mexico",
  "discover-puerto-vallarta": "mexico",
  "discover-tulum": "mexico",
  "discover-cancun": "mexico",
  "discover-playa-del-carmen": "mexico",
  "discover-france": "france",
  "discover-paris": "france",
  "discover-saint-tropez": "france",
  "discover-south-korea": "south-korea",
  "discover-gyeongju": "south-korea",
  "discover-seoul": "south-korea",
  "discover-tanzania": "tanzania",
  "discover-zanzibar": "tanzania",
  "discover-new-zealand": "new-zealand",
  "discover-auckland": "new-zealand",
  "discover-chile": "chile",
  "discover-valparaiso": "chile",
  "discover-portugal": "portugal",
  "discover-faro": "portugal",
  "discover-porto": "portugal",
  "discover-argentina": "argentina",
  "discover-mendoza": "argentina",
  "discover-australia": "australia",
  "discover-sydney": "australia",
  "discover-brazil": "brazil",
  "discover-rio-de-janeiro": "brazil",
  "discover-italy": "italy",
  "discover-rome": "italy",
  "discover-capri": "italy",
  "discover-como": "italy",
  "discover-peru": "peru",
  "discover-lima": "peru",
  "discover-spain": "spain",
  "discover-barcelona": "spain",
  "discover-malaga": "spain",
  "discover-sevilla": "spain",
  "discover-valencia": "spain",
  "discover-madrid": "spain",
  "discover-ecuador": "ecuador",
  "discover-guayaquil": "ecuador",
  "discover-galapagos": "ecuador",
  "discover-indonesia": "indonesia",
  "discover-bali": "indonesia",
  "discover-canggu": "indonesia",
  "discover-croatia": "croatia",
  "discover-hvar": "croatia",
  "discover-split": "croatia",
  "discover-montenegro": "montenegro",
  "discover-kotor": "montenegro",
  "discover-thailand": "thailand",
  "discover-phuket": "thailand",
  "discover-turkey": "turkey",
  "discover-istanbul": "turkey",
  "discover-antalya": "turkey",
  "discover-fethiye": "turkey",
  "discover-dalyan": "turkey",
  "discover-ireland": "ireland",
  "discover-dublin": "ireland",
  "discover-kilkenny": "ireland",
  "discover-vienna": "austria",
  "discover-hallstatt": "austria",
  "discover-bergen": "norway",
  "discover-flam": "norway",
  "discover-kuala-lumpur": "malaysia",
  "discover-penang": "malaysia",
  "discover-miami": "usa",
  "discover-havana": "cuba",
  "discover-luxembourg": "luxembourg",
  "discover-singapore": "singapore",
  "discover-ho-chi-minh-city": "vietnam",
  "discover-athens": "greece",
  "discover-mumbai": "india",
  "discover-london": "uk",
  "discover-stockholm": "sweden",
  "discover-brugge": "belgium",
  "discover-prague": "czechia",
  "discover-ella": "sri-lanka",
  "discover-shenzhen": "china",
  "discover-hamburg": "germany",
  "discover-krakow": "poland",
  "discover-cape-town": "south-africa",
  "discover-boracay": "philippines",
  "discover-tbilisi": "georgia",
  "discover-montevideo": "uruguay",
  "discover-bahamas": "bahamas",
  "discover-st-petersburg": "russia",
  "discover-curacao": "curacao",
  "discover-kathmandu": "nepal",
  "discover-rabat": "morocco",
  "discover-helsinki": "finland",
  "discover-baku": "azerbaijan",
  "discover-zagreb": "croatia",
  "discover-tashkent": "uzbekistan",
  "discover-blue-lagoon": "iceland",
  "discover-tibet": "china",
};

const continentByCountry: Record<string, string> = {
  japan: "asia", "south-korea": "asia", indonesia: "asia", thailand: "asia", malaysia: "asia",
  singapore: "asia", vietnam: "asia", india: "asia", "sri-lanka": "asia", china: "asia",
  philippines: "asia", nepal: "asia", uzbekistan: "asia",
  france: "europe", portugal: "europe", italy: "europe", spain: "europe", croatia: "europe",
  montenegro: "europe", turkey: "europe", ireland: "europe", austria: "europe", norway: "europe",
  luxembourg: "europe", greece: "europe", uk: "europe", sweden: "europe", belgium: "europe",
  czechia: "europe", germany: "europe", poland: "europe", georgia: "europe", russia: "europe",
  finland: "europe", azerbaijan: "europe", iceland: "europe",
  mexico: "north-america", usa: "north-america", cuba: "north-america", bahamas: "north-america",
  curacao: "north-america",
  chile: "south-america", argentina: "south-america", brazil: "south-america", peru: "south-america",
  ecuador: "south-america", uruguay: "south-america",
  tanzania: "africa", "south-africa": "africa", morocco: "africa",
  "new-zealand": "oceania", australia: "oceania",
};

// Yazı içinde başlıktan farklı geçen isimler
const aliasesBySlug: Record<string, string[]> = {
  "discover-saint-tropez": ["Saint-Tropez", "Saint Tropez"],
  "discover-valparaiso": ["Valparaiso"],
  "discover-galapagos": ["Galápagos"],
  "discover-curacao": ["Curacao"],
  "discover-sevilla": ["Seville"],
  "discover-brugge": ["Bruges"],
  "discover-flam": ["Flåm"],
  "discover-krakow": ["Kraków"],
  "discover-malaga": ["Málaga"],
  "discover-cancun": ["Cancún"],
  "discover-turkey": ["Türkiye"],
};

const getCountry = (slug: string) => countryBySlug[slug];

export function getCountryPost(post: Post): Post | undefined {
  const country = getCountry(post.slug);
  if (!country || post.slug === `discover-${country}`) return undefined;
  return posts.find((p) => p.slug === `discover-${country}`);
}

// Önce aynı ülkedeki yazılar (ülke yazısı başta), sonra aynı kıtadan en yeni yazılar
export function getRelatedPosts(post: Post, limit = 6): Post[] {
  const country = getCountry(post.slug);
  const continent = country ? continentByCountry[country] : undefined;
  const newestFirst = [...posts].reverse().filter((p) => p.slug !== post.slug);

  const sameCountry = newestFirst
    .filter((p) => country && getCountry(p.slug) === country)
    .sort((a, b) => Number(b.slug === `discover-${country}`) - Number(a.slug === `discover-${country}`));
  const sameContinent = newestFirst.filter(
    (p) => continent && getCountry(p.slug) !== country && continentByCountry[getCountry(p.slug)] === continent
  );
  const fallback = newestFirst.filter((p) => getCountry(p.slug));

  return [...new Set([...sameCountry, ...sameContinent, ...fallback])].slice(0, limit);
}

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const mapsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

// "Popular Areas" ve "Special Historical Places" listelerindeki her yer adının yanına Google Maps linki ekler.
// Tarihi yerlere ayrıca Klook bilet/tur linki eklenir.
function addPlaceLinks(post: Post, html: string): string {
  return html.replace(/(<h2>(Popular Areas|Special Historical Places)[^<]*<\/h2>\s*<ul>)([\s\S]*?)(<\/ul>)/g, (_, open, section, items, close) =>
    open +
    items.replace(/(<li>\s*<strong>)([^<]+)(<\/strong>)/g, (_: string, before: string, name: string, after: string) => {
      const place = name.replace(/:\s*$/, "").replace(/&amp;/g, "&").trim();
      // "Fushimi Inari Shrine (Kyoto)" → Klook araması için "Fushimi Inari Shrine"
      const placeName = place.replace(/\s*\([^)]*\)\s*$/, "");
      const links = [
        `<a href="${mapsUrl(`${place}, ${post.title}`)}" target="_blank" rel="noopener noreferrer" class="map-link" aria-label="${place} on Google Maps">📍 Map</a>`,
      ];
      if (section === "Special Historical Places") {
        links.push(
          `<a href="${klookSearchLink(placeName, post.slug)}" target="_blank" rel="${AFFILIATE_REL}" class="map-link" aria-label="${placeName} tickets and tours on Klook">🎟️ Tickets &amp; Tours</a>`
        );
      }
      return `${before}${name} (${links.join(" · ")})${after}`;
    }) +
    close
  );
}

export function renderPostContent(post: Post): string {
  return addInternalLinks(post, addPlaceLinks(post, post.content));
}

// Aynı ülkedeki diğer destinasyonların içerikteki ilk geçişini linke çevirir.
// Başlıklar (h1-h6), mevcut linkler ve HTML etiketlerinin içi atlanır.
function addInternalLinks(post: Post, html: string): string {
  const country = getCountry(post.slug);
  if (!country) return html;

  const targets = posts
    .filter((p) => p.slug !== post.slug && getCountry(p.slug) === country)
    .map((p) => ({
      href: `/blog/${p.slug}`,
      pattern: new RegExp(
        `(?<![\\p{L}\\p{N}])(${[p.title, ...(aliasesBySlug[p.slug] ?? [])].map(escapeRegExp).join("|")})(?![\\p{L}\\p{N}])`,
        "u"
      ),
      linked: false,
    }));

  let skipDepth = 0;
  return html
    .split(/(<[^>]+>)/)
    .map((part) => {
      if (part.startsWith("<")) {
        if (/^<(h[1-6]|a)[\s>]/i.test(part)) skipDepth++;
        else if (/^<\/(h[1-6]|a)>/i.test(part)) skipDepth = Math.max(0, skipDepth - 1);
        return part;
      }
      if (skipDepth > 0) return part;

      let text = part;
      for (const target of targets) {
        if (target.linked || !target.pattern.test(text)) continue;
        text = text.replace(target.pattern, `<a href="${target.href}">$1</a>`);
        target.linked = true;
      }
      return text;
    })
    .join("");
}
