import { Search, Calendar, CreditCard, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find Your Turf",
    description: "Browse through our collection of premium turfs in your area",
    number: "01",
  },
  {
    icon: Calendar,
    title: "Choose Time Slot",
    description: "Select your preferred date and time from available slots",
    number: "02",
  },
  {
    icon: CreditCard,
    title: "Make Payment",
    description: "Secure payment with multiple options available",
    number: "03",
  },
  {
    icon: CheckCircle,
    title: "Play & Enjoy",
    description: "Show up and enjoy your game on a quality turf",
    number: "04",
  },
];

const HowItWorks = () => {
return (
    <section className="py-20 ">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    How It Works
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Four simple steps to book your perfect turf
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                {/* Connection Lines */}
                <div className="hidden lg:block absolute top-1/4 left-0 right-0 h-1 bg-gradient-primary opacity-20" />
                
                {steps.map((step, index) => (
                    <div 
                        key={step.number}
                        className="relative animate-slide-up transform transition-all duration-300 hover:scale-105"
                        style={{ 
                            animationDelay: `${index * 0.15}s`,
                            animationFillMode: 'backwards'
                        }}
                    >
                        <div className="bg-card rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center relative z-10">
                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-[rgb(249,122,38)] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transition-transform duration-300 hover:rotate-12">
                                {step.number}
                            </div>
                            
                            <div className="w-16 h-16 rounded-full bg-[rgb(26,188,85)] flex items-center justify-center mx-auto mb-4 shadow-md transition-transform duration-300 hover:rotate-45">
                                <step.icon className="w-8 h-8 text-white" />
                            </div>
                            
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground text-sm">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
};

export default HowItWorks;
