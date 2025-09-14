import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

interface MessageButtonProps {
  className?: string;
  variant?: "default" | "outline" | "ghost";
}

const MessageButton = ({ className = "", variant = "default" }: MessageButtonProps) => {
  const baseStyles = "flex items-center gap-2 px-4 py-2 rounded-md transition-colors";
  
  const variantStyles = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground"
  };

  return (
    <Link 
      to="/messages" 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      <span>Messages</span>
    </Link>
  );
};

export default MessageButton; 