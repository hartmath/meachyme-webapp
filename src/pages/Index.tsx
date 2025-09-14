import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to messages page for better UX
    navigate("/messages", { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin h-8 w-8 border-2 border-red-600 border-opacity-50 border-t-red-600 rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Redirecting to messages...</p>
      </div>
    </div>
  );
};

export default Index;
