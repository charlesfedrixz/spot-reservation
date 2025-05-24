import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 px-5 lg:px-20">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
      <div>
        <h3 className="text-2xl font-bold mb-4">Search<span className="text-green-500">MyPlay</span></h3>
        <p className="mb-6 text-gray-400">Your premier destination for football turf bookings</p>
        <div className="flex space-x-4">
          <FaFacebook className="text-xl text-gray-400 hover:text-white cursor-pointer" />
          <FaTwitter className="text-xl text-gray-400 hover:text-white cursor-pointer" />
          <FaInstagram className="text-xl text-gray-400 hover:text-white cursor-pointer" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li className="text-gray-400 hover:text-white cursor-pointer">Home</li>
          <li className="text-gray-400 hover:text-white cursor-pointer">Our Turfs</li>
          <li className="text-gray-400 hover:text-white cursor-pointer">Book Now</li>
          <li className="text-gray-400 hover:text-white cursor-pointer">Contact</li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
        <div className="space-y-3 text-gray-400">
          <p className="flex items-center">
            <FiMapPin className="mr-2" /> Imphal, Manipur, India
          </p>
          <p className="flex items-center">
            <FiPhone className="mr-2" /> +1 234 567 890
          </p>
          <p className="flex items-center">
            <FiMail className="mr-2" /> info@searchmyplay.com
          </p>
        </div>
      </div>
    </div>
    <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-800 text-center text-gray-400">
      <p>&copy; {new Date().getFullYear()} <SearchMyPlay></SearchMyPlay>. All rights reserved.</p>
    </div>
  </footer>
  );
};

export default Footer;
