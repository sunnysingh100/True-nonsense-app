import React from "react";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-blue-200">
      <div className="flex flex-col items-center">
        <div className="h-12 w-12 animate-spin rounded-full border-8 border-blue-400 border-t-transparent"></div>
        <p className="mt-4 text-lg text-gray-700">Loading, please wait...</p>
      </div>
    </div>
  );
}
