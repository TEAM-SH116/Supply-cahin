
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import FeatureCard from "@/components/FeatureCard";
import QRScanner from "@/components/QRScanner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import {
  Box,
  DollarSign,
  PackageCheck,
  Truck,
  Search,
  ChevronRight,
} from "lucide-react";

// Sample data
const recommendedSuppliers = [
  { id: 1, name: "ABC Electronics", type: "Manufacturer", category: "Electronics", products: "Phones, Laptops" },
  { id: 2, name: "Metro Distribution", type: "Distributor", category: "Electronics", products: "Audio Equipment, Accessories" },
  { id: 3, name: "Sri Traders", type: "Manufacturer", category: "Accessories", products: "Chargers, Cables" },
];

export default function WholesalerDashboard() {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [supplierType, setSupplierType] = useState("");
  const [qrMode, setQrMode] = useState<'generate' | 'scan'>('scan');
  
  const userName = "Metro Wholesale Inc."; // In a real app, this would come from authentication
  
  useEffect(() => {
    // Check if this is the first login (would use localStorage or backend in real app)
    const hasVisitedBefore = localStorage.getItem("wholesaler_visited");
    if (hasVisitedBefore) {
      setShowWelcome(false);
    }
  }, []);
  
  const dismissWelcome = () => {
    localStorage.setItem("wholesaler_visited", "true");
    setShowWelcome(false);
  };
  
  const handleQrScan = (data: string) => {
    toast({
      title: "QR Code Scanned",
      description: `Inventory updated: ${data}`,
    });
  };

  const features = [
    {
      icon: Box,
      title: "Bulk Inventory",
      description: "Manage large volumes of inventory efficiently",
      onClick: () => navigate("/wholesaler/inventory")
    },
    {
      icon: DollarSign,
      title: "Bulk Discounts",
      description: "Access special volume-based discounts",
      onClick: () => navigate("/wholesaler/discounts")
    },
    {
      icon: PackageCheck,
      title: "Order Management",
      description: "Manage supplier and retailer orders",
      onClick: () => navigate("/wholesaler/orders")
    },
    {
      icon: Truck,
      title: "Logistics Booking",
      description: "Book cost-effective bulk deliveries",
      onClick: () => navigate("/wholesaler/logistics")
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn userName={userName} userRole="wholesaler" />
      
      <div className="pt-16 flex">
        <Sidebar userName={userName} userRole="wholesaler" />
        
        <main className="flex-1 p-6">
          {/* Welcome popup */}
          <AnimatePresence>
            {showWelcome && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
              >
                <motion.div 
                  className="bg-white p-8 rounded-lg shadow-lg max-w-md"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                >
                  <h2 className="text-2xl font-bold mb-4">
                    Welcome, {userName}!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for joining NexQ. We're excited to help you manage bulk inventory
                    and connect with manufacturers, distributors, and retailers.
                  </p>
                  <Button onClick={dismissWelcome} className="nexq-button-primary w-full">
                    Start Now
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Dashboard content */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-nexq-green">Hello, {userName}!</h1>
            <p className="text-gray-600">Welcome to your wholesaler dashboard.</p>
          </div>
          
          {/* Search bar */}
          <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-medium mb-2">Find Suppliers & Products</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Search manufacturers or distributors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-full sm:w-40">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="fmcg">FMCG</SelectItem>
                      <SelectItem value="textiles">Textiles</SelectItem>
                      <SelectItem value="appliances">Home Appliances</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-40">
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="north">North</SelectItem>
                      <SelectItem value="south">South</SelectItem>
                      <SelectItem value="east">East</SelectItem>
                      <SelectItem value="west">West</SelectItem>
                      <SelectItem value="central">Central</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-40">
                <Select value={supplierType} onValueChange={setSupplierType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Supplier Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="manufacturer">Manufacturer</SelectItem>
                      <SelectItem value="distributor">Distributor</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Button className="nexq-button-primary">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
          
          {/* Recommendations */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Recommended Suppliers</h2>
              <Button variant="link" className="text-nexq-purple">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedSuppliers.map((supplier) => (
                <motion.div
                  key={supplier.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{supplier.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{supplier.type}</span>
                        <span className="text-xs text-gray-500">{supplier.category}</span>
                      </div>
                      <p className="text-sm mt-2">Products: {supplier.products}</p>
                    </div>
                    <Badge className="bg-nexq-purple">{supplier.category}</Badge>
                  </div>
                  <Button variant="outline" className="mt-4 w-full border-nexq-green text-nexq-green hover:bg-nexq-green/10">
                    Contact Supplier
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Features */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Dashboard Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  onClick={feature.onClick}
                />
              ))}
            </div>
          </div>
          
          {/* QR Code Scanner */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">QR Code Scanner</h2>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2">
                  <h3 className="text-lg font-medium mb-4">Bulk Inventory Management</h3>
                  <p className="text-gray-600 mb-4">
                    Scan QR codes to quickly update your inventory when receiving
                    bulk shipments from manufacturers and distributors.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-gray-500 text-sm">
                      <Box size={16} />
                      <span>Last scan: Smartphone X1, Qty: 1000, 5 hours ago</span>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-1/2 flex justify-center">
                  <QRScanner mode={qrMode} onScan={handleQrScan} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
