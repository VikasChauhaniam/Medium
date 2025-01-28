

const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <h2 className="mt-4 text-2xl font-semibold text-gray-700">Oops! Page Not Found</h2>
            <p className="mt-2 text-gray-600">
                The page you are looking for does not exist or an error occurred.
            </p>
            <a 
                href="/" 
                className="mt-6 px-6 py-3 bg-blue-500 text-white font-medium text-lg rounded-lg shadow-md hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:ring-opacity-50 transition"
            >
                Back to Home
            </a>
            
        </div>
    );
};

export default PageNotFound;