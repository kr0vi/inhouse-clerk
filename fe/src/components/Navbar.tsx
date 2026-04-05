"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {

  return (
    <nav className={`fixed w-full z-50 top-0 left-0 transition-colors duration-300  `}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-24">

          <div className="flex-shrink-0 flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 2v20M17 5l-10 14M22 12H2M19 17L5 7" />
            </svg>
            <Link href="/" className="text-xl font-bold tracking-tight">
              tatem
            </Link>
          </div>

          <div className="hidden sm:flex items-center space-x-8 text-[11px] font-semibold tracking-widest uppercase">
             {
              <Link href="/login" className="hover:opacity-70 transition-opacity">
                Log In
              </Link>
            }
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <span className="text-sm">Menu</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
