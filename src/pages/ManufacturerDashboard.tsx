
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
  BarChart,
  Search,
  ChevronRight,
} from "lucide-react";

// Sample data
const recommendedProducts = [
  { id: 1, name: "Battery by XYZ Ltd.", category: "Electronics", price: "₹450" },
  { id: 2, name: "Power Bank by ABC Corp.", category: "Electronics", price: "₹1200" },
  { id: 3, name: "Headphones by Sound Inc.", category: "Electronics", price: "₹800" },
];

export default function ManufacturerDashboard() {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [qrMode, setQrMode] = useState<'generate' | 'scan'>('generate');
  const [qrData, setQrData] = useState("PRODUCT_123_QTY_500");
  
  const userName = "Tech Manufacturing Ltd."; // In a real app, this would come from authentication
  
  useEffect(() => {
    // Check if this is the first login (would use localStorage or backend in real app)
    const hasVisitedBefore = localStorage.getItem("manufacturer_visited");
    if (hasVisitedBefore) {
      setShowWelcome(false);
    }
  }, []);
  
  const dismissWelcome = () => {
    localStorage.setItem("manufacturer_visited", "true");
    setShowWelcome(false);
  };
  
  const handleQrScan = (data: string) => {
    toast({
      title: "QR Code Scanned",
      description: `Data: ${data}`,
    });
  };

  const features = [
    {
      icon: Box,
      title: "Real-Time Inventory",
      description: "Track stock instantly across your warehouses",
      onClick: () => navigate("/manufacturer/inventory")
    },
    {
      icon: DollarSign,
      title: "Dynamic Discounts",
      description: "Boost sales with custom volume-based discounts",
      onClick: () => navigate("/manufacturer/discounts")
    },
    {
      icon: PackageCheck,
      title: "Order Management",
      description: "View and process incoming orders efficiently",
      onClick: () => navigate("/manufacturer/orders")
    },
    {
      icon: BarChart,
      title: "Analytics Dashboard",
      description: "Monitor sales, profits and inventory metrics",
      onClick: () => navigate("/manufacturer/analytics")
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn userName={userName} userRole="manufacturer" />
      
      <div className="pt-16 flex">
        <Sidebar userName={userName} userRole="manufacturer" />
        
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
                    Thank you for registering with NexQ. We're excited to help you streamline
                    your manufacturing processes and connect with distributors.
                  </p>
                  <Button onClick={dismissWelcome} className="nexq-button-primary w-full">
                    Get Started
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Dashboard content */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-nexq-green">Hello, {userName}!</h1>
            <p className="text-gray-600">Welcome to your manufacturer dashboard.</p>
          </div>
          
          {/* Search bar */}
          <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-medium mb-2">Find Products</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Search other manufacturers' products..."
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
              <h2 className="text-lg font-medium">Recommended Products</h2>
              <Button variant="link" className="text-nexq-purple">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.category}</p>
                      <p className="text-nexq-green font-medium mt-2">{product.price}</p>
                    </div>
                    <Badge className="bg-nexq-purple">{product.category}</Badge>
                  </div>
                  <Button variant="outline" className="mt-4 w-full border-nexq-green text-nexq-green hover:bg-nexq-green/10">
                    View
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
          
          {/* QR Code section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">QR Code Tools</h2>
              <div className="flex items-center space-x-2">
                <Button 
                  variant={qrMode === 'generate' ? "default" : "outline"}
                  className={qrMode === 'generate' ? "nexq-button-primary" : ""}
                  onClick={() => setQrMode('generate')}
                  size="sm"
                >
                  Generate QR
                </Button>
                <Button 
                  variant={qrMode === 'scan' ? "default" : "outline"}
                  className={qrMode === 'scan' ? "nexq-button-primary" : ""}
                  onClick={() => setQrMode('scan')}
                  size="sm"
                >
                  Scan QR
                </Button>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex flex-col md:flex-row gap-8">
                {qrMode === 'generate' ? (
                  <div className="w-full md:w-1/2">
                    <h3 className="text-lg font-medium mb-4">Generate Product QR</h3>
                    <div className="space-y-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Product</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select product" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="product1">Smartphone X1</SelectItem>
                              <SelectItem value="product2">Laptop Pro 15"</SelectItem>
                              <SelectItem value="product3">Wireless Earbuds</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Quantity</label>
                        <Input type="number" placeholder="Enter quantity" />
                      </div>
                      <Button className="nexq-button-primary">Generate QR Code</Button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full md:w-1/2">
                    <h3 className="text-lg font-medium mb-4">Scan Product QR</h3>
                    <p className="text-gray-600 mb-4">
                      Scan a QR code to quickly update inventory or verify products.
                    </p>
                  </div>
                )}
                
                <div className="w-full md:w-1/2 flex justify-center">
                  <QRScanner 
                    mode={qrMode} 
                    onScan={handleQrScan}
                    data={qrData}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
