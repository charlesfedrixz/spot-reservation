import { getAllFootballTurfs } from "@/api/apiService";
import { Axios } from "@/lib/axiosSetup";
import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";

const FootballTurfBooking = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [bookingStatus, setBookingStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAllSlots, setShowAllSlots] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const paramas = useParams();
  const turfId = paramas?.id;

  const {
    data: fetchTimeSlots,
    isLoading: slotLoading,
    isError: slotError,
  } = useQuery({
    queryKey: ["timeSlots", turfId, selectedDate],
    queryFn: async () => {
      const response = await Axios.get(
        `/api/turf/${turfId}/availability?date=${selectedDate}`
      );
      return response?.data?.data;
    },
    enabled: !!turfId && !!selectedDate,
  });

  const {
    data: fetchALlTurfs,
    isLoading: allTurfsLoading,
    isError: allTurfsError,
  } = useQuery({
    queryKey: ["allTurfs"],
    queryFn: getAllFootballTurfs,
  });
  // console.log("allTurfs", fetchALlTurfs);
  if (allTurfsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (allTurfsError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">Error loading turfs. Please try again.</p>
      </div>
    );
  }

  const filterTurfs = fetchALlTurfs?.filter((turf) => turf?._id === turfId);
  const turf = filterTurfs[0];
  console.log(turf);
  // console.log(filterTurfs?.image[currentImageIndex]);

  // Single turf data
  // const turf = {
  //   id: 1,
  //   name: "Champions Arena",
  //   size: "11v11",
  //   images: [
  //     "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=800&h=600&fit=crop",
  //     "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop",
  //     "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&h=600&fit=crop",
  //   ],
  //   location: "Downtown Sports Complex, Sector 15",
  //   rating: 4.8,
  //   reviews: 124,
  //   pricePerHour: 150,
  //   features: [
  //     { icon: <Wifi className="w-4 h-4" />, name: "Free WiFi" },
  //     { icon: <Car className="w-4 h-4" />, name: "Free Parking" },
  //     { icon: <Home className="w-4 h-4" />, name: "Changing Rooms" },
  //     { icon: <Coffee className="w-4 h-4" />, name: "Refreshments" },
  //   ],
  //   description:
  //     "Premium artificial grass turf with professional lighting and world-class facilities. Perfect for competitive matches and training sessions.",
  //   specifications: {
  //     surface: "Premium Artificial Grass",
  //     lighting: "LED Floodlights",
  //     capacity: "22 Players",
  //     dimensions: "100m x 64m",
  //   },
  // };
  const userId = "user_12345";

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  //handle booking function

  const handleBooking = async () => {
    if (!selectedDate || !selectedTimeSlot) {
      setBookingStatus({
        type: "error",
        message: "Please select date and time slot",
      });
      return;
    }

    setIsLoading(true);
    setBookingStatus(null);

    try {
      const [startTime, endTime] = selectedTimeSlot.split("-");
      const bookingData = {
        userId: userId,
        turfId: turf.id,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        startTime: startTime,
        endTime: endTime,
        turfSize: turf.size,
        turfName: turf.name,
        pricePerHour: turf.pricePerHour,
      };
      console.log(startTime, endTime);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Booking request:", bookingData);

      setBookingStatus({
        type: "success",
        message: `Booking confirmed for ${turf.name} on ${new Date(
          selectedDate
        ).toLocaleDateString()} from ${selectedTimeSlot.split("-")[0]} to ${
          selectedTimeSlot.split("-")[1]
        }`,
      });
    } catch (error) {
      setBookingStatus({
        type: "error",
        message: "Booking failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  // end of this function

  //Image navigation functions
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % turf.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + turf.images.length) % turf.images.length
    );
  };

  // Format time label from "06:00 to 07:00" to "06:00 AM - 07:00 AM"
  const formatTimeLabel = (label) => {
    if (!label) return "";

    const [start, end] = label.split(" to "); // "06:00", "07:00"

    return `${formatTime(start)} - ${formatTime(end)}`;
  };

  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    const date = new Date();
    date.setHours(+hour, +minute);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const images =
    Array.isArray(filterTurfs) && filterTurfs.length > 0
      ? filterTurfs[0].image
      : [];
  const safeIndex =
    images && images.length > 0 && currentImageIndex < images.length
      ? currentImageIndex
      : 0;

  console.log(currentImageIndex);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-first container with proper spacing */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header - Responsive padding and typography */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">
              Book Your Football Turf
            </h1>
            <p className="text-sm sm:text-base text-green-100">
              Reserve your spot for the ultimate game experience
            </p>
          </div>

          <div className="p-4 sm:p-6">
            {/* Turf Details */}
            <div className="mb-6 sm:mb-8">
              {/* Image Gallery - Responsive height and controls */}
              <div className="relative mb-4 sm:mb-6">
                <div className="relative overflow-hidden rounded-lg">
                  {images.length > 0 ? (
                    <img
                      src={images[safeIndex]}
                      alt={filterTurfs?.name || "Turf Image"}
                      className="w-full h-48 sm:h-64 md:h-72 lg:h-80 object-cover transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 sm:h-64 md:h-72 lg:h-80 bg-gray-300 flex items-center justify-center">
                      Loading image...
                    </div>
                  )}
                  {/* Navigation arrows - Hidden on small screens, visible on md+ */}
                  <button
                    onClick={prevImage}
                    className=" md:flex absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className=" md:flex absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  {/* Image indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {Array.isArray(filterTurfs?.image) &&
                      filterTurfs?.image.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                            currentImageIndex === index
                              ? "bg-white"
                              : "bg-white/50"
                          }`}
                        />
                      ))}
                  </div>
                  {/* Size badge */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-green-600 text-white px-2 sm:px-3 py-1 rounded-full font-semibold text-xs sm:text-sm">
                    {turf.side} vs {turf.side}
                  </div>
                </div>
              </div>

              {/* Turf Information - Responsive grid */}
              <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="order-1 lg:order-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                    {turf?.name}
                  </h2>

                  <div className="flex items-start sm:items-center mb-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mr-2 mt-0.5 sm:mt-0 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-600 leading-tight">
                      {turf?.location?.address}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <div className="flex items-center">
                      {/* <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mr-1" /> */}
                      <span className="font-semibold text-gray-700 text-sm sm:text-base">
                        {/* {turf.rating} */}
                      </span>
                      <span className="text-gray-500 ml-1 text-sm sm:text-base">
                        {/* ({turf.reviews} reviews) */}
                      </span>
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-green-600">
                      ₹{turf?.prices?.hourly?.price}/hr
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                    {turf?.description}
                  </p>

                  {/* Features - Responsive grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {turf?.amenities?.length > 0 ? (
                        turf.amenities.map((feature, index) =>
                          feature && !feature.includes("undefined") ? (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                            >
                              {feature}
                            </span>
                          ) : null
                        )
                      ) : (
                        <p className="text-muted-foreground">No Amenities</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Specifications - Better mobile spacing */}
                <div className="order-2 lg:order-2 bg-gray-50 p-4 sm:p-4 rounded-lg">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
                    Specifications
                  </h3>
                  <div className=" flex flex-row space-y-2 sm:space-y-2">
                    <div className="flex gap-4  items-start">
                      <span className="text-sm sm:text-base text-gray-600 capitalize flex-shrink-0 mr-2">
                        Timing :
                      </span>
                      <span className="font-medium text-gray-800 text-sm sm:text-base text-right">
                        {turf?.timing?.start} am - {turf?.timing?.end} pm
                      </span>
                      <span className="text-sm sm:text-base text-gray-600 capitalize flex-shrink-0 mr-2">
                        side :
                      </span>
                      <span className="font-medium text-gray-800 text-sm sm:text-base text-right">
                        {turf?.side} vs {turf?.side}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Section - Improved mobile layout */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                Select Date & Time
              </h3>

              <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Date Selection */}
                <DatePicker
                  selected={selectedDate ? new Date(selectedDate) : null}
                  onChange={(date) =>
                    setSelectedDate(date.toISOString().split("T")[0])
                  }
                  minDate={today}
                  placeholderText="Select a date"
                  className="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  dateFormat="yyyy-MM-dd"
                />

                {/* Time Selection - Mobile optimized */}
                <div className="order-2 lg:order-2">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Available Time Slots
                  </label>

                  {/* Mobile: Show fewer slots initially with expand option */}
                  <div className="space-y-2 sm:space-y-0 sm:max-h-48 sm:overflow-y-auto sm:border sm:border-gray-300 sm:rounded-lg">
                    {!fetchTimeSlots ? (
                      <p className="text-gray-500 text-sm p-3">
                        Please select a date to load slots
                      </p>
                    ) : fetchTimeSlots.timeSlots?.length === 0 ? (
                      <p className="text-gray-500 text-sm p-3">
                        No slots available for this date
                      </p>
                    ) : (
                      fetchTimeSlots?.timeSlots?.map((slot, index) => (
                        <button
                          key={`${slot.value}-${index}`}
                          disabled={!slot.available}
                          onClick={() => setSelectedTimeSlot(slot.value)}
                          className={`w-full text-left p-3 rounded-lg sm:rounded-none sm:border-b sm:border-gray-200 transition-colors text-sm sm:text-base ${
                            !slot.available
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                              : selectedTimeSlot === slot.value
                              ? "bg-green-100 text-green-800 border-2 border-green-300 sm:border-b sm:border-green-300"
                              : "hover:bg-gray-50 text-gray-700 border border-gray-200 sm:border-0"
                          } ${
                            index === fetchTimeSlots.timeSlots.length - 1
                              ? "sm:border-b-0"
                              : ""
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">
                              {formatTimeLabel(slot.label)}
                            </span>
                            <div className="flex items-center space-x-2">
                              {!slot.available ? (
                                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                                  Booked
                                </span>
                              ) : (
                                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                                  Available
                                </span>
                              )}
                              {slot.available &&
                                selectedTimeSlot === slot.value && (
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                )}
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>

                  {/* Show more/less button for mobile */}
                  {fetchTimeSlots?.timeslots?.length > 6 && (
                    <div className="sm:hidden mt-3">
                      <button
                        onClick={() => setShowAllSlots(!showAllSlots)}
                        className="w-full text-center text-green-600 font-medium py-2 text-sm"
                      >
                        {showAllSlots
                          ? "Show Less"
                          : `Show ${
                              fetchTimeSlots.timeslots.length - 6
                            } More Slots`}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Booking Summary - Mobile optimized */}
            {selectedDate && selectedTimeSlot && (
              <div className="bg-green-50 border border-green-200 p-4 sm:p-6 rounded-lg mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                  Booking Summary
                </h3>
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Turf</p>
                    <p className="font-semibold text-sm sm:text-base">
                      {turf.name} ({turf.side} vs {turf.side})
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Date</p>
                    <p className="font-semibold text-sm sm:text-base">
                      {new Date(selectedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="sm:col-span-2 md:col-span-1">
                    <p className="text-xs sm:text-sm text-gray-600">
                      Time Slot
                    </p>
                    <p className="font-semibold text-sm sm:text-base">
                      {
                        fetchTimeSlots?.timeSlots?.find(
                          (slot) => slot.value === selectedTimeSlot
                        )?.label
                      }
                    </p>
                  </div>
                  <div className="sm:col-span-2 md:col-span-1">
                    <p className="text-xs sm:text-sm text-gray-600">
                      Total Amount
                    </p>
                    <p className="font-semibold text-green-600 text-base sm:text-lg">
                      ₹{turf?.prices?.hourly?.price}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Status Messages */}
            {bookingStatus && (
              <div
                className={`mb-6 p-4 rounded-lg flex items-start sm:items-center ${
                  bookingStatus.type === "success"
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-red-100 text-red-800 border border-red-200"
                }`}
              >
                <div className="flex-shrink-0 mr-2 mt-0.5 sm:mt-0">
                  {bookingStatus.type === "success" ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                </div>
                <span className="text-sm sm:text-base leading-relaxed">
                  {bookingStatus.message}
                </span>
              </div>
            )}

            {/* Book Now Button - Responsive sizing */}
            <div className="text-center">
              <button
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTimeSlot || isLoading}
                className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all ${
                  !selectedDate || !selectedTimeSlot || isLoading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 transform hover:scale-105 shadow-lg"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing Booking...
                  </div>
                ) : (
                  `Book Now - ₹${turf?.prices?.hourly?.price}`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FootballTurfBooking;
// import { useState } from "react";
// import { useParams } from "react-router-dom";

// const BookNow = () => {
//   const [bookingData, setBookingData] = useState({
//     date: "",
//     time: "",
//     name: "",
//     email: "",
//     phone: "",
//   });
//   const params = useParams();
//   console.log("params:", params);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle booking submission
//     console.log(bookingData);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md mx-auto">
//         <div className="text-center">
//           <h2 className="mt-6 text-3xl font-bold text-gray-900">
//             Book Your Spot
//           </h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Reserve your parking space quickly and easily
//           </p>
//         </div>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm space-y-4">
//             <div>
//               <label
//                 htmlFor="date"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Date
//               </label>
//               <input
//                 type="date"
//                 id="date"
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 onChange={(e) =>
//                   setBookingData({ ...bookingData, date: e.target.value })
//                 }
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="time"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Time
//               </label>
//               <input
//                 type="time"
//                 id="time"
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 onChange={(e) =>
//                   setBookingData({ ...bookingData, time: e.target.value })
//                 }
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="name"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 onChange={(e) =>
//                   setBookingData({ ...bookingData, name: e.target.value })
//                 }
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 onChange={(e) =>
//                   setBookingData({ ...bookingData, email: e.target.value })
//                 }
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="phone"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Phone Number
//               </label>
//               <input
//                 type="tel"
//                 id="phone"
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 onChange={(e) =>
//                   setBookingData({ ...bookingData, phone: e.target.value })
//                 }
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Book Now
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BookNow;
