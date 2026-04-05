import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen pt-24 items-center justify-center bg-[#1a56ff] px-6 md:px-12 font-sans overflow-hidden">
      <div className="">
        <h1 className="text-4xl leading-[1.1] font-medium tracking-[-0.02em] text-white mb-4">
          Log in
        </h1>
        <p className="text-base font-light text-white/90 mb-12 tracking-wide max-w-xl">
          Welcome back.<br/> Enter your credentials to access your account.
        </p>

        <form className="flex flex-col gap-5 max-w-xl">
          <div className="relative group">
            <div className="absolute inset-0 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm pointer-events-none transition-all group-focus-within:bg-white/15 group-focus-within:border-white/30"></div>
            <input 
              type="email" 
              placeholder="Email" 
              required
              className="w-full bg-transparent text-white placeholder-white/60 px-8 py-3 outline-none rounded-full text-sm relative z-10 focus:ring-0"
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm pointer-events-none transition-all group-focus-within:bg-white/15 group-focus-within:border-white/30"></div>
            <input 
              type="password" 
              placeholder="Password"
              required
              className="w-full bg-transparent text-white placeholder-white/60 px-8 py-3 outline-none rounded-full text-sm relative z-10 focus:ring-0"
            />
          </div>

          <div className="flex items-center justify-between px-2 mt-2">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-white/20 bg-white/10 text-white focus:ring-white focus:ring-offset-[#1a56ff]" />
              <label htmlFor="remember" className="text-white/80 text-sm">Remember me</label>
            </div>
            <a href="#" className="text-white/80 text-sm hover:text-white transition-colors">Forgot password?</a>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center gap-6">
            <button 
              type="submit"
              className="w-full sm:w-auto bg-white text-[#1a56ff] font-medium rounded-full px-6 py-3 hover:bg-gray-50 transition-colors shadow-sm text-sm cursor-pointer"
            >
              Log In
            </button>
            <p className="text-white/70 text-sm">
              Don't have an account? <Link href="/signup" className="text-white font-medium hover:underline">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
