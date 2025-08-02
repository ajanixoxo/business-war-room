import Link from 'next/link';
import React from 'react';

// Type definitions
interface ServiceFeature {
  text: string;
}

interface ServiceCard {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: ServiceFeature[];
  buttonText: string;
  href?: string;
}

// Services data
const servicesData: ServiceCard[] = [
  {
    id: 1,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rocket h-8 w-8 text-accent">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
      </svg>
    ),
    title: "Startup Strategy & Validation",
    description: "Transform your vision into a bulletproof business strategy. From concept validation to market entry, we build your strategic foundation.",
    features: [
      { text: "Market validation" },
      { text: "Business model design" },
      { text: "Competitive analysis" },
      { text: "Risk assessment" }
    ],
    buttonText: "Deploy Strategy",
    href: "mailto:bunmibalogun450@yahoo.com?subject=Startup Strategy & Validation Inquiry&body=Hi, I'm interested in your Startup Strategy & Validation service. "
  },
  {
    id: 2,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-8 w-8 text-accent">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    title: "User Acquisition & Growth Hacking",
    description: "Deploy proven growth tactics to scale your user base exponentially. No guesswork—just battle-tested acquisition strategies.",
    features: [
      { text: "Growth funnel optimization" },
      { text: "Viral mechanics" },
      { text: "Channel testing" },
      { text: "Retention strategies" }
    ],
    buttonText: "Deploy Strategy",
    href: "mailto:bunmibalogun450@yahoo.com?subject=User Acquisition & Growth Hacking Inquiry&body=Hi, I'm interested in your User Acquisition & Growth Hacking service. "
  },
  {
    id: 3,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-target h-8 w-8 text-accent">
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="6"></circle>
        <circle cx="12" cy="12" r="2"></circle>
      </svg>
    ),
    title: "Product-Market Fit Advisory",
    description: "Navigate the path to product-market fit with precision. We help you find your perfect customer-product match.",
    features: [
      { text: "Customer discovery" },
      { text: "Product positioning" },
      { text: "Feedback systems" },
      { text: "Iteration strategy" }
    ],
    buttonText: "Deploy Strategy",
    href: "mailto:bunmibalogun450@yahoo.com?subject=Product-Market Fit Advisory Inquiry&body=Hi, I'm interested in your Product-Market Fit Advisory service. "
  },
  {
    id: 4,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up h-8 w-8 text-accent">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
        <polyline points="16 7 22 7 22 13"></polyline>
      </svg>
    ),
    title: "Go-to-Market & Launch Strategy",
    description: "Execute flawless product launches that capture market attention and drive immediate results.",
    features: [
      { text: "Launch planning" },
      { text: "Marketing strategy" },
      { text: "Sales enablement" },
      { text: "Performance tracking" }
    ],
    buttonText: "Deploy Strategy",
    href: "mailto:bunmibalogun450@yahoo.com?subject=Go-to-Market & Launch Strategy Inquiry&body=Hi, I'm interested in your Go-to-Market & Launch Strategy service. "
  },
  {
    id: 5,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-crown h-8 w-8 text-accent">
        <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"></path>
        <path d="M5 21h14"></path>
      </svg>
    ),
    title: "Founder Coaching & War Room Sessions",
    description: "Get personalized strategic guidance from Balogun himself. Intensive sessions to solve your toughest business challenges.",
    features: [
      { text: "1-on-1 strategy sessions" },
      { text: "Decision frameworks" },
      { text: "Leadership development" },
      { text: "Crisis management" }
    ],
    buttonText: "Deploy Strategy",
    href: "mailto:bunmibalogun450@yahoo.com?subject=Founder Coaching & War Room Sessions Inquiry&body=Hi, I'm interested in your Founder Coaching & War Room Sessions service. "
  }
];

// Service Card Component
interface ServiceCardProps {
  service: ServiceCard;
}

const ServiceCardComponent: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="rounded-lg border text-card-foreground shadow-sm bg-card border-border hover:border-accent/50 hover:border-green-500 transition-all duration-300 hover:shadow-command group">
      <div className="flex flex-col space-y-1.5 p-6 text-center pb-4">
        <div className="mx-auto bg-accent/10 p-4 rounded-full w-fit mb-4 group-hover:bg-accent/20 transition-colors">
          {service.icon}
        </div>
        <h3 className="font-semibold tracking-tight text-xl text-foreground group-hover:text-accent transition-colors font-eukraine-regular">
          {service.title}
        </h3>
      </div>
      <div className="p-6 pt-0 text-center">
        <p className="text-muted-foreground mb-6 leading-relaxed text-sm font-eukraine-light">
          {service.description}
        </p>
        <ul className="text-xs text-muted-foreground space-y-2 mb-6 font-eukraine-light">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></div>
              {feature.text}
            </li>
          ))}
        </ul>
        <Link 
          href={service.href || "#contact"}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-semibold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-2 border-accent bg-transparent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 h-10 px-4 py-2 w-full font-eukraine-regular"
        >
          {service.buttonText}
        </Link>
      </div>
    </div>
  );
};

// Main Services Component
interface ServicesProps {
  onServiceButtonClick?: (serviceId: number) => void;
  onConsultationClick?: () => void;
}

const Services: React.FC<ServicesProps> = ({  onConsultationClick }) => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-eukraine-regular">
            Our <span className="text-accent">Battle Plans</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto font-eukraine-light">
            Strategic services designed to turn your business challenges into competitive advantages.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <ServiceCardComponent 
              key={service.id} 
              service={service}
            />
          ))}
        </div>
        
        <div className="text-center mt-16">
          <a href="https://calendly.com/bunmi-ascendia/30min?month=2025-05&date=2025-05-17"
            onClick={onConsultationClick}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-primary text-primary-foreground hover:shadow-command transform hover:scale-105 transition-all duration-300 h-11 rounded-md text-base text-normal px-8 py-6 font-eukraine-regular"
          >
            Schedule Strategic Consultation
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;