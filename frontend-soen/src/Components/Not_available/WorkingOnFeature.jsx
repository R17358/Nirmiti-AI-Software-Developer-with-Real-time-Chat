import React from 'react';

const WorkingOnFeature = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center border-t-4 border-red-500">
        <h2 className="text-gray-800 text-2xl font-semibold mb-4">
          🚧 Currently Working on This Feature
        </h2>
        <p className="text-gray-600">
          We’re still building this section. Please check back soon!
        </p>
        <div className="mt-6">
          <div className="h-2 w-full bg-gray-200 rounded-full">
            <div className="h-2 bg-red-500 rounded-full w-1/2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingOnFeature;
