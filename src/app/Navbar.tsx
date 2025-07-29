// "use client"

// import Image from "next/image"
// import Link from "next/link"
// import { useState } from "react"
// import { Target, Shield, Users, Phone, X } from "lucide-react"

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false)

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
//       <div className="container mx-auto px-6 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo Section with Animations */}
//           <button className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105 active:scale-95">
//             <div className="relative">
//               <Image
//                 src="/Logo.png"
//                 alt="Business War Room Logo"
//                 width={40}
//                 height={40}
//                 className="h-10 w-10 transition-all duration-300 group-hover:brightness-110 group-hover:drop-shadow-[0_0_8px_rgba(134,174,82,0.6)]"
//               />
//               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <div className="absolute inset-0 border border-accent rounded-full animate-ping"></div>
//               </div>
//             </div>
//             <div className="transition-all duration-300 group-hover:translate-x-1">
//               <h1 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
//                 Business War Room
//               </h1>
//               <p className="text-sm text-muted-foreground">with Balogun</p>
//             </div>
//           </button>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-6">
//             <button className="relative text-foreground hover:text-accent transition-all duration-300 group px-2 py-1 hover:scale-105 active:scale-95">
//               <span className="relative z-10">Strategy</span>
//               <div className="absolute inset-0 bg-accent/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></div>
//             </button>

//             <button className="relative text-foreground hover:text-accent transition-all duration-300 group px-2 py-1 hover:scale-105 active:scale-95">
//               <span className="relative z-10">Services</span>
//               <div className="absolute inset-0 bg-accent/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></div>
//             </button>

//             <Link
//               href="/blog"
//               className="relative text-foreground hover:text-accent transition-all duration-300 group px-2 py-1 hover:scale-105 active:scale-95"
//             >
//               <span className="relative z-10">Intel</span>
//               <div className="absolute inset-0 bg-accent/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></div>
//             </Link>

//             <button className="relative text-foreground hover:text-accent transition-all duration-300 group px-2 py-1 hover:scale-105 active:scale-95">
//               <span className="relative z-10">Contact</span>
//               <div className="absolute inset-0 bg-accent/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></div>
//             </button>

//             <button className="relative overflow-hidden group transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(134,174,82,0.4)] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-primary text-primary-foreground hover:shadow-command transform h-10 px-4 py-2">
//               <span className="relative z-10">Enter War Room</span>
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
//             </button>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               className="relative group transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-accent/10 hover:text-accent inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 w-10"
//               onClick={() => setMenuOpen(!menuOpen)}
//               aria-label="Open menu"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="white"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="h-6 w-6 transition-all duration-300 group-hover:rotate-180"
//               >
//                 <line x1="4" x2="20" y1="12" y2="12"></line>
//                 <line x1="4" x2="20" y1="6" y2="6"></line>
//                 <line x1="4" x2="20" y1="18" y2="18"></line>
//               </svg>
//               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <div className="absolute top-1/2 left-0 w-full h-px bg-accent/30"></div>
//                 <div className="absolute top-1/2 left-1/2 w-px h-full bg-accent/30 -translate-x-1/2 -translate-y-1/2"></div>
//               </div>
//             </button>
//           </div>
//         </div>


//         {/* Mobile Menu Overlay */}
//         {menuOpen && (
//           <div className="absolute inset-0 z-50 md:hidden">
//             {/* Backdrop */}
//             <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
//             <button
//               onClick={() => setMenuOpen(false)}
//               className="text-slate-300 absolute right-3 top-4 z-40 hover:text-white transition-colors"
//               aria-label="Close menu"
//             >
//               <X className="h-6 w-6" />
//             </button>
//             <div className="absolute right-0 w-2/5 h-full bg-background backdrop-blur-md">

