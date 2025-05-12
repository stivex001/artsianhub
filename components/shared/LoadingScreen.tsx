import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-6"></div>

      {/* Percentage Counter */}
      <p className="text-2xl font-semibold text-gray-700 mb-2">
        Loading... {progress}%
      </p>

      {/* Progress Bar */}
      <div className="w-64 bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-blue-500 h-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
