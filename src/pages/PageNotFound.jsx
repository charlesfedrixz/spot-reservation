import { Link } from "react-router-dom";

const PageNotFound = () => {
  const isAdmin = window.location.pathname.includes("dashboard");
  const homeRoute = isAdmin ? "/dashboard" : -1;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <div className="animate-bounce mt-4">
          <svg
            className="mx-auto h-16 w-16 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 my-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't seem to exist.
        </p>
        <Link
          to={homeRoute}
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 
                    text-white font-semibold rounded-lg transition duration-300 ease-in-out 
                    transform hover:scale-105"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
