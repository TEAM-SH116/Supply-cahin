
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import {
  Box,
  DollarSign,
  PackageCheck,
  Truck,
  Search,
  ChevronRight,
  BarChart2,
  Users,
  FileText,
  MessageSquare,
  Bell,
  Download,
  LineChart,
  ShoppingCart,
} from "lucide-react";

// Sample data for distributor dashboard
const recommendedManufacturers = [
  { id: 1, name: "ABC Electronics", category: "Electronics", products: "Phones, Laptops" },
  { id: 2, name: "XYZ Technologies", category: "Electronics", products: "Tablets, Smartwatches" },
  { id: 3, name: "Smart Appliances Ltd.", category: "Home Appliances", products: "Refrigerators, Washing Machines" },
];

const inventoryItems = [
  { product: "Smartphone X1", supplier: "ABC Electronics", quantity: 1000, status: "Active" },
  { product: "Tablet T5", supplier: "XYZ Technologies", quantity: 500, status: "Active" },
  { product: "Smartwatch W2", supplier: "ABC Electronics", quantity: 300, status: "Ordered" },
  { product: "Bluetooth Speaker", supplier: "Sound Co.", quantity: 250, status: "Active" },
];

const ordersData = [
  { id: "ORD-456", counterparty: "ABC Electronics", product: "Smartphone X1", quantity: 200, status: "Confirmed" },
  { id: "ORD-457", counterparty: "Kumar Stores", product: "Smartphone X1", quantity: 50, status: "Dispatched" },
  { id: "ORD-458", counterparty: "XYZ Technologies", product: "Tablet T5", quantity: 100, status: "Pending" },
  { id: "ORD-459", counterparty: "City Electronics", product: "Smartphone X1", quantity: 75, status: "Delivered" },
];

const discountsAvailable = [
  { discount: "10%", minOrder: 200, product: "Smartphone X1", supplier: "ABC Electronics" },
  { discount: "15%", minOrder: 500, product: "Smartphone X1", supplier: "ABC Electronics" },
  { discount: "7%", minOrder: 100, product: "Tablet T5", supplier: "XYZ Technologies" },
  { discount: "12%", minOrder: 300, product: "Tablet T5", supplier: "XYZ Technologies" },
];

const retailerData = [
  { name: "Kumar Stores", contact: "anil@kumar.com", product: "Smartphone X1", quantity: 200, orders: 5, lastOrder: "10-Apr-2025" },
  { name: "City Electronics", contact: "city@email.com", product: "Smartphone X1", quantity: 150, orders: 3, lastOrder: "08-Apr-2025" },
  { name: "Digital World", contact: "digital@world.com", product: "Tablet T5", quantity: 100, orders: 4, lastOrder: "05-Apr-2025" },
];

const stocksData = [
  { product: "Smartphone X1", supplier: "ABC Electronics", total: 1000, booked: 250, dispatched: 150 },
  { product: "Tablet T5", supplier: "XYZ Technologies", total: 500, booked: 100, dispatched: 50 },
  { product: "Smartwatch W2", supplier: "ABC Electronics", total: 300, booked: 50, dispatched: 30 },
];

const messages = [
  { 
    contact: "ABC Electronics", 
    messages: [
      { sender: "ABC Electronics", content: "We have new smartphones available. Interested?", timestamp: "10:30 AM" },
      { sender: "You", content: "Yes, what's the current stock and price?", timestamp: "10:45 AM" },
      { sender: "ABC Electronics", content: "5000 units at ₹8000 each with 10% off on 200+ units", timestamp: "11:00 AM" }
    ]
  },
  { 
    contact: "Kumar Stores", 
    messages: [
      { sender: "Kumar Stores", content: "Do you have smartphone X1 in stock?", timestamp: "Yesterday" },
      { sender: "You", content: "Yes, we have 750 units available", timestamp: "Yesterday" },
      { sender: "Kumar Stores", content: "Great! I need 50 units.", timestamp: "Today" }
    ]
  }
];

