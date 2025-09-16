import { handleFilterByDataAndTime } from "@/api/apiService";
import { Calendar } from "@/components/ui/calendar";
import { useMutation } from "@tanstack/react-query";
import { Clock, Filter } from "lucide-react";
import React, { useMemo, useState } from "react";

export default function FilterTurf() {
  const [slotStart, setSlotStart] = useState("");
  const [slotEnd, setSlotEnd] = React.useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showFiltered, setShowFiltered] = useState(false);

  const timeOptions = useMemo(() => {
    const times = [];
    for (let i = 6; i <= 23; i++) {
      const hour = i.toString().padStart(2, "0");
      times.push(`${hour}:00`);
    }
    return times;
  }, []);
  const { mutate: filteredTurfs, isPending } = useMutation({
    mutationKey: ["filterTurfs", selectedDate, slotEnd, slotStart],
    mutationFn: async () =>
      handleFilterByDataAndTime(selectedDate, slotStart, slotEnd),
    onSuccess: (data) => {
      console.log(data);
      setShowFiltered(data?.availableTurfs);
      setSlotStart("");
      setSlotEnd("");
      setSelectedDate("");
    },
  });

  console.log(showFiltered);
  const handleFilter = async (e) => {
    e.preventDefault();
    if (!selectedDate || !slotStart || !slotEnd) {
      alert("Please fill all fields");
      return;
    }

    try {
      await filteredTurfs({ date: selectedDate, slotStart, slotEnd });
    } catch (error) {
      console.error("Filter failed:", error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-6 h-6 text-green-600" />
        <h2 className="text-2xl font-semibold text-gray-800">
          Filter Available Turfs
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Date Picker */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-center   ">
          <Calendar
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md"
            mode="single"
            // toDate={new Date()}
          />
        </div>

        {/* Start Time */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Clock className="w-4 h-4 text-green-600" />
            Start Time
          </label>
          <select
            value={slotStart}
            onChange={(e) => setSlotStart(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          >
            <option value="">Select start time</option>
            {timeOptions.slice(0, -1).map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        {/* End Time */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Clock className="w-4 h-4 text-green-600" />
            End Time
          </label>
          <select
            value={slotEnd}
            onChange={(e) => setSlotEnd(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          >
            <option value="">Select end time</option>
            {timeOptions.slice(1).map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleFilter}
            disabled={isPending}
            className={`px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold transform transition-all duration-200 shadow-lg ${
              isPending
                ? "opacity-50 cursor-not-allowed"
                : "hover:from-green-700 hover:to-blue-700 hover:scale-105"
            }`}
          >
            {isPending ? "Searching..." : "Search Turfs"}
          </button>

          <button
            // onClick={resetFilters}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Filter Summary */}
      {/* {showFiltered && (
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <p className="text-green-800 font-medium">
            Showing turfs available on {selectedDate} from {slotStart} to{" "}
            {slotEnd}
            <span className="ml-2 px-3 py-1 bg-green-200 rounded-full text-sm font-semibold">
              {filteredTurfs.length} turfs found
            </span>
          </p>
        </div>
      )} */}
    </div>
  );
}
