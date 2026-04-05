"use client"
import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function SignupPage({searchParams}:{searchParams:Promise<{email:string}>})
 
{

  const [email,setEmail] = useState("");
  useEffect(()=>{
      const alreadyEmail =use(searchParams).email; 
      if(alreadyEmail){
  setEmail(
    alreadyEmail
  )}
  },[])
  return (
    <div className="flex min-h-screen pt-24 flex items-center justify-center bg-[#1a56ff] px-6 md:px-12 font-sans overflow-hidden">
      <div className="">
        <h1 className="text-4xl leading-[1.1] font-medium tracking-[-0.02em] text-white mb-4">
          Sign up
        </h1>
        <p className="text-base font-light text-white/90 mb-12 tracking-wide max-w-xl">
          Get auth responsiveness in your ui with lightspeed.<br/> Create your account.
        </p>

        <form className="flex flex-col gap-5 max-w-xl">
          <div className="relative group">
            <div className="absolute inset-0 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm pointer-events-none transition-all group-focus-within:bg-white/15 group-focus-within:border-white/30"></div>
            <input 
              type="text" 
              placeholder="Name" 
              required
              className="w-full bg-transparent text-white placeholder-white/60 px-8 py-3 outline-none rounded-full text-sm relative z-10 focus:ring-0"
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm pointer-events-none transition-all group-focus-within:bg-white/15 group-focus-within:border-white/30"></div>
            <input 
              type="email" 
              placeholder="Email" 
              required
              // value={email}
              onChange={(e)=>{
                console.log(e.target.value)
                setEmail(e.target.value)
              }}
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
          
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-6">
            <button 
              type="submit"
              className="w-full sm:w-auto bg-white text-[#1a56ff] font-medium rounded-full px-6 py-3 hover:bg-gray-50 transition-colors shadow-sm text-sm cursor-pointer  "
            >
              Sign Up
            </button>
            <p className="text-white/70 text-sm"> 
              Already have an account? <Link href="/login" className="text-white font-medium hover:underline">Log in</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
