import { handleFilterByDataAndTime } from "@/api/apiService";
import {Calendar} from "@/components/ui/calendar";
import { useMutation } from "@tanstack/react-query";
import { isAfter } from "date-fns";
import { Clock, Filter } from "lucide-react";
import React, { useMemo, useState } from "react";

export default function FilterTurf() {
  const [slotStart, setSlotStart] = useState("");
  const [slotEnd, setSlotEnd] = React.useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showFiltered, setShowFiltered] = useState(false);

  const timeOptions = useMemo(() => {
    const times = [];
    for (let i = 6; i <= 23; i++) {
      const hour = i.toString().padStart(2, "0");
      times.push(`${hour}:00`);
    }
    return times;
  }, []);
  const { mutate: filteredTurfs, isLoading } = useMutation({
    mutationKey: ["filterTurfs", selectedDate, slotEnd, slotStart],
    mutationFn: async ({ date, slotStart: sStart, slotEnd: sEnd }) =>
      handleFilterByDataAndTime(date, sStart, sEnd),
    onSuccess: (data) => {
      console.log(data);
      setShowFiltered(data?.availableTurfs);
      setSlotStart("");
      setSlotEnd("");
      setSelectedDate(null);
    },
  });

  const handleFilter = async (e) => {
    e.preventDefault();
    if (!selectedDate || !slotStart || !slotEnd) {
      alert("Please fill all fields");
      return;
    }

    try {
      const formattedDate =
        selectedDate instanceof Date
          ? selectedDate.toISOString().split("T")[0]
          : selectedDate;
      await filteredTurfs({ date: formattedDate, slotStart, slotEnd });
    } catch (error) {
      console.error("Filter failed:", error);
    }
  };
  console.log("calendar",selectedDate)

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-8">
      <div className="p-3 bg-green-100 rounded-full">
        <Filter className="w-6 h-6 text-green-600" />
      </div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
        Find Available Turfs
      </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {/* /* Date Picker with custom styling */}
        <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100">
          <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-xl"
          captionLayout="dropdown"
          disabled={{ before: new Date(),
            after: new Date(new Date().setMonth(new Date().getMonth()+ 1))
            }}
          classNames={{
           day_selected:
             "bg-green-600 text-white hover:bg-green-700 focus:bg-green-700",
           day_today:
              "bg-green-100 text-green-900 font-semibold",
  }}
          />
        </div>

        {/* Start Time */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <Clock className="w-5 h-5 text-green-600" />
        Start Time
        </label>
        <select
        value={slotStart}
        onChange={(e) => setSlotStart(e.target.value)}
        className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all shadow-sm hover:border-green-400"
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
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <Clock className="w-5 h-5 text-green-600" />
        End Time
        </label>
        <select
        value={slotEnd}
        onChange={(e) => setSlotEnd(e.target.value)}
        className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all shadow-sm hover:border-green-400"
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
      <div className="flex flex-col gap-3 justify-end">
        <button
        onClick={handleFilter}
        disabled={isLoading}
        className={`px-6 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-bold transform transition-all duration-300 shadow-lg hover:shadow-xl ${
          isLoading
          ? "opacity-50 cursor-not-allowed"
          : "hover:translate-y-[-2px] hover:from-green-600 hover:to-blue-600"
        }`}
        >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
          Searching...
          </span>
        ) : (
          "Search Turfs"
        )}
        </button>

        <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 shadow-sm">
        Reset
        </button>
      </div>
      </div>

      {showFiltered && (
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200 animate-fadeIn">
        <p className="text-gray-800 font-medium flex items-center gap-2">
        <span className="px-4 py-1.5 bg-green-600 text-white rounded-full text-sm font-bold">
          {showFiltered.length} turfs found
        </span>
        Available on {selectedDate?.toLocaleDateString()} from {slotStart} to {slotEnd}
        </p>
      </div>
      )}
    </div>
    );
}
