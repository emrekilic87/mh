type ShareButtonsProps = {
  url: string;
  title: string;
  image?: string;
};

// JS gerektirmeyen paylaşım linkleri; her biri ilgili platformun paylaşım ekranını yeni sekmede açar
const ShareButtons = ({ url, title, image }: ShareButtonsProps) => {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const links = [
    { name: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
    { name: "X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    {
      name: "Pinterest",
      href: `https://pinterest.com/pin/create/button/?url=${u}&description=${t}${image ? `&media=${encodeURIComponent(image)}` : ""}`,
    },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  ];

  return (
    <nav aria-label="Share this guide" className="flex flex-wrap items-center gap-2 my-6">
      <span className="text-sm font-semibold mr-1">Share:</span>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label={`Share on ${link.name}`}
          className="text-sm px-3 py-1 rounded-full border border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {link.name}
        </a>
      ))}
    </nav>
  );
};

export default ShareButtons;