//               <div className="p-6 space-y-4">
//                 <div className="flex items-center text-center justify-between p-4  border-b border-accent/20">
//                   <h2 className="text-lg text-center font-bold text-accent font-eukraine-regular">Command Center</h2>
//                 </div>
//                 <Link
//                   href="/#about"
//                   onClick={() => setMenuOpen(false)}
//                   className="w-full flex items-center  gap-4 text-left p-4 rounded-lg bg-secondary/50 hover:bg-accent/10 
//                   text-foreground hover:text-accent transition-all duration-300 group
//                   hover:translate-x-2 hover:shadow-lg bg-secondary font-extrabold border border-accent/20 hover:border-accent/40 hover:text-accent"
//                 >
//                   <div className="text-white group-hover:text-accent transition-colors">
//                     <Target className="h-6 w-6" />
//                   </div>
//                   <span className="text-lg font-medium text-white group-hover:text-accent transition-colors font-eukraine-regular">
//                     Strategy
//                   </span>
//                 </Link>

//                 <Link
//                   href="/#services"
//                   onClick={() => setMenuOpen(false)}
//                   className="w-full flex items-center  gap-4 text-left p-4 rounded-lg bg-secondary/50 hover:bg-accent/10 
//                   text-foreground hover:text-accent transition-all duration-300 group
//                   hover:translate-x-2 hover:shadow-lg bg-secondary font-extrabold border border-accent/20 hover:border-accent/40 hover:text-accent"
//                 >
//                   <div className="text-white group-hover:text-accent transition-colors">
//                     <Shield className="h-6 w-6" />
//                   </div>
//                   <span className="text-lg font-medium text-white group-hover:text-accent transition-colors font-eukraine-regular">
//                     Services
//                   </span>
//                 </Link>

//                 <Link
//                   href="/blog"
//                   onClick={() => setMenuOpen(false)}
//                   className="w-full flex items-center  gap-4 text-left p-4 rounded-lg bg-secondary/50 hover:bg-accent/10 
//                   text-foreground hover:text-accent transition-all duration-300 group
//                   hover:translate-x-2 hover:shadow-lg bg-secondary font-extrabold border border-accent/20 hover:border-accent/40 hover:text-accent"
//                 >
//                   <div className="text-white group-hover:text-accent transition-colors">
//                     <Users className="h-6 w-6" />
//                   </div>
//                   <span className="text-lg font-medium text-white group-hover:text-accent transition-colors font-eukraine-regular">
//                     Intel
//                   </span>
//                 </Link>

//                 <Link
//                   href="/#contact"
//                   onClick={() => setMenuOpen(false)}
//                   className="w-full flex items-center  gap-4 text-left p-4 rounded-lg bg-secondary/50 hover:bg-accent/10 
//                   text-foreground hover:text-accent transition-all duration-300 group
//                   hover:translate-x-2 hover:shadow-lg bg-secondary font-extrabold border border-accent/20 hover:border-accent/40 hover:text-accent"
//                 >
//                   <div className="text-white group-hover:text-accent transition-colors">
//                     <Phone className="h-6 w-6" />
//                   </div>
//                   <span className="text-lg font-medium text-white group-hover:text-accent transition-colors font-eukraine-regular">
//                     Contact
//                   </span>
//                 </Link>


//                 {/* Enter War Room Button */}
//                 <div className=" padding-2 border-t border-accent/20">
//                   <a
//                     href="https://forms.gle/qH5DFWGTrdNMxuDx7"
//                     className="inline-flex mt-3 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-primary text-primary-foreground hover:shadow-command transform hover:scale-105 transition-all duration-300 h-10 px-4 py-2 font-eukraine-regular w-full"
//                   >
//                     Enter War Room
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   )
// }


