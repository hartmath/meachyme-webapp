import React from "react";
import MessagingSystem from "@/components/MessagingSystem";

const Messages = () => {
  return (
    <div className="h-screen overflow-hidden">
      <MessagingSystem 
        className="h-full"
        headerTitle="Chyme"
        showHeader={true}
      />
    </div>
  );
};

export default Messages; 