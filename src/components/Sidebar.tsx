
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, ChevronRight, User, Package, Truck, 
  DollarSign, BarChart2, Users, MessageSquare, 
  Box, QrCode, HelpCircle, Menu, FileText
} from "lucide-react";

interface SidebarProps {
  userName: string;
  userRole: 'manufacturer' | 'distributor' | 'wholesaler' | 'retailer';
}

export default function Sidebar({ userName, userRole }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");
  const navigate = useNavigate();
  
  // Define menu items based on user role
  const getMenuItems = () => {
    const commonItems = [
      { name: 'Dashboard', icon: Box, path: `/${userRole}/dashboard`, id: 'dashboard' },
      { name: 'Profile', icon: User, path: `/${userRole}/profile`, id: 'profile' },
      { name: 'Orders', icon: Package, path: `/${userRole}/orders`, id: 'orders' },
      { name: 'Product Lists', icon: FileText, path: `/${userRole}/products`, id: 'products' },
      { name: 'Sales', icon: BarChart2, path: `/${userRole}/sales`, id: 'sales' },
      { name: 'Messages', icon: MessageSquare, path: `/${userRole}/messages`, id: 'messages' },
      { name: 'Stocks', icon: Box, path: `/${userRole}/stocks`, id: 'stocks' },
      { name: 'NexQ Logistics', icon: Truck, path: `/${userRole}/logistics`, id: 'logistics' },
      { name: 'QR Scanner', icon: QrCode, path: `/${userRole}/qr`, id: 'qr-scanner' },
      { name: 'Customer Service', icon: HelpCircle, path: `/${userRole}/support`, id: 'customer-service' },
    ];

    // Add role-specific items
    if (userRole === 'manufacturer') {
      return [
        ...commonItems.slice(0, 4),
        { name: 'Discount Impact', icon: DollarSign, path: `/${userRole}/discounts`, id: 'discounts' },
        ...commonItems.slice(4, 6),
        { name: 'Buyers', icon: Users, path: `/${userRole}/buyers`, id: 'buyers' },
        ...commonItems.slice(6),
      ];
    } else if (userRole === 'distributor') {
      return [
        ...commonItems.slice(0, 4),
        { name: 'Discount Tracker', icon: DollarSign, path: `/${userRole}/discounts`, id: 'discounts' },
        ...commonItems.slice(4, 6),
        { name: 'Buyers', icon: Users, path: `/${userRole}/buyers`, id: 'buyers' },
        ...commonItems.slice(6),
      ];
    } else if (userRole === 'wholesaler') {
      return [
        ...commonItems.slice(0, 4),
        { name: 'Bulk Discounts', icon: DollarSign, path: `/${userRole}/discounts`, id: 'discounts' },
        ...commonItems.slice(4, 6),
        { name: 'Buyers', icon: Users, path: `/${userRole}/buyers`, id: 'buyers' },
        ...commonItems.slice(6),
      ];
    } else { // retailer
      return [
        ...commonItems.slice(0, 4),
        { name: 'Discounts Available', icon: DollarSign, path: `/${userRole}/discounts`, id: 'discounts' },
        ...commonItems.slice(4, 6),
        { name: 'Suppliers', icon: Users, path: `/${userRole}/suppliers`, id: 'buyers' },
        ...commonItems.slice(6),
      ];
    }
  };

  const menuItems = getMenuItems();

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleMenuItemClick = (id: string) => {
    setActiveItem(id);
    setIsMobileOpen(false); // Close mobile sidebar after navigation
  };

  return (
    <>
      {/* Mobile hamburger menu */}
      <div className="lg:hidden fixed top-20 left-4 z-40">
        <button 
          onClick={toggleMobileSidebar}
          className="p-2 bg-nexq-green rounded-full text-white"
        >
          <Menu size={24} />
        </button>
      </div>
      
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <AnimatePresence>
        {(expanded || isMobileOpen) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-16 left-0 h-[calc(100vh-4rem)] z-30 bg-white border-r border-gray-200 overflow-y-auto ${
              expanded ? 'w-64' : 'w-20'
            } ${isMobileOpen ? 'block' : 'hidden'} lg:block`}
          >
            <div className="p-4">
              <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
                <div className="w-10 h-10 rounded-full bg-nexq-green text-white flex items-center justify-center mr-3">
                  {userName.charAt(0).toUpperCase()}
                </div>
                {expanded && (
                  <div>
                    <p className="font-medium">{userName}</p>
                    <p className="text-xs text-gray-500 capitalize">{userRole}</p>
                  </div>
                )}
              </div>
              
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <motion.li 
                    key={item.id}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button 
                      onClick={() => handleMenuItemClick(item.id)}
                      className={`flex items-center w-full py-3 px-4 rounded-md ${
                        expanded ? 'justify-start' : 'justify-center'
                      } hover:bg-gray-100 ${activeItem === item.id ? 'bg-gray-100 text-nexq-purple' : 'text-gray-700'}`}
                    >
                      <item.icon size={20} className={activeItem === item.id ? "text-nexq-purple" : "text-gray-500"} />
                      {expanded && (
                        <span className={`ml-4 ${activeItem === item.id ? 'font-medium text-nexq-purple' : ''}`}>{item.name}</span>
                      )}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            {/* Sidebar toggle button (desktop only) */}
            <button 
              onClick={toggleSidebar}
              className="absolute -right-3 top-4 bg-white rounded-full p-1 border border-gray-200 hidden lg:flex"
            >
              {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </motion.aside>
        )}
      </AnimatePresence>
      
      {/* Main content padding helper */}
      {!isMobileOpen && !expanded && (
        <div className="hidden lg:block w-20"></div>
      )}
      {!isMobileOpen && expanded && (
        <div className="hidden lg:block w-64"></div>
      )}
    </>
  );
}
