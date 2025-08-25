import { FiMapPin } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-green-700 to-green-900 text-white py-20 px-5 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl md:text-5xl font-bold mb-6">
          Book Premium Football Turfs in Your City
        </h1>
        <p className="text-md md:text-xl mb-8">
          Find and reserve the best football pitches with just a few clicks
        </p>
        <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
          <div className=" relative flex-grow">
            <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search by location..."
              className="w-full pl-10 pr-4 py-2 md:py-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button className="px-4 md:px-6 py-2 md:py-3 bg-yellow-500 text-gray-900 font-semibold rounded-md hover:bg-yellow-600 transition">
            Find Turfs
          </button>
        </div>
      </div>
    </section>
  );
}
