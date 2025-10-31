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
  // const cardVariants = {
  //   hidden: { opacity: 0, y: 50 },
  //   visible: (i) => ({
  //     opacity: 1,
  //     y: 0,
  //     transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  //   }),
  // };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Turfs</h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-xl lg:max-w-5xl mx-auto">
        {turfs?.map((turf, i) => (
          <TurfCard key={turf._id} turf={turf} i={i} />
        ))}
      </div>
    </div>
  );
}
