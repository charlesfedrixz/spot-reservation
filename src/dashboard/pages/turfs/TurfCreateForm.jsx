import useTurfCreate from "@/dashboard/hooks/useTurfCreate";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  DollarSign,
  MapPin,
  Plus,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

export default function TurfCreateForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: {
      address1: "",
      address2: "",
      googleMapLink: "",
    },
    playerSide: "",
    timing: {
      startTime: "",
      endTime: "",
    },
    pricing: {
      hourly: {
        hour: "",
        price: "",
      },
      event: {
        price: "",
        description: "",
      },
    },
    images: [],
    amenities: {
      washroom: false,
      changingRoom: false,
      shop: false,
      parking: false,
    },
  });

  const [imagePreview, setImagePreview] = useState([]);

  const steps = [
    {
      title: "Basic Information",
      icon: "1",
      color: "green",
    },
    {
      title: "Location Details",
      icon: <MapPin className="w-4 h-4" />,
      color: "blue",
    },
    {
      title: "Game & Timing",
      icon: <Users className="w-4 h-4" />,
      color: "purple",
    },
    {
      title: "Pricing Details",
      icon: <DollarSign className="w-4 h-4" />,
      color: "yellow",
    },
    {
      title: "Turf Images",
      icon: <Camera className="w-4 h-4" />,
      color: "pink",
    },
    {
      title: "Amenities",
      icon: <Check className="w-4 h-4" />,
      color: "indigo",
    },
  ];

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const parts = field.split(".");
      if (parts.length === 2) {
        const [parent, child] = parts;
        setFormData((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value,
          },
        }));
      } else if (parts.length === 3) {
        const [parent, subParent, child] = parts;
        setFormData((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [subParent]: {
              ...prev[parent][subParent],
              [child]: value,
            },
          },
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: !prev.amenities[amenity],
      },
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setImagePreview((prev) => [...prev, ...newImages]);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const removeImage = (imageId) => {
    setImagePreview((prev) => prev.filter((img) => img.id !== imageId));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          formData.name.trim() !== "" && formData.description.trim() !== ""
        );
      case 1:
        return formData.location.address1.trim() !== "";
      case 2:
        return (
          formData.playerSide !== "" &&
          formData.timing.startTime !== "" &&
          formData.timing.endTime !== ""
        );
      case 3:
        return (
          formData.pricing.hourly.hour !== "" &&
          formData.pricing.hourly.price !== ""
        );
      case 4:
      case 5:
        return true; // Images and amenities are optional
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateCurrentStep() && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const { mutate, isPending, isError, error } = useTurfCreate();
  const transformFormData = (data) => {
    return {
      name: data.name,
      description: data.description,
      location: {
        address: data.location.address1,
        mapLink: data.location.googleMapLink,
      },
      side: parseInt(data.playerSide),
      timing: {
        start: data.timing.startTime,
        end: data.timing.endTime,
      },
      prices: {
        hourly: {
          hour: data.pricing.hourly.hour,
          price: parseInt(data.pricing.hourly.price),
        },
        event: {
          price: parseInt(data.pricing.event.price),
          description: data.pricing.event.description,
        },
      },
      aminities: {
        ...data.amenities,
      },
      image: data.images, // should be image URLs (e.g., from Cloudinary)
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    const transformedData = transformFormData(formData);
    // Wrap the transformed data in an array to match the "data": [ ... ] structure
    mutate({ data: [transformedData] });
    // alert("Turf created successfully!");
  };

  const getStepColor = (color) => {
    const colors = {
      green: "bg-green-100 text-green-600",
      blue: "bg-blue-100 text-blue-600",
      purple: "bg-purple-100 text-purple-600",
      yellow: "bg-yellow-100 text-yellow-600",
      pink: "bg-pink-100 text-pink-600",
      indigo: "bg-indigo-100 text-indigo-600",
    };
    return colors[color] || "bg-gray-100 text-gray-600";
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Turf Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter turf name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                placeholder="Describe your turf facility..."
                required
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Address *
                </label>
                <input
                  type="text"
                  value={formData.location.address1}
                  onChange={(e) =>
                    handleInputChange("location.address1", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Street, City, State"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Address
                </label>
                <input
                  type="text"
                  value={formData.location.address2}
                  onChange={(e) =>
                    handleInputChange("location.address2", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Landmark, Area"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google Maps Link
              </label>
              <input
                type="url"
                value={formData.location.googleMapLink}
                onChange={(e) =>
                  handleInputChange("location.googleMapLink", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="https://maps.google.com/..."
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Players per Side *
                </label>
                <select
                  value={formData.playerSide}
                  onChange={(e) =>
                    handleInputChange("playerSide", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select players</option>
                  <option value="5">5 vs 5</option>
                  <option value="6">6 vs 6</option>
                  <option value="7">7 vs 7</option>
                  <option value="11">11 vs 11</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time *
                </label>
                <input
                  type="time"
                  value={formData.timing.startTime}
                  onChange={(e) =>
                    handleInputChange("timing.startTime", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time *
                </label>
                <input
                  type="time"
                  value={formData.timing.endTime}
                  onChange={(e) =>
                    handleInputChange("timing.endTime", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            {/* Hourly Pricing */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">
                Hourly Booking
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Hours *
                  </label>
                  <input
                    type="number"
                    value={formData.pricing.hourly.hour}
                    onChange={(e) =>
                      handleInputChange("pricing.hourly.hour", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="1"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Hour *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={formData.pricing.hourly.price}
                      onChange={(e) =>
                        handleInputChange(
                          "pricing.hourly.price",
                          e.target.value
                        )
                      }
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                      placeholder="500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Event Pricing */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">
                Event Booking
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={formData.pricing.event.price}
                      onChange={(e) =>
                        handleInputChange("pricing.event.price", e.target.value)
                      }
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                      placeholder="3000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Description
                  </label>
                  <input
                    type="text"
                    value={formData.pricing.event.description}
                    onChange={(e) =>
                      handleInputChange(
                        "pricing.event.description",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="Birthday Event Booking"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Plus className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    Click to upload images
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {imagePreview.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imagePreview.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries({
                washroom: "Washroom",
                changingRoom: "Changing Room",
                shop: "Shop",
                parking: "Parking",
              }).map(([key, label]) => (
                <label
                  key={key}
                  className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={formData.amenities[key]}
                    onChange={() => handleAmenityToggle(key)}
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-gray-700 font-medium">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Create New Turf
            </h1>
            <p className="text-gray-600 text-lg">
              Set up your sports facility for bookings
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index <= currentStep
                        ? `${getStepColor(step.color)} border-2 border-current`
                        : "bg-gray-200 text-gray-400"
                    } transition-all duration-300`}
                  >
                    {typeof step.icon === "string" ? (
                      <span className="font-bold">{step.icon}</span>
                    ) : (
                      step.icon
                    )}
                  </div>
                  <span
                    className={`text-xs mt-1 ${
                      index <= currentStep
                        ? "text-gray-700 font-medium"
                        : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${getStepColor(
                  steps[currentStep].color
                )}`}
              >
                {typeof steps[currentStep].icon === "string" ? (
                  <span className="font-bold">{steps[currentStep].icon}</span>
                ) : (
                  steps[currentStep].icon
                )}
              </div>
              {steps[currentStep].title}
            </h2>

            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
                currentStep === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </button>

            {currentStep === steps.length - 1 ? (
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Create Turf
                <Check className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                disabled={!validateCurrentStep()}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
                  validateCurrentStep()
                    ? "bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
