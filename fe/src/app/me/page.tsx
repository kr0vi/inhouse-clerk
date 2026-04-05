"use client";
import { useUser } from "@/lib/auth/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MePage() {
  const { user, isLoaded, isSignedIn, logout } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/login");
    }
  }, [isLoaded, isSignedIn, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1a56ff] px-6 md:px-12 font-sans overflow-hidden">
        <div className="text-white text-lg font-light animate-pulse">
          Loading your profile...
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen pt-24 items-center justify-center bg-[#1a56ff] px-6 md:px-12 font-sans overflow-hidden">
      <div className="w-full max-w-xl">
        <h1 className="text-4xl leading-[1.1] font-medium tracking-[-0.02em] text-white mb-4">
          Your Profile
        </h1>
        <p className="text-base font-light text-white/90 mb-12 tracking-wide">
          Manage your personal information and account settings.
        </p>

        <div className="flex flex-col gap-6">
          <div className="relative group p-8 pb-10">
            <div className="absolute inset-0 bg-white/10 rounded-3xl border border-white/20 backdrop-blur-sm pointer-events-none transition-all"></div>
            
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-white/60 text-sm font-medium uppercase tracking-wider">Name</span>
                <span className="text-white text-xl font-medium">{user?.name || "N/A"}</span>
              </div>

              <div className="h-px bg-white/20 w-full rounded-full"></div>

              <div className="flex flex-col gap-1">
                <span className="text-white/60 text-sm font-medium uppercase tracking-wider">Email Address</span>
                <span className="text-white text-xl font-medium">{user?.email || "N/A"}</span>
              </div>

              <div className="h-px bg-white/20 w-full rounded-full"></div>
              
              <div className="flex flex-col gap-1">
                <span className="text-white/60 text-sm font-medium uppercase tracking-wider">User ID</span>
                <span className="text-white text-xl font-medium">{user?.id || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex sm:flex-row items-center gap-6">
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto bg-white text-[#1a56ff] font-medium rounded-full px-8 py-3 hover:bg-gray-50 transition-colors shadow-sm text-sm cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
