export default function Home() {
  return (
    <div className="min-h-screen bg-[#1a56ff] text-white flex flex-col justify-center px-6 md:px-12 relative overflow-hidden font-sans">
      <main className="max-w-[1400px] w-full mx-auto pb-20 md:pb-32 mt-20">
        
        <h1 className="text-[56px] leading-[1.1] md:text-[80px] md:leading-[1.05] font-medium tracking-[-0.02em] max-w-4xl mb-6">
          An inhouse clerk implementation
        </h1>
        
        <p className="text-xl md:text-2xl font-light text-white/90 max-w-3xl mb-12 tracking-wide">
         Get auth responsiveness in your ui with lightspeed
        </p>

        {/* Input Form */}
        <div className="relative max-w-3xl flex items-center group">
          <div className="absolute inset-0 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm pointer-events-none transition-all group-focus-within:bg-white/15 group-focus-within:border-white/30"></div>
          
          <input 
            type="email" 
            placeholder="Enter your email to get started." 
            className="w-full bg-transparent text-white placeholder-white/60 px-8 py-5 outline-none rounded-full text-lg relative z-10"
          />
          
          <div className="absolute right-2">
            <button className="bg-white text-[#1a56ff] font-medium rounded-full px-6 py-3 hover:bg-gray-50 transition-colors pointer-events-auto shadow-sm">
              Sign Up
            </button>
          </div>
        </div>

      </main>

    </div>
  );
}
