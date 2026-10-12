import { AFFILIATE_REL, klookSearchLink } from "@/lib/affiliate";

type KlookCtaProps = {
  destination: string;
  slug: string;
};

const KlookCta = ({ destination, slug }: KlookCtaProps) => {
  return (
    <aside className="my-8 rounded-lg border border-gray-200 dark:border-gray-700 p-5 text-center">
      <p className="text-lg font-semibold mb-1">Planning a trip to {destination}?</p>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Book tours, attraction tickets and day trips in advance and skip the queues.
      </p>
      <a
        href={klookSearchLink(destination, slug)}
        target="_blank"
        rel={AFFILIATE_REL}
        className="inline-block rounded-md bg-[#FF5B00] px-5 py-2.5 font-semibold text-white hover:opacity-90"
      >
        Things to do in {destination} on Klook
      </a>
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        This is an affiliate link. We may earn a small commission at no extra cost to you.
      </p>
    </aside>
  );
};

export default KlookCta;
