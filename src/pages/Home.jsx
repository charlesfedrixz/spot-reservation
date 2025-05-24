// import SearchBar from '@/features/home/SearchBar'
// import Card from '@/features/home/Card'
// import data from '@/assets/data'
// import Calendar from '@/components/calendar/CalendarUIi'
// import CalendarUi from '@/components/calendar/CalendarUIi'

// export const Home = () => {
// 	const date = new Date().toLocaleDateString()
// 	return (
// 		<div className='max-w-6xl mx-auto'>
// 			<h1 className='text-3xl  font-bold text-emerald-500 drop-shadow-md mb-5 text-center'>
// 				Find Your Spot
// 			</h1>
// 			<div className='p-6'>
// 				<SearchBar />
// 				<div className='mt-4 bg-white p-4 rounded-lg shadow-lg flex justify-center'>
// 					<CalendarUi />
// 				</div>
// 				<div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8'>
// 					{data?.map((item, index) => (
// 						<Card key={index} item={item} />
// 					))}
// 				</div>
// 			</div>
// 		</div>
// 	)
// }
import React, { useState } from 'react';
import { FiCalendar, FiClock, FiMapPin, FiPhone, FiMail, FiStar } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Testimonials from '@/features/home/Testimonials';
import HeroSection from '@/features/home/HeroSection';
import FeaturesTurf from '@/features/home/FeaturesTurf';

const FootballTurfLanding = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [bookingDate, setBookingDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Sample turf data
  const turfs = [
    {
      id: 1,
      name: "Elite Football Arena",
      location: "Downtown District",
      rating: 4.8,
      price: "$50/hr",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018",
      features: ["Floodlights", "Changing Rooms", "Parking"]
    },
    {
      id: 2,
      name: "Pro Soccer Grounds",
      location: "Sports Complex",
      rating: 4.6,
      price: "$45/hr",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e",
      features: ["AstroTurf", "Seating Area", "Refreshments"]
    },
    {
      id: 3,
      name: "Champions Turf",
      location: "Westside Park",
      rating: 4.9,
      price: "$55/hr",
      image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20",
      features: ["Full-size Pitch", "Locker Rooms", "Training Equipment"]
    }
  ];

  // Time slots for booking
  const timeSlots = [
    "06:00 - 08:00",
    "08:00 - 10:00",
    "10:00 - 12:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "18:00 - 20:00",
    "20:00 - 22:00"
  ];

  return (
    <div className="font-sans text-gray-800">
      {/* Navigation Bar */}
     

      {/* Hero Section */}
      <HeroSection/>

      {/* Featured Turfs Section */}
      <FeaturesTurf turfs={turfs} />

      {/* Booking Section */}
      <section className="py-16 px-5 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto bg-gray-50 rounded-xl overflow-hidden shadow-lg">
          <div className="flex flex-col lg:flex-row">
            <div className="p-8 lg:p-12 flex-1">
              <h2 className="text-3xl font-bold mb-8">Book Your Slot</h2>
              
              <div className="mb-6">
                <label className="flex items-center text-gray-700 mb-2">
                  <FiCalendar className="mr-2" /> Select Date
                </label>
                <input 
                  type="date" 
                  value={bookingDate.toISOString().split('T')[0]}
                  onChange={(e) => setBookingDate(new Date(e.target.value))}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div className="mb-6">
                <label className="flex items-center text-gray-700 mb-2">
                  <FiClock className="mr-2" /> Select Time Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      className={`py-2 px-3 border rounded-md text-sm ${
                        selectedSlot === slot 
                          ? 'bg-green-600 text-white border-green-600' 
                          : 'border-gray-300 hover:border-green-500'
                      }`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <label className="block text-gray-700 mb-2">Select Turf</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Elite Football Arena</option>
                  <option>Pro Soccer Grounds</option>
                  <option>Champions Turf</option>
                </select>
              </div>
              
              <button className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition">
                Book Now
              </button>
            </div>
            
            <div className="hidden lg:block flex-1 bg-cover bg-center" 
                 style={{ backgroundImage: "url(https://images.unsplash.com/photo-1574629810360-7efbbe195018)" }}>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-5 lg:px-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Turfs?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <div className="text-4xl mb-4">⚽</div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-600">FIFA-approved artificial turf with perfect bounce and roll</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-2">Floodlights</h3>
              <p className="text-gray-600">Professional lighting for night games and training</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <div className="text-4xl mb-4">🚿</div>
              <h3 className="text-xl font-bold mb-2">Facilities</h3>
              <p className="text-gray-600">Changing rooms, showers, and equipment rental available</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
              <p className="text-gray-600">Instant confirmation with our online booking system</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials/>
	  {/* Footer */}
    </div>
  );
};

export default FootballTurfLanding;