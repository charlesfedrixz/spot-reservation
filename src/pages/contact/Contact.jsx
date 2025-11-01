import useTittle from "@/hooks/useTittle";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const Contact = () => {
  useTittle("Contact Us");
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
      {/* Change grid to flex column on smaller screens */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
        {/* Make contact info cards stack vertically on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md text-center">
            <FaPhone className="text-3xl sm:text-4xl mx-auto mb-3 sm:mb-4 text-blue-600" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Phone</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              +1 (123) 456-7890
            </p>
          </div>
          <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md text-center">
            <FaEnvelope className="text-3xl sm:text-4xl mx-auto mb-3 sm:mb-4 text-blue-600" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-600 text-sm sm:text-base break-words">
              info@spotreservation.com
            </p>
          </div>
          <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md text-center">
            <FaMapMarkerAlt className="text-3xl sm:text-4xl mx-auto mb-3 sm:mb-4 text-blue-600" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Address</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              123 Parking Street
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              City, State 12345
            </p>
          </div>
        </div>

        <form className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
            Send us a message
          </h2>
          <div className="mb-3 sm:mb-4">
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>
          <div className="mb-3 sm:mb-4">
            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>
          <div className="mb-3 sm:mb-4">
            <input
              type="text"
              placeholder="Subject"
              required
              className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>
          <div className="mb-3 sm:mb-4">
            <textarea
              placeholder="Your Message"
              rows="4"
              required
              className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-sm sm:text-base"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
