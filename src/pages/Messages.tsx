import React from "react";
import MessagingSystem from "@/components/MessagingSystem";

const Messages = () => {
  return (
    <div className="min-h-screen">
      <MessagingSystem 
        className="h-screen"
        headerTitle="Event Advisor Messages"
      />
    </div>
  );
};

export default Messages; 