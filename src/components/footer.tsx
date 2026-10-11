import { siteMetadata } from "@/lib/siteMetadata";

const Footer= () => {
  return (
    <footer className="sticky bottom-0 w-full py-2 border-t border-gray-300 bg-background dark:border-gray-500 dark:bg-background z-49">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center space-y-1">
        <nav aria-label="Social media" className="flex gap-4 text-xs">
          <a href={siteMetadata.instagram} target="_blank" rel="noopener noreferrer me" className="hover:underline">Instagram</a>
          <a href={siteMetadata.youtube} target="_blank" rel="noopener noreferrer me" className="hover:underline">YouTube</a>
          <a href={`mailto:${siteMetadata.email}`} className="hover:underline">Contact</a>
        </nav>
        <p className="text-xs text-gray-500 text-center"> © {new Date().getFullYear()} All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer
