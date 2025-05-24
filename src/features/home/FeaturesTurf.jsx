import React from 'react';
import { FiCalendar, FiClock, FiMapPin, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function FeaturesTurf({turfs}) {
return (
    <section className="py-16 px-5 lg:px-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-2">Our Featured Football Turfs</h2>
            <p className="text-gray-600 text-center mb-12">Top-rated pitches with premium facilities</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {turfs.map(turf => (
                    <motion.div
                        key={turf.id}
                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
                    >
                        <motion.div 
                            className="h-48 bg-cover bg-center relative"
                            style={{ backgroundImage: `url(${turf.image})` }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-md font-semibold">
                                {turf.price}
                            </div>
                        </motion.div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">{turf.name}</h3>
                            <div className="flex items-center text-gray-600 mb-2">
                                <FiMapPin className="mr-2" />
                                <span>{turf.location}</span>
                            </div>
                            <div className="flex items-center mb-4">
                                <FiStar className="text-yellow-500 mr-1" />
                                <span className="font-semibold">{turf.rating}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {turf.features.map((feature, index) => (
                                    <span key={index} className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                                        {feature}
                                    </span>
                                ))}
                            </div>
                            <button className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                                View Details
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);
}
