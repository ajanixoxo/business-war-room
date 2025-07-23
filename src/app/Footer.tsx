/* eslint-disable @next/next/no-img-element */
export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/Logo.png" alt="Business War Room Logo" className="h-10 w-10" />
              <div>
                <h3 className="text-xl font-bold text-foreground font-eukraine-regular">Business War Room</h3>
                <p className="text-xs text-muted-foreground font-eukraine-ligth">with Balogun</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6 max-w-md font-eukraine-regular">Strategic consulting firm dedicated to helping startups and growing businesses transform challenges into competitive advantages.</p>
            <div className="text-xs text-muted-foreground">© 2024 Business War Room. All rights reserved.</div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4 font-eukraine-regular">Services</h4>
            <ul className="space-y-2 text-xs text-muted-foreground font-eukraine-light">
              <li><a href="#services" className="hover:text-accent transition-colors">Startup Strategy</a></li>
              <li><a href="#services" className="hover:text-accent transition-colors">User Acquisition</a></li>
              <li><a href="#services" className="hover:text-accent transition-colors">Product-Market Fit</a></li>
              <li><a href="#services" className="hover:text-accent transition-colors">Go-to-Market</a></li>
              <li><a href="#services" className="hover:text-accent transition-colors">Founder Coaching</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4 font-eukraine-regular">Contact</h4>
            <ul className="space-y-3 text-xs text-muted-foreground font-eukraine-light">
              <li className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail h-4 w-4 text-accent"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                <span>hello@businesswarroom.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone h-4 w-4 text-accent"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span>+1 (555) 123-STRATEGY</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar h-4 w-4 text-accent"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                <span>Mon-Fri, 9AM-6PM EST</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-xs text-muted-foreground font-eukraine-">Ready to dominate your market? <a href="https://forms.gle/qH5DFWGTrdNMxuDx7" className="text-accent hover:underline">Enter the War Room</a></p>
        </div>
      </div>
    </footer>
  );
} 