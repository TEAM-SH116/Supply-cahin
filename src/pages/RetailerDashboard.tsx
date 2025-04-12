
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
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import {
  Box,
  DollarSign,
  QrCode,
  Truck,
  Search,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";

// Sample data
const recommendedProducts = [
  { id: 1, name: "Smartphone X1", price: "₹450", category: "Electronics", supplier: "ABC Electronics" },
  { id: 2, name: "Wireless Earbuds", price: "₹199", category: "Electronics", supplier: "XYZ Technologies" },
  { id: 3, name: "Power Bank 10000mAh", price: "₹350", category: "Electronics", supplier: "PowerTech Ltd." },
];

export default function RetailerDashboard() {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [supplierType, setSupplierType] = useState("");
  const [qrMode, setQrMode] = useState<'generate' | 'scan'>('scan');
  
  const userName = "City Electronics Store"; // In a real app, this would come from authentication
  
  useEffect(() => {
    // Check if this is the first login (would use localStorage or backend in real app)
    const hasVisitedBefore = localStorage.getItem("retailer_visited");
    if (hasVisitedBefore) {
      setShowWelcome(false);
    }
  }, []);
  
  const dismissWelcome = () => {
    localStorage.setItem("retailer_visited", "true");
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
      icon: ShoppingCart,
      title: "Easy Ordering",
      description: "Place orders with wholesalers and distributors",
      onClick: () => navigate("/retailer/ordering")
    },
    {
      icon: DollarSign,
      title: "Dynamic Discounts",
      description: "Access available discounts from suppliers",
      onClick: () => navigate("/retailer/discounts")
    },
    {
      icon: QrCode,
      title: "QR Inventory",
      description: "Manage inventory with simple QR scanning",
      onClick: () => navigate("/retailer/inventory")
    },
    {
      icon: Truck,
      title: "Fast Logistics",
      description: "Get same-day or emergency deliveries",
      onClick: () => navigate("/retailer/logistics")
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn userName={userName} userRole="retailer" />
      
      <div className="pt-16 flex">
        <Sidebar userName={userName} userRole="retailer" />
        
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
                    Thank you for joining NexQ. We're excited to help you source products,
                    manage inventory, and grow your retail business.
                  </p>
                  <Button onClick={dismissWelcome} className="nexq-button-primary w-full">
                    Start Shopping
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Dashboard content */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-nexq-green">Hello, {userName}!</h1>
            <p className="text-gray-600">Welcome to your retailer dashboard.</p>
          </div>
          
          {/* Search bar */}
          <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-medium mb-2">Find Products & Suppliers</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Search products or suppliers..."
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
                      <SelectItem value="wholesaler">Wholesaler</SelectItem>
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
                      <p className="text-sm text-gray-500">Supplier: {product.supplier}</p>
                      <p className="text-nexq-green font-medium mt-2">{product.price}</p>
                    </div>
                    <Badge className="bg-nexq-purple">{product.category}</Badge>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button className="flex-1 nexq-button-primary">Add to Cart</Button>
                    <Button variant="outline" className="flex-1 border-nexq-green text-nexq-green hover:bg-nexq-green/10">
                      Details
                    </Button>
                  </div>
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
          
          {/* Discounts Available */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Discounts Available</h2>
              <Button variant="link" className="text-nexq-purple">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-nexq-green/20 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <DollarSign className="h-12 w-12 text-nexq-green mb-2" />
                      <h3 className="font-semibold">10% off</h3>
                      <p className="text-sm text-gray-500">On orders of 50+ units</p>
                      <p className="text-sm font-medium mt-1">Smartphones X1</p>
                      <Button variant="link" className="mt-2 text-nexq-purple p-0">
                        Shop Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-nexq-green/20 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <DollarSign className="h-12 w-12 text-nexq-green mb-2" />
                      <h3 className="font-semibold">15% off</h3>
                      <p className="text-sm text-gray-500">On orders of 30+ units</p>
                      <p className="text-sm font-medium mt-1">Wireless Earbuds</p>
                      <Button variant="link" className="mt-2 text-nexq-purple p-0">
                        Shop Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-nexq-green/20 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <DollarSign className="h-12 w-12 text-nexq-green mb-2" />
                      <h3 className="font-semibold">20% off</h3>
                      <p className="text-sm text-gray-500">On orders of 25+ units</p>
                      <p className="text-sm font-medium mt-1">Power Banks</p>
                      <Button variant="link" className="mt-2 text-nexq-purple p-0">
                        Shop Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
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
                  <h3 className="text-lg font-medium mb-4">Update Store Inventory</h3>
                  <p className="text-gray-600 mb-4">
                    Scan QR codes from your shipments to quickly update your store inventory.
                    Track what's in stock and get alerts when inventory is running low.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-gray-500 text-sm">
                      <Box size={16} />
                      <span>Last scan: Wireless Earbuds, Qty: 50, 1 hour ago</span>
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
