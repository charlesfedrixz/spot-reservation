// import ShinyText from "@/components/lightswind/shiny-text";
// import { TypingText } from "@/components/lightswind/TypingText";
// import { FiMapPin } from "react-icons/fi";

// export default function HeroSection() {
//   return (
//     <section className="relative bg-[url('https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80')] bg-cover bg-center w-full h-[350px]  text-white m-3 rounded- before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-60 p-12 ">
//       <div className="relative z-10 max-w-4xl mx-auto text-center">
//         <ShinyText size="3xl" baseColor={"rgba(255, 255, 255, 1)"}
//         shineColor="rgb(255, 255, 255)"
//         className="mb-4">
//           Book Premium Football Turfs in Your City
//           </ShinyText>

//         <TypingText
//         duration={2}
//         fontSize="text-sm"
//         fontWeight="font-semibold"
//          className="text-sm md:text-md mb-8">
//           Find and reserve the best football pitches with just a few clicks
//         </TypingText>
//         <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
//           <div className=" relative flex-grow">
//             <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//             <input
//               type="text"
//               placeholder="Search by location..."
//               className="w-full pl-10 pr-4 py-2 md:py-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>
//           <button className="px-4 md:px-6 py-2 md:py-3 bg-yellow-500 text-gray-900 font-semibold rounded-md hover:bg-yellow-600 transition">
//             Find Turfs
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }
import { Input } from "@/components/lightswind/input";
import ShinyText from "@/components/lightswind/shiny-text";
import { TypingText } from "@/components/lightswind/TypingText";
import { Button } from "@/components/ui/button";
import { FiMapPin, FiSearch } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section className="relative bg-[url('https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80')] bg-cover bg-center w-full min-h-[500px] lg:min-h-[600px] text-white overflow-hidden">
      {/* /* Overlay with gradient */ }
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40" />

      {/* Animated particles/dots effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-accent rounded-full animate-pulse delay-100" />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-primary rounded-full animate-pulse delay-200" />
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-accent rounded-full animate-pulse delay-300" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="text-center space-y-8">
          {/* /* Main Heading with enhanced styling */} 
                <div className="space-y-4">
                <ShinyText 
                  size="4xl" 
                  baseColor="rgba(255, 255, 255, 1)"
                  shineColor="rgb(239, 68, 68)" // Changed to red
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl !leading-tight"
                >
                  Book Premium Football Turfs
                </ShinyText>
                <ShinyText 
                  size="3xl" 
                  baseColor="rgba(99, 102, 241, 1)" // Changed to indigo
                  shineColor="rgb(234, 179, 8)" // Kept yellow for contrast
                  className="text-2xl sm:text-3xl md:text-4xl !leading-tight"
                >
                  in Your City
                </ShinyText>
                </div>

                {/* Subtitle with typing effect */}
          <div className="max-w-2xl mx-auto">
            <TypingText
              duration={2}
              fontSize="text-base md:text-lg lg:text-xl"
              fontWeight="font-medium"
              className="text-gray-200 drop-shadow-lg"
            >
              Find and reserve the best football pitches with just a few clicks
            </TypingText>
          </div>

          {/* Search Bar with enhanced design */}
          <div className="max-w-3xl mx-auto mt-12">
            <div className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-2xl border border-white/20">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/* Location Input */}
                <div className="relative flex-grow group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors z-10">
                    <FiMapPin className="w-5 h-5" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search by location..."
                    className="w-full pl-12 pr-4 h-12 sm:h-14 rounded-xl text-base sm:text-lg bg-background border-2 border-border focus:border-primary transition-all shadow-sm"
                  />
                </div>

                {/* Search Button */}
                <Button 
                  size="lg"
                  className="h-12 sm:h-14 px-6 sm:px-8 bg-green-600 hover:bg-green-700 text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2 text-base sm:text-lg"
                >
                  <FiSearch className="w-5 h-5" />
                  <span className="hidden sm:inline">Find Turfs</span>
                  <span className="sm:hidden">Search</span>
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-8 text-sm sm:text-base">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-accent">500+</div>
                <div className="text-gray-300 mt-1">Turfs Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-accent">50K+</div>
                <div className="text-gray-300 mt-1">Happy Players</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-accent">24/7</div>
                <div className="text-gray-300 mt-1">Booking Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16 sm:h-24 fill-background" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>
    </section>
  );
}
