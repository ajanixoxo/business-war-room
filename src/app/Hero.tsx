import Image from "next/image";

export default function Hero() {
  return (
    <section className="mt-20 md:mt-0 relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("/hero-background.jpg")' }}></div>
      <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--accent)) 1px, transparent 0)', backgroundSize: '50px 50px' }}></div>
      </div>
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto animate-tactical-slide">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Image src="/Logo.png" alt="Business War Room Logo" width={40} height={40} className="h-10 w-10" />
            <span className="text-accent font-semibold tracking-wide uppercase font-eukraine-regular">Strategic Command Centre</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6 leading-tight font-eukraine-regular">Transform Business<span className="block text-accent animate-command-pulse font-eukraine-regular">Battles Into Wins</span></h1>
          <p className="text-base md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed font-eukraine-light">
            Battle-tested strategies for startups and growing businesses. We don&apos;t just give advice—we deliver war-tested frameworks that drive<span className="text-accent font-semibold font-eukraine-light"> users and revenue</span>.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-primary text-primary-foreground hover:shadow-command transform hover:scale-105 transition-all duration-300 h-11 rounded-md text-lg px-8 py-6 font-eukraine-regular font-semibold">Enter the War Room
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 h-5 w-5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-2 border-accent bg-transparent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 h-11 rounded-md text-lg px-8 py-6 font-eukraine-regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up mr-2 h-5 w-5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
              View Battle Plans
            </button>
          </div>
          <div className="mt-12 grid grid-cols-2 content-center place-items-center md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2 font-eukraine-light">500+</div>
              <div className="text-sm text-muted-foreground font-eukraine-light">Battles Won</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2 font-eukraine-light">$2M+</div>
              <div className="text-sm text-muted-foreground font-eukraine-light">Revenue Generated</div>
            </div>
            <div className="text-center col-span-2 md:col-span-1">
              <div className="text-3xl font-bold text-accent mb-2 font-eukraine-light">98%</div>
              <div className="text-sm text-muted-foreground font-eukraine-light">Client Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 