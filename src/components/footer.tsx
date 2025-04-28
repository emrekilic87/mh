// import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-6 border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center space-y-4">
        <p className="text-sm text-gray-500">© {new Date().getFullYear()} Multi Hats. All rights reserved.</p>
      </div>
    </footer>
  );
}
