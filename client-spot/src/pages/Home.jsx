import SearchBar from "@/features/home/SearchBar";
import Card from "@/features/home/Card";
import data from "@/assets/data";

export const Home = () => {
  const date = new Date().toLocaleDateString();
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-emerald-500 drop-shadow-md mb-5 text-center">
        Find Your Spot
      </h1>
      <div className="p-6">
        <SearchBar />
        <div className="mt-4 text-gray-600 text-sm text-center">{date}</div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {data?.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
