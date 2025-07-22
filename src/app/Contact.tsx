export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Ready to <span className="text-accent">Dominate</span> Your Market?</h2>
          <p className="text-normal text-muted-foreground max-w-3xl mx-auto font-eukraine-light">Join the ranks of successful entrepreneurs who&apos;ve transformed their businesses in our strategic command center.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="rounded-lg border text-card-foreground shadow-sm bg-secondary border-border">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 font-eukraine-regular">Enter the War Room</h3>
              <form className="space-y-6 font-eukraine-regular">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">Full Name *</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:border-accent focus:outline-none transition-colors text-sm font-eukraine-light" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">Email Address *</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:border-accent focus:outline-none transition-colors  text-sm font-eukraine-light" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">Company/Startup</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:border-accent focus:outline-none transition-colors text-sm font-eukraine-light" placeholder="Your company name" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">Business Challenge *</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:border-accent focus:outline-none transition-colors text-sm resize-none font-eukraine-light" placeholder="Tell us about your biggest business challenge..."></textarea>
                </div>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-primary text-primary-foreground hover:shadow-command transform hover:scale-105 transition-all duration-300 h-10 px-4 w-full text-base py-6 text-normal font-semibold">Request Strategic Session</button>
              </form>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6 font-eukraine-regular">Get In Touch</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed font-eukraine-light">Ready to transform your business challenges into strategic victories? Contact us today to schedule your consultation.</p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail h-6 w-6 text-accent"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Email</h4>
                  <p className="text-muted-foreground">hello@businesswarroom.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone h-6 w-6 text-accent"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Phone</h4>
                  <p className="text-muted-foreground">+1 (555) 123-STRATEGY</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar h-6 w-6 text-accent"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Schedule</h4>
                  <p className="text-muted-foreground">Monday - Friday, 9AM - 6PM EST</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin h-6 w-6 text-accent"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Location</h4>
                  <p className="text-muted-foreground">Global Strategic Operations</p>
                </div>
              </div>
            </div>
            <div className="bg-accent/5 p-6 rounded-lg border border-accent/20">
              <h4 className="font-bold text-foreground mb-2">Free Strategy Call</h4>
              <p className="text-muted-foreground text-xs mb-4  font-eukraine-light">Book a complimentary 30-minute strategy session to discuss your business challenges.</p>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-accent text-accent-foreground hover:bg-accent/90 shadow-tactical transform hover:scale-105 transition-all duration-300 h-10 px-4 py-2 w-full">Book Free Call</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 