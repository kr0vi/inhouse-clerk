"use client";
import { useUser } from "@/lib/auth/useUser";
import Link from "next/link";

export default function Navbar() {
  const { isSignedIn, logout } = useUser();

  return (
    <nav
      className={`fixed w-full z-50 top-0 left-0 transition-colors duration-300  `}
    >
      <div className="max-w-[350 mx-auto px-6 md:px-12 bg--300">
        <div className="h-24 bg--500 flex items-center justify-between">
          <div className="shrink-0 flex items-center gap-2 --">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M12 2v20M17 5l-10 14M22 12H2M19 17L5 7" />
            </svg>
            <Link href="/" className="text-xl font-bold tracking-tight">
              klerk
            </Link>
          </div>

          <div className="hidden bg--700 sm:flex items-center space-x-8 text-[11px] font-semibold tracking-widest uppercase">
            {isSignedIn ? (
              <>
                <Link
                  href="/me"
                  className="hover:opacity-70 cursor-pointer  transition-opacity"
                >
                  Account
                </Link>
                <button
                  onClick={async () => {
                    logout();
                  }}
                  className="hover:opacity-70  cursor-pointer uppercase transition-opacity"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                {" "}
                <Link
                  href="/signup"
                  className="hover:opacity-70 transition-opacity"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="hover:opacity-70 transition-opacity"
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
