
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { motion } from "framer-motion";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
  userRole?: 'manufacturer' | 'distributor' | 'wholesaler' | 'retailer';
}

export default function Header({ isLoggedIn = false, userName, userRole }: HeaderProps) {
  const navigate = useNavigate();
  
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          className="flex items-center cursor-pointer"
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
        >
          <img 
            src="/lovable-uploads/a8207828-3432-4a1f-beea-9b8855055682.png" 
            alt="NexQ Logo" 
            className="h-12 w-auto mr-2" 
          />
        </motion.div>
        
        {/* Profile dropdown */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-nexq-purple text-white rounded-full flex items-center justify-center">
                  <User size={18} />
                </div>
                {isLoggedIn && userName && (
                  <span className="hidden md:block text-sm font-medium">{userName}</span>
                )}
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {isLoggedIn ? (
                <>
                  <DropdownMenuItem onClick={() => navigate(`/${userRole}/dashboard`)}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/')}>
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    Login / Register
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