export default function DistributorDashboard() {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [qrMode, setQrMode] = useState<'generate' | 'scan'>('scan');
  const [trackDiscounts, setTrackDiscounts] = useState(true);
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [selectedChat, setSelectedChat] = useState(messages[0].contact);
  const [messageInput, setMessageInput] = useState("");
  
  const userName = "Global Distribution Inc."; // In a real app, this would come from authentication
  
  useEffect(() => {
    // Check if this is the first login (would use localStorage or backend in real app)
    const hasVisitedBefore = localStorage.getItem("distributor_visited");
    if (hasVisitedBefore) {
      setShowWelcome(false);
    }
  }, []);
  
  const dismissWelcome = () => {
    localStorage.setItem("distributor_visited", "true");
    setShowWelcome(false);
  };
  
  const handleQrScan = (data: string) => {
    toast({
      title: "QR Code Scanned",
      description: `Inventory updated: ${data}`,
    });
  };

  const sendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, we would save the message to a database
      toast({
        title: "Message Sent",
        description: `Message sent to ${selectedChat}`,
      });
      setMessageInput("");
    }
  };

  const applyDiscount = (discount: string, product: string) => {
    toast({
      title: "Discount Applied",
      description: `${discount} discount applied to your cart for ${product}`,
    });
  };

  const bookDelivery = (orderId: string) => {
    navigate("/distributor/logistics", { state: { orderId } });
  };

  const viewOrderDetails = (orderId: string) => {
    // In a real app, we would fetch order details
    toast({
      title: "Order Details",
      description: `Viewing details for order ${orderId}`,
    });
  };

  const features = [
    {
      icon: Box,
      title: "Real-Time Inventory",
      description: "Track stock instantly across your warehouses",
      onClick: () => setSelectedSection("stocks")
    },
    {
      icon: DollarSign,
      title: "Dynamic Discounts",
      description: "Access volume-based discounts from manufacturers",
      onClick: () => setSelectedSection("discounts")
    },
    {
      icon: PackageCheck,
      title: "Order Placement",
      description: "Place and track orders with manufacturers",
      onClick: () => setSelectedSection("orders")
    },
    {
      icon: Truck,
      title: "Logistics Booking",
      description: "Book efficient deliveries for your inventory",
      onClick: () => setSelectedSection("logistics")
    },
  ];

  // Render the selected sidebar section content
  const renderSectionContent = () => {
    switch (selectedSection) {
      case "profile":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Distributor Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <p><span className="font-medium">Company:</span> {userName}</p>
                  <p><span className="font-medium">Contact Person:</span> Rajiv Kumar</p>
                  <p><span className="font-medium">Email:</span> rajiv@globaldist.com</p>
                  <p><span className="font-medium">Phone:</span> +91 98765 43210</p>
                  <p><span className="font-medium">Region:</span> North India</p>
                </div>
                <div className="space-y-2">
                  <p><span className="font-medium">GST Number:</span> 29ABCDE1234F1Z5</p>
                  <p><span className="font-medium">PAN Number:</span> ABCDE1234F</p>
                  <p><span className="font-medium">License Number:</span> DIST-12345</p>
                  <p><span className="font-medium">Categories:</span> Electronics, Home Appliances</p>
                  <p><span className="font-medium">Stock Capacity:</span> 10,000 units</p>
                </div>
              </div>

              <div className="flex space-x-4 mb-6">
                <Button className="nexq-button-primary">
                  Edit Profile
                </Button>
                <Button variant="outline" className="border-nexq-green text-nexq-green hover:bg-nexq-green/10">
                  Update Inventory
                </Button>
              </div>

              <h3 className="font-medium text-lg mb-2">Current Inventory</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.product}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell className="text-right">{item.quantity} units</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );
      case "orders":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Orders Management</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Accepted Today</h3>
                <p className="text-2xl font-bold">3 orders</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Delivered Today</h3>
                <p className="text-2xl font-bold">2 orders</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Dispatched</h3>
                <p className="text-2xl font-bold">5 orders</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Ready to Dispatch</h3>
                <p className="text-2xl font-bold">4 orders</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Order List</h3>
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="dispatched">Dispatched</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Counterparty</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordersData.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.counterparty}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>{order.quantity} units</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            order.status === "Confirmed" ? "bg-blue-500" :
                            order.status === "Dispatched" ? "bg-amber-500" :
                            order.status === "Delivered" ? "bg-green-500" :
                            "bg-gray-500"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => viewOrderDetails(order.id)}
                          >
                            Details
                          </Button>
                          {(order.status === "Confirmed") && (
                            <Button 
                              size="sm" 
                              className="nexq-button-primary"
                              onClick={() => bookDelivery(order.id)}
                            >
                              Book Delivery
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );
      case "products":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Product Lists</h2>
            <div className="flex justify-between items-center mb-4">
              <div>
                <Button className="nexq-button-primary mr-2">Add Product</Button>
                <Button variant="outline" className="border-nexq-green text-nexq-green hover:bg-nexq-green/10">
                  Import Products
                </Button>
              </div>
              <div className="flex items-center">
                <Button variant="ghost" className="text-nexq-purple">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.product}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>
                      <Badge 
                        className={item.status === "Active" ? "bg-green-500" : "bg-amber-500"}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-8">
              <h3 className="font-medium text-lg mb-4">Update via QR Code</h3>
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <div className="w-full sm:w-1/2">
                  <p className="text-gray-600 mb-4">
                    Scan a QR code from a manufacturer to quickly update your product list.
                    Simply point your camera at the QR code on the product packaging or
                    delivery receipt.
                  </p>
                </div>
                <div className="w-full sm:w-1/2">
                  <QRScanner mode="scan" onScan={handleQrScan} />
                </div>
              </div>
            </div>
          </div>
        );
      case "discounts":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Discount Tracker</h2>
            
            <div className="flex items-center mb-6">
              <span className="mr-3">Track Discounts:</span>
              <div 
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${trackDiscounts ? 'bg-nexq-green' : 'bg-gray-300'}`}
                onClick={() => setTrackDiscounts(!trackDiscounts)}
              >
                <div 
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${trackDiscounts ? 'translate-x-6' : 'translate-x-0'}`} 
                />
              </div>
              <span className="ml-3">{trackDiscounts ? 'On' : 'Off'}</span>
            </div>
            
            {trackDiscounts ? (
              <>
                <h3 className="font-medium text-lg mb-2">Available Discounts</h3>
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Discount</TableHead>
                        <TableHead>Min. Order</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {discountsAvailable.map((discount, index) => (
                        <TableRow key={index}>
                          <TableCell>{discount.product}</TableCell>
                          <TableCell>{discount.supplier}</TableCell>
                          <TableCell>{discount.discount}</TableCell>
                          <TableCell>{discount.minOrder} units</TableCell>
                          <TableCell>
                            <Button 
                              size="sm"
                              className="nexq-button-primary"
                              onClick={() => applyDiscount(discount.discount, discount.product)}
                            >
                              Apply Discount
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    * Discounts are automatically applied when you reach the minimum order quantity.
                  </p>
                  <p className="text-sm text-gray-500">
                    * Some discounts may have time limitations or other conditions.
                  </p>
                </div>
              </>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Discount Tracking is Disabled</h3>
                <p className="text-gray-500 mb-4">
                  Enable discount tracking to receive notifications and apply discounts automatically.
                </p>
                <Button 
                  className="nexq-button-primary"
                  onClick={() => setTrackDiscounts(true)}
                >
                  Enable Tracking
                </Button>
              </div>
            )}
          </div>
        );
      case "sales":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Sales Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2">Units Sold by Product</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Smartphone X1</span>
                    <span className="font-medium">500 units</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tablet T5</span>
                    <span className="font-medium">300 units</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Smartwatch W2</span>
                    <span className="font-medium">150 units</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2">Revenue Generated</h3>
                <p className="text-3xl font-bold text-nexq-green">₹5,00,000</p>
                <p className="text-sm text-green-600">+12% from last month</p>
                <div className="mt-4 flex justify-between text-sm text-gray-500">
                  <span>Target: ₹6,00,000</span>
                  <span>83.3% Achieved</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-nexq-green h-2 rounded-full" style={{ width: "83.3%" }}></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Monthly Sales Comparison</h3>
                <Select defaultValue="monthly">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="View By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="h-60 flex items-end justify-between">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, i) => (
                  <div key={month} className="flex flex-col items-center">
                    <div 
                      className="w-12 bg-nexq-purple rounded-t-md" 
                      style={{ 
                        height: `${[120, 180, 150, 210, 140, 190][i]}px`
                      }}
                    ></div>
                    <span className="mt-2 text-sm">{month}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Units Sold</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Growth</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Jan 2025</TableCell>
                      <TableCell>300 units</TableCell>
                      <TableCell>₹3,00,000</TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Feb 2025</TableCell>
                      <TableCell>450 units</TableCell>
                      <TableCell>₹4,50,000</TableCell>
                      <TableCell className="text-green-500">+50%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Mar 2025</TableCell>
                      <TableCell>400 units</TableCell>
                      <TableCell>₹4,20,000</TableCell>
                      <TableCell className="text-red-500">-11.1%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Apr 2025</TableCell>
                      <TableCell>500 units</TableCell>
                      <TableCell>₹5,00,000</TableCell>
                      <TableCell className="text-green-500">+19%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        );
      case "buyers":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Retail Buyers</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Total Retailers</h3>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Active Retailers</h3>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Total Orders from Retailers</h3>
                <p className="text-2xl font-bold">43</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <h3 className="font-medium mb-3">Top Retailers</h3>
              <div className="space-y-3">
                {retailerData.sort((a, b) => b.orders - a.orders).map((retailer, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-nexq-purple text-white rounded-full flex items-center justify-center mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{retailer.name}</p>
                        <p className="text-sm text-gray-500">{retailer.orders} orders</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="text-nexq-purple" onClick={() => setSelectedSection("messages")}>
                      Contact
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium mb-4">All Retailers</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Retailer Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Last Order</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {retailerData.map((retailer, index) => (
                    <TableRow key={index}>
                      <TableCell>{retailer.name}</TableCell>
                      <TableCell>{retailer.contact}</TableCell>
                      <TableCell>{retailer.product}</TableCell>
                      <TableCell>{retailer.quantity} units</TableCell>
                      <TableCell>{retailer.orders}</TableCell>
                      <TableCell>{retailer.lastOrder}</TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-nexq-purple"
                          onClick={() => setSelectedSection("messages")}
                        >
                          Contact
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );
      case "messages":
        return (
          <div className="h-[calc(100vh-12rem)]">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            
            <div className="flex h-full bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Contacts list */}
              <div className="w-1/3 border-r border-gray-200">
                <div className="p-3">
                  <Input
                    placeholder="Search contacts..."
                    className="bg-gray-50"
                  />
                </div>
                <div className="overflow-y-auto h-[calc(100%-4rem)]">
                  {messages.map((thread) => (
                    <div 
                      key={thread.contact}
                      className={`p-3 cursor-pointer hover:bg-gray-50 ${selectedChat === thread.contact ? 'bg-gray-100' : ''}`}
                      onClick={() => setSelectedChat(thread.contact)}
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-nexq-purple text-white rounded-full flex items-center justify-center mr-3">
                          {thread.contact.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{thread.contact}</p>
                          <p className="text-sm text-gray-500 truncate">
                            {thread.messages[thread.messages.length - 1].content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Chat area */}
              <div className="w-2/3 flex flex-col">
                <div className="p-3 border-b border-gray-200 flex items-center">
                  <div className="w-8 h-8 bg-nexq-purple text-white rounded-full flex items-center justify-center mr-3">
                    {selectedChat.charAt(0)}
                  </div>
                  <p className="font-medium">{selectedChat}</p>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.find(m => m.contact === selectedChat)?.messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender === 'You'
                            ? 'bg-nexq-green text-white'
                            : 'bg-gray-100'
                        }`}
                      >
                        <p>{message.content}</p>
                        <span className="text-xs opacity-70 block text-right mt-1">{message.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-3 border-t border-gray-200">
                  <div className="flex">
                    <Input
                      placeholder="Type your message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="mr-2"
                    />
                    <Button className="nexq-button-primary" onClick={sendMessage}>
                      Send
                    </Button>
                  </div>
                  <div className="flex items-center mt-2">
                    <Button variant="ghost" size="sm" className="text-nexq-purple">
                      <FileText className="w-4 h-4 mr-2" />
                      Attach File
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "stocks":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Stocks Management</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Total Stock</h3>
                <p className="text-2xl font-bold">1,800 units</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Booked</h3>
                <p className="text-2xl font-bold">400 units</p>
                <p className="text-sm text-gray-500">22.2% of total</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Dispatched</h3>
                <p className="text-2xl font-bold">230 units</p>
                <p className="text-sm text-gray-500">12.7% of total</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Booked</TableHead>
                    <TableHead>Dispatched</TableHead>
                    <TableHead>Available</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stocksData.map((stock, index) => (
                    <TableRow key={index}>
                      <TableCell>{stock.product}</TableCell>
                      <TableCell>{stock.supplier}</TableCell>
                      <TableCell>{stock.total} units</TableCell>
                      <TableCell>{stock.booked} units</TableCell>
                      <TableCell>{stock.dispatched} units</TableCell>
                      <TableCell>{stock.total - stock.booked} units</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium mb-4">Update Stock via QR Code</h3>
                <QRScanner mode="scan" onScan={handleQrScan} />
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium mb-4">Manual Stock Update</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Product</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {stocksData.map((stock, index) => (
                          <SelectItem key={index} value={stock.product}>
                            {stock.product}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Operation</label>
                    <Select defaultValue="add">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="add">Add Stock</SelectItem>
                        <SelectItem value="remove">Remove Stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Quantity</label>
                    <Input type="number" placeholder="Enter quantity" min="1" />
                  </div>
                  <Button className="nexq-button-primary w-full">Update Stock</Button>
                </div>
              </div>
            </div>
          </div>
        );
      case "logistics":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">NexQ Logistics</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-4">Book Delivery</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Products</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {stocksData.map((stock, index) => (
                          <SelectItem key={index} value={stock.product}>
                            {stock.product}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Quantity</label>
                    <Input type="number" placeholder="Enter quantity" min="1" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Destination</label>
                    <Input placeholder="Enter delivery address" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Delivery Type</label>
                    <Select defaultValue="standard">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="sameday">Same Day</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Delivery Cost Estimation</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Distance-based (50km):</span>
                      <span className="font-medium">₹300</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Self-Pickup:</span>
                      <span className="font-medium">₹0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>NexQ Logistics (Same Day):</span>
                      <span className="font-medium">₹300</span>
                    </div>
                    <div className="flex justify-between">
                      <span>NexQ Logistics (Emergency):</span>
                      <span className="font-medium">₹600</span>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex justify-between font-medium">
                        <span>Best Option:</span>
                        <span className="text-nexq-green">NexQ Logistics (Same Day)</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button className="nexq-button-primary w-full">
                      Book Delivery
                    </Button>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Estimated delivery time: 4-6 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium mb-4">Active Deliveries</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tracking ID</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Estimated Delivery</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>NEX-12345</TableCell>
                    <TableCell>Smartphone X1 (50 units)</TableCell>
                    <TableCell>Kumar Stores, Delhi</TableCell>
                    <TableCell>
                      <Badge className="bg-amber-500">In Transit</Badge>
                    </TableCell>
                    <TableCell>Today, 6:00 PM</TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost" className="text-nexq-purple">
                        Track
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>NEX-12346</TableCell>
                    <TableCell>Tablet T5 (25 units)</TableCell>
                    <TableCell>City Electronics, Mumbai</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Out for Delivery</Badge>
                    </TableCell>
                    <TableCell>Today, 3:30 PM</TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost" className="text-nexq-purple">
                        Track
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        );
      case "customer-service":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Customer Service</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <MessageSquare className="h-10 w-10 mx-auto text-nexq-green mb-3" />
                <h3 className="font-medium text-lg mb-2">Chat Support</h3>
                <p className="text-gray-500 mb-4">Get instant answers from our AI assistant or chat with our support team.</p>
                <Button className="nexq-button-primary">Start Chat</Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <FileText className="h-10 w-10 mx-auto text-nexq-green mb-3" />
                <h3 className="font-medium text-lg mb-2">Email Support</h3>
                <p className="text-gray-500 mb-4">Send us an email and we'll get back to you within 24 hours.</p>
                <p className="font-medium">support@nexq.com</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <Bell className="h-10 w-10 mx-auto text-nexq-green mb-3" />
                <h3 className="font-medium text-lg mb-2">Phone Support</h3>
                <p className="text-gray-500 mb-4">Call our customer service line for urgent assistance.</p>
                <p className="font-medium">1800-123-4567</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-4">Frequently Asked Questions</h3>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-md p-4">
                  <h4 className="font-medium mb-2">How do I apply discounts to my orders?</h4>
                  <p className="text-gray-600">
                    Discounts are automatically applied when you reach the minimum order quantity. You can also manually apply discounts from the Discount Tracker section.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-md p-4">
                  <h4 className="font-medium mb-2">How does the QR scanning work?</h4>
                  <p className="text-gray-600">
                    You can scan QR codes from manufacturers to quickly update your inventory. Simply point your camera at the QR code on the product packaging or delivery receipt.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-md p-4">
                  <h4 className="font-medium mb-2">How can I track my deliveries?</h4>
                  <p className="text-gray-600">
                    You can track your deliveries from the NexQ Logistics section. Simply click on the "Track" button next to the delivery you want to track.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-md p-4">
                  <h4 className="font-medium mb-2">What are the payment terms?</h4>
                  <p className="text-gray-600">
                    We offer various payment terms including advance payment, credit (30/60/90 days), and COD. Contact our support team to discuss options that work best for your business.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-gray-500 mb-2">
                  Can't find what you're looking for?
                </p>
                <Button className="nexq-button-primary">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        );
      default: // dashboard is the default
        return (
          <div className="space-y-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-nexq-green">Hello, {userName}!</h1>
              <p className="text-gray-600">Welcome to your distributor dashboard.</p>
            </div>
            
            {/* Search bar */}
            <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
              <div className="mb-4">
                <h2 className="text-lg font-medium mb-2">Find Manufacturers & Products</h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    placeholder="Search manufacturers or products..."
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
                <Button className="nexq-button-primary">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>
            
            {/* Recommendations */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Recommended Manufacturers</h2>
                <Button variant="link" className="text-nexq-purple">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedManufacturers.map((manufacturer) => (
                  <motion.div
                    key={manufacturer.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{manufacturer.name}</h3>
                        <p className="text-sm text-gray-500">{manufacturer.category}</p>
                        <p className="text-sm mt-2">Products: {manufacturer.products}</p>
                      </div>
                      <Badge className="bg-nexq-purple">{manufacturer.category}</Badge>
                    </div>
                    <Button variant="outline" className="mt-4 w-full border-nexq-green text-nexq-green hover:bg-nexq-green/10">
                      View Profile
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
                    <h3 className="text-lg font-medium mb-4">Update Inventory with QR</h3>
                    <p className="text-gray-600 mb-4">
                      Scan QR codes from manufacturers to quickly update your inventory.
                      Simply point your camera at the QR code on the product packaging or
                      delivery receipt.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-gray-500 text-sm">
                        <Box size={16} />
                        <span>Last scan: Smartphone X1, Qty: 200, 2 hours ago</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/2 flex justify-center">
                    <QRScanner mode={qrMode} onScan={handleQrScan} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn userName={userName} userRole="distributor" />
      
      <div className="pt-16 flex">
        <Sidebar userName={userName} userRole="distributor" />
        
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
                    Thank you for joining NexQ. We're excited to help you source products
                    efficiently and connect with manufacturers and retailers.
                  </p>
                  <Button onClick={dismissWelcome} className="nexq-button-primary w-full">
                    Explore Now
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Render the selected section content */}
          {renderSectionContent()}
        </main>
      </div>
    </div>
  );
}
