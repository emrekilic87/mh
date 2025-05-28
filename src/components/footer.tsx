// import Link from "next/link";

export default function Footer() {
  return (
    <footer className="sticky bottom-0 w-full py-2 border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center space-y-4">
        <p className="text-xs text-gray-500 text-center"> © {new Date().getFullYear()} All Rights Reserved <br/> multihatstravel@gmail.com</p>
      </div>
    </footer>
  );
}
