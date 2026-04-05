import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
              Antigravity Web
            </Link>
          </div>

          {/* Nav Links */}
          <div className="hidden sm:flex sm:space-x-8 items-center">
            <Link 
              href="/dashboard" 
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
            <div className="flex items-center space-x-4">
              <Link 
                href="/login" 
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Log in
              </Link>
              <Link 
                href="/signup" 
                className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Sign up
              </Link>
            </div>
          </div>

          {/* Mobile menu button (Simplified) */}
          <div className="sm:hidden flex items-center">
            <span className="text-gray-500 dark:text-gray-400">Menu</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