"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Target, Shield, Users, Phone, X } from "lucide-react"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-2 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <button className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105 active:scale-95">
            <div className="relative">
              <Image
                src="/Logo.png"
                alt="Business War Room Logo"
                width={40}
                height={40}
                className="h-10 w-10 transition-all duration-300 group-hover:brightness-110 group-hover:drop-shadow-[0_0_8px_rgba(134,174,82,0.6)]"
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 border border-accent rounded-full animate-ping"></div>
              </div>
            </div>
            <div className="transition-all duration-300 group-hover:translate-x-1">
              <h1 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                Business War Room
              </h1>
              <p className="text-sm text-muted-foreground">with Balogun</p>
            </div>
          </button>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/#about" className="text-foreground hover:text-accent transition-colors font-eukraine-regular">
              Blog
            </Link>
            <Link
              href="/#services"
              className="text-foreground hover:text-accent transition-colors font-eukraine-regular"
            >
              Services
            </Link>
            <Link href="/blog" className="text-foreground hover:text-accent transition-colors font-eukraine-regular">
              Intel
            </Link>
            <Link
              href="/#contact"
              className="text-foreground hover:text-accent transition-colors font-eukraine-regular"
            >
              Contact
            </Link>
            <a
              href="https://forms.gle/qH5DFWGTrdNMxuDx7"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-primary text-primary-foreground hover:shadow-command transform hover:scale-105 transition-all duration-300 h-10 px-4 py-2 font-eukraine-regular"
            >
              Enter War Room
            </a>
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
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-menu h-8 w-8"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
            <button
              onClick={() => setMenuOpen(false)}
              className="text-slate-300 absolute right-3 top-4 z-40 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="absolute right-0 w-2/5 h-full bg-background backdrop-blur-md">

              <div className="p-6 space-y-4">
                <div className="flex items-center text-center justify-between p-4  border-b border-accent/20">
                  <h2 className="text-lg text-center font-bold text-accent font-eukraine-regular">Command Center</h2>
                </div>
                <Link
                  href="/#about"
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center  gap-4 text-left p-4 rounded-lg bg-secondary/50 hover:bg-accent/10 
                  text-foreground hover:text-accent transition-all duration-300 group
                  hover:translate-x-2 hover:shadow-lg bg-secondary font-extrabold border border-accent/20 hover:border-accent/40 hover:text-accent"
                >
                  <div className="text-white group-hover:text-accent transition-colors">
                    <Target className="h-6 w-6" />
                  </div>
                  <span className="text-lg font-medium text-white group-hover:text-accent transition-colors font-eukraine-regular">
                    Strategy
                  </span>
                </Link>

                <Link
                  href="/#services"
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center  gap-4 text-left p-4 rounded-lg bg-secondary/50 hover:bg-accent/10 
                  text-foreground hover:text-accent transition-all duration-300 group
                  hover:translate-x-2 hover:shadow-lg bg-secondary font-extrabold border border-accent/20 hover:border-accent/40 hover:text-accent"
                >
                  <div className="text-white group-hover:text-accent transition-colors">
                    <Shield className="h-6 w-6" />
                  </div>
                  <span className="text-lg font-medium text-white group-hover:text-accent transition-colors font-eukraine-regular">
                    Services
                  </span>
                </Link>

                <Link
                  href="/blog"
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center  gap-4 text-left p-4 rounded-lg bg-secondary/50 hover:bg-accent/10 
                  text-foreground hover:text-accent transition-all duration-300 group
                  hover:translate-x-2 hover:shadow-lg bg-secondary font-extrabold border border-accent/20 hover:border-accent/40 hover:text-accent"
                >
                  <div className="text-white group-hover:text-accent transition-colors">
                    <Users className="h-6 w-6" />
                  </div>
                  <span className="text-lg font-medium text-white group-hover:text-accent transition-colors font-eukraine-regular">
                    Intel
                  </span>
                </Link>

                <Link
                  href="/#contact"
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center  gap-4 text-left p-4 rounded-lg bg-secondary/50 hover:bg-accent/10 
                  text-foreground hover:text-accent transition-all duration-300 group
                  hover:translate-x-2 hover:shadow-lg bg-secondary font-extrabold border border-accent/20 hover:border-accent/40 hover:text-accent"
                >
                  <div className="text-white group-hover:text-accent transition-colors">
                    <Phone className="h-6 w-6" />
                  </div>
                  <span className="text-lg font-medium text-white group-hover:text-accent transition-colors font-eukraine-regular">
                    Contact
                  </span>
                </Link>


                {/* Enter War Room Button */}
                <div className=" padding-2 border-t border-accent/20">
                  <a
                    href="https://forms.gle/qH5DFWGTrdNMxuDx7"
                    className="inline-flex mt-3 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-primary text-primary-foreground hover:shadow-command transform hover:scale-105 transition-all duration-300 h-10 px-4 py-2 font-eukraine-regular w-full"
                  >
                    Enter War Room
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
