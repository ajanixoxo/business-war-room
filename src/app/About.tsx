export default function About() {
  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6 font-eukraine-regular">Why Choose the <span className="text-accent">War Room</span>?</h2>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto font-eukraine-light">Business War Room with Balogun is a strategic consulting firm dedicated to helping startups, entrepreneurs, and growing businesses navigate their toughest challenges.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="rounded-lg border text-card-foreground shadow-sm bg-secondary border-border hover:border-accent/50 transition-all duration-300 hover:shadow-tactical">
            <div className="p-8">
              <div className="flex items-start space-x-4">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield h-8 w-8 text-accent"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3 font-eukraine-regular">Your Strategic Command Centre</h3>
                  <p className="text-muted-foreground leading-relaxed font-eukraine-light text-sm">Not just advice. War-tested business strategies tailored to your growth goals.</p>
                </div>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="rounded-lg border text-card-foreground shadow-sm bg-secondary border-border hover:border-accent/50 transition-all duration-300 hover:shadow-tactical">
            <div className="p-8">
              <div className="flex items-start space-x-4">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-target h-8 w-8 text-accent"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3 font-eukraine-regular">Battle-Tested Insight, Real-World Wins</h3>
                  <p className="text-muted-foreground leading-relaxed font-eukraine-light text-sm">We bring practical, actionable frameworks, not fluff.</p>
                </div>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="rounded-lg border text-card-foreground shadow-sm bg-secondary border-border hover:border-accent/50 transition-all duration-300 hover:shadow-tactical">
            <div className="p-8">
              <div className="flex items-start space-x-4">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap h-8 w-8 text-accent"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3 font-eukraine-regular">Focused on What Matters</h3>
                  <p className="text-muted-foreground leading-relaxed font-eukraine-light text-sm">We zero in on the two things that make or break your business: users and revenue.</p>
                </div>
              </div>
            </div>
          </div>
          {/* Card 4 */}
          <div className="rounded-lg border text-card-foreground shadow-sm bg-secondary border-border hover:border-accent/50 transition-all duration-300 hover:shadow-tactical">
            <div className="p-8">
              <div className="flex items-start space-x-4">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-8 w-8 text-accent"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3 font-eukraine-regular">Built for Founders, by a Founder</h3>
                  <p className="text-muted-foreground leading-relaxed font-eukraine-light text-sm">Led by Balogun, a seasoned entrepreneur who&apos;s been in the trenches.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 