
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import FeatureCard from "@/components/FeatureCard";
import { 
  Box, Truck, QrCode, Clock, Route, BarChart2, 
  ChevronRight, Info, Phone, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const features = [
  {
    icon: Box,
    title: "Real-Time Inventory",
    description: "Track stock instantly across multiple warehouses"
  },
  {
    icon: BarChart2,
    title: "Dynamic Discounts",
    description: "Boost sales with volume-based discount automation"
  },
  {
    icon: QrCode,
    title: "QR Scanning",
    description: "Simplify inventory management with QR codes"
  },
  {
    icon: Clock,
    title: "Emergency Delivery",
    description: "Urgent delivery when you need it most"
  },
  {
    icon: Route,
    title: "Route Optimization",
    description: "Save costs with AI-powered logistics routes"
  },
  {
    icon: BarChart2,
    title: "Analytics Dashboard",
    description: "Gain insights with comprehensive data visualization"
  }
];

export default function Index() {
  const navigate = useNavigate();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <motion.section 
        className="pt-24 pb-12 md:pt-32 md:pb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Welcome to <span className="nexq-gradient-text">NexQ</span>
                </h1>
                <h2 className="text-xl md:text-2xl font-medium text-nexq-purple mb-4">
                  Supply Chain 2.0
                </h2>
                <p className="text-gray-600 mb-6 max-w-lg">
                  Streamline your supply chain with real-time inventory, dynamic discounts, and smart logistics. 
                  NexQ connects Manufacturers, Distributors, Wholesalers, and Retailers.
                </p>
                <Button 
                  className="nexq-button-primary mr-4"
                  onClick={() => navigate('/profile')}
                >
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-nexq-purple text-nexq-purple hover:bg-nexq-purple/10"
                  onClick={() => {
                    const featuresSection = document.getElementById('features');
                    featuresSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Learn More
                </Button>
              </motion.div>
            </div>
            
            <div className="w-full md:w-1/2">
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Replace with your main illustration */}
                <div className="relative">
                  <div className="w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-nexq-green to-nexq-purple rounded-full opacity-20 absolute top-0 left-0 transform -translate-x-1/4 -translate-y-1/4"></div>
                  <img 
                    src="/lovable-uploads/a8207828-3432-4a1f-beea-9b8855055682.png" 
                    alt="NexQ Logo" 
                    className="w-64 md:w-80 relative z-10" 
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-2">
              Our <span className="nexq-gradient-text">Features</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transform your supply chain with our comprehensive suite of tools designed for Indian SMEs.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <FeatureCard 
                  icon={feature.icon} 
                  title={feature.title} 
                  description={feature.description}
                  onClick={() => navigate('/profile')}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-2">
              Our <span className="nexq-gradient-text">Services</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive services tailored to meet the needs of your business.
            </p>
          </motion.div>
          
          <Tabs defaultValue="supply-chain" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="supply-chain">Supply Chain</TabsTrigger>
              <TabsTrigger value="logistics">Logistics</TabsTrigger>
            </TabsList>
            <TabsContent value="supply-chain" className="border rounded-lg p-6">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-full md:w-1/2">
                  <h3 className="text-xl font-bold mb-4">Supply Chain Management</h3>
                  <p className="text-gray-600 mb-4">
                    NexQ provides end-to-end supply chain solutions that connect manufacturers, 
                    distributors, wholesalers, and retailers in a seamless ecosystem.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="mr-2 text-nexq-green">✓</div>
                      <span>Real-time inventory tracking</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 text-nexq-green">✓</div>
                      <span>Dynamic pricing and discounts</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 text-nexq-green">✓</div>
                      <span>Automated order processing</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 text-nexq-green">✓</div>
                      <span>QR code inventory management</span>
                    </li>
                  </ul>
                  <Button className="nexq-button-primary mt-6" onClick={() => navigate('/profile')}>
                    Get Started
                  </Button>
                </div>
                <div className="w-full md:w-1/2 flex justify-center items-center">
                  {/* Supply Chain illustration/image placeholder */}
                  <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Box size={64} className="text-nexq-green opacity-50" />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="logistics" className="border rounded-lg p-6">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-full md:w-1/2">
                  <h3 className="text-xl font-bold mb-4">Smart Logistics Solutions</h3>
                  <p className="text-gray-600 mb-4">
                    Optimize your delivery operations with NexQ's advanced logistics solutions
                    designed for efficiency and reliability.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="mr-2 text-nexq-green">✓</div>
                      <span>Route optimization with AI</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 text-nexq-green">✓</div>
                      <span>Same-day and emergency delivery</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 text-nexq-green">✓</div>
                      <span>Real-time shipment tracking</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 text-nexq-green">✓</div>
                      <span>Cost-effective transportation</span>
                    </li>
                  </ul>
                  <Button className="nexq-button-primary mt-6" onClick={() => navigate('/profile')}>
                    Learn More
                  </Button>
                </div>
                <div className="w-full md:w-1/2 flex justify-center items-center">
                  {/* Logistics illustration/image placeholder */}
                  <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Truck size={64} className="text-nexq-green opacity-50" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-6 mb-4">
            <a href="#" className="text-gray-500 hover:text-nexq-green">
              <Info size={18} />
            </a>
            <a href="#" className="text-gray-500 hover:text-nexq-green">
              <Phone size={18} />
            </a>
            <a href="#" className="text-gray-500 hover:text-nexq-green">
              <FileText size={18} />
            </a>
          </div>
          <div className="text-sm text-gray-500">
            <a href="#" className="mx-2 hover:text-nexq-purple">About Us</a>
            <a href="#" className="mx-2 hover:text-nexq-purple">Contact</a>
            <a href="#" className="mx-2 hover:text-nexq-purple">Terms</a>
          </div>
          <div className="mt-4 text-xs text-gray-400">
            © 2025 NexQ. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
