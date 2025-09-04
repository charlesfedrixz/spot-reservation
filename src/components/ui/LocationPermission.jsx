import { AlertCircle, Check, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const LocationPermission = () => {
  const [locationStatus, setLocationStatus] = useState("pending");
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(true);

  // Auto-request location when component mounts
  useEffect(() => {
    const hasRequested = localStorage.getItem("locaionRequested");
    if (!hasRequested) {
      const timer = setTimeout(() => {
        if (showModal) {
          requestLocation();
          localStorage.setItem("locaionRequested", true);
        }
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setShowModal(false);
    }
  }, []);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      setLocationStatus("error");
      return;
    }

    setLocationStatus("requesting");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };

        setLocation(locationData);
        setLocationStatus("granted");

        // Auto-close modal after 2 seconds on success
        setTimeout(() => {
          setShowModal(false);
        }, 2000);

        console.log("Location granted:", locationData);
      },
      (error) => {
        let errorMessage = "";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user.";
            setLocationStatus("denied");
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            setLocationStatus("error");
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            setLocationStatus("error");
            break;
          default:
            errorMessage = "An unknown error occurred.";
            setLocationStatus("error");
            break;
        }

        setError(errorMessage);
        console.error("Location error:", errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  const handleRetry = () => {
    setLocationStatus("pending");
    setError("");
    requestLocation();
  };

  const handleClose = () => {
    setShowModal(false);
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Requesting Permission State */}
        {locationStatus === "requesting" && (
          <div className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPin className="text-blue-600" size={24} />
                </div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-blue-200 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Requesting Location Access
            </h2>
            <p className="text-gray-600">
              Please allow location access in your browser
            </p>
            <div className="mt-6 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full animate-pulse w-full"></div>
            </div>
          </div>
        )}

        {/* Initial Permission Request */}
        {locationStatus === "pending" && (
          <>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} />
              </div>
              <h2 className="text-xl font-semibold mb-2">
                Allow Location Access
              </h2>
              <p className="text-blue-100">
                We need your location to provide better services
              </p>
            </div>

            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Check className="text-green-500 flex-shrink-0" size={16} />
                  <span className="text-sm text-gray-700">
                    Find nearby locations
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="text-green-500 flex-shrink-0" size={16} />
                  <span className="text-sm text-gray-700">
                    Personalized recommendations
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="text-green-500 flex-shrink-0" size={16} />
                  <span className="text-sm text-gray-700">
                    Enhanced user experience
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={requestLocation}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl transition-colors font-medium"
                >
                  Allow Location
                </button>
                <button
                  onClick={handleClose}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors font-medium"
                >
                  Not Now
                </button>
              </div>
            </div>
          </>
        )}

        {/* Success State */}
        {locationStatus === "granted" && location && (
          <div className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="text-green-500" size={24} />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Location Access Granted!
            </h2>
            <p className="text-gray-600 mb-4">
              Thank you for allowing location access
            </p>
            <div className="bg-gray-50 p-4 rounded-xl text-sm">
              <p className="text-gray-600">
                <span className="font-medium">Accuracy:</span>{" "}
                {Math.round(location.accuracy)}m
              </p>
            </div>
          </div>
        )}

        {/* Error/Denied State */}
        {(locationStatus === "denied" || locationStatus === "error") && (
          <div className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="text-red-500" size={24} />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {locationStatus === "denied"
                ? "Location Access Denied"
                : "Location Error"}
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>

            {locationStatus === "denied" && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl text-left mb-6">
                <p className="text-sm font-medium text-yellow-800 mb-2">
                  To enable location:
                </p>
                <ul className="text-xs text-yellow-700 space-y-1">
                  <li>• Click the location icon in your address bar</li>
                  <li>• Select "Allow" for this website</li>
                  <li>• Refresh the page</li>
                </ul>
              </div>
            )}

            <div className="space-y-3">
              {locationStatus === "error" && (
                <button
                  onClick={handleRetry}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl transition-colors font-medium"
                >
                  Try Again
                </button>
              )}
              <button
                onClick={handleClose}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors font-medium"
              >
                Continue Without Location
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationPermission;
