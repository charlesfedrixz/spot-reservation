export default function About() {
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">
            About Us
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We're dedicated to providing the most convenient and efficient
              parking spot reservation system. Our platform helps users find and
              book parking spaces seamlessly, saving time and reducing stress.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                Why Choose Us?
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Easy to use platform
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  24/7 customer support
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Secure payments
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Real-time availability
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                Contact Information
              </h3>
              <div className="text-gray-600 space-y-2">
                <p className="flex items-center">
                  <span className="mr-2">📍</span>
                  123 Parking Street, City, Country
                </p>
                <p className="flex items-center">
                  <span className="mr-2">📞</span>
                  +1 234 567 890
                </p>
                <p className="flex items-center">
                  <span className="mr-2">✉️</span>
                  contact@spotreservation.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
