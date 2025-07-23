"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-2 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image src="/Logo.png" alt="Business War Room Logo" width={40} height={40} className="h-10 w-10" />
            <div>
              <h1 className="text-xl font-bold text-foreground font-eukraine-regular">Business War Room</h1>
              <p className="text-sm text-muted-foreground font-eukraine-light">with Balogun</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href='#about' className="text-foreground hover:text-accent transition-colors font-eukraine-regular">Blog</Link>
            <Link href='#services' className="text-foreground hover:text-accent transition-colors font-eukraine-regular">Services</Link>
            <Link href='#contact' className="text-foreground hover:text-accent transition-colors font-eukraine-regular">Contact</Link>
            <a href='https://forms.gle/qH5DFWGTrdNMxuDx7' className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-primary text-primary-foreground hover:shadow-command transform hover:scale-105 transition-all duration-300 h-10 px-4 py-2 font-eukraine-regular">Enter War Room</a>
          </div>
          {/* Hamburger menu for mobile */}
          <div className="md:hidden flex items-center">
            <button
              className="text-foreground focus:outline-none"
              aria-label="Open menu"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu h-8 w-8"><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></svg>
            </button>
          </div>
        </div>
        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div id="mobile-menu" className="md:hidden mt-4 bg-background rounded-lg shadow-lg p-4 flex flex-col space-y-4 animate-tactical-slide text-sm">
            <Link href="#about" className="text-foreground hover:text-accent transition-colors font-eukraine-regular  text-left text-sm">Blog</Link>
            <Link href="#services" className="text-foreground hover:text-accent transition-colors font-eukraine-regular  text-left text-sm">Services</Link>
            <Link href="#contact" className="text-foreground hover:text-accent transition-colors font-eukraine-regular  text-left text-sm">Contact</Link>
            <a href="https://forms.gle/qH5DFWGTrdNMxuDx7" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium t ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-primary text-primary-foreground hover:shadow-command transform hover:scale-105 transition-all duration-300 h-10 px-4 py-2 font-eukraine-regular">Enter War Room</a>
          </div>
        )}
      </div>
    </nav>
  );
} 