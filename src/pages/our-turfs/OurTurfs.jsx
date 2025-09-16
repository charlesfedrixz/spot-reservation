import Loader from "@/components/common/Loader";
import TurfCard from "@/components/ui/TurfCard";
import { useFetchTurf } from "@/hooks/api/useFetchTurf";

export default function OurTurfs() {
  const { data: turfs, isLoading, isError } = useFetchTurf();
  if (isLoading)
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  if (isError) return <div>Error loading turfs. Please try again later.</div>;
  console.log(turfs);
  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Turfs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {turfs?.map((turf, i) => (
          <TurfCard key={turf._id} turf={turf} i={i} />
          // <motion.div
          //   key={turf._id}
          //   className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
          //   variants={cardVariants}
          //   initial="hidden"
          //   whileInView="visible"
          //   viewport={{ once: true, amount: 0.2 }}
          //   custom={i}
          // >
          //   {/* Turf Image */}
          //   {turf?.image?.map((img) => (
          //     <TurfImageSlider
          //       key={img}
          //       images={img}
          //       price={turf.prices.hourly.price}
          //     />
          //   ))}
          //   {/* Turf Details */}
          //   <div className="p-6">
          //     <h3 className="text-xl font-bold mb-2">{turf?.name}</h3>

          //     <div className="flex items-center text-gray-600 mb-2">
          //       <FiMapPin className="mr-2" />
          //       <span>{turf?.location?.address}</span>
          //     </div>

          //     <div className="flex items-center mb-4">
          //       <FiStar className="text-yellow-500 mr-1" />
          //       <span className="font-semibold">{turf.rating}</span>
          //     </div>

          //     <div className="flex flex-wrap gap-2 mb-4">
          //       {turf?.amenities?.length > 0 ? (
          //         turf.amenities.map((feature, index) => (
          //           <div key={index}>
          //             {feature && !feature.includes("undefined") ? (
          //               <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
          //                 {feature}
          //               </span>
          //             ) : null}
          //           </div>
          //         ))
          //       ) : (
          //         <p className="text-muted-foreground">No Amenities</p>
          //       )}
          //     </div>
          //     <Link
          //       to={`/our-turfs/id?${turf._id}`}
          //       className="w-full py-2 px-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          //     >
          //       View Details
          //     </Link>
          //   </div>
          // </motion.div>
        ))}
      </div>
    </div>
  );
}
