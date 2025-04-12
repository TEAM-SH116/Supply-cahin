import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { User, Factory, Truck, Store, ShoppingBag } from "lucide-react";

type UserRole = "manufacturer" | "distributor" | "wholesaler" | "retailer";

interface RoleOption {
  id: UserRole;
  label: string;
  icon: any;
}

const roleOptions: RoleOption[] = [
  { id: "manufacturer", label: "Manufacturer", icon: Factory },
  { id: "distributor", label: "Distributor", icon: Truck },
  { id: "wholesaler", label: "Wholesaler", icon: ShoppingBag },
  { id: "retailer", label: "Retailer", icon: Store },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState<UserRole | null>(null);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  
  // Form state for each role type
  const [manufacturerForm, setManufacturerForm] = useState({
    companyName: "",
    companyType: "",
    contactPerson: "",
    email: "",
    phone: "",
    productTypes: "",
    categories: [],
    licenseNumber: "",
    gstNumber: "",
    panNumber: "",
    location: "",
    capacity: "",
    moq: "",
    paymentTerms: "",
    useQr: false,
    agreeToTerms: false,
  });
  
  const [distributorForm, setDistributorForm] = useState({
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    region: "",
    address: "",
    gstNumber: "",
    panNumber: "",
    licenseNumber: "",
    categories: [],
    capacity: "",
    moq: "",
    paymentTerms: "",
    useQr: false,
    agreeToTerms: false,
  });
  
  // Similar structure for wholesaler and retailer forms
  // For brevity, I'm using the same structure as distributor
  const [wholesalerForm, setWholesalerForm] = useState({ ...distributorForm });
  const [retailerForm, setRetailerForm] = useState({ ...distributorForm });
  
  const handleRoleClick = (role: UserRole) => {
    setActiveRole(role);
  };
  
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      // Simple validation
      if (!loginForm.email || !loginForm.password) {
        toast({
          title: "Error",
          description: "Please fill all required fields",
          variant: "destructive",
        });
        return;
      }
      
      // Success toast and redirect
      toast({
        title: "Login Successful",
        description: `Welcome back to NexQ!`,
      });
      
      if (activeRole) {
        navigate(`/${activeRole}/dashboard`);
      }
    }, 1000);
  };
  
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      let formValid = false;
      let formData: any = {};
      
      // Validate form based on role
      switch(activeRole) {
        case "manufacturer":
          formData = manufacturerForm;
          formValid = !!formData.companyName && !!formData.email && formData.agreeToTerms;
          break;
        case "distributor":
          formData = distributorForm;
          formValid = !!formData.name && !!formData.email && formData.agreeToTerms;
          break;
        case "wholesaler":
          formData = wholesalerForm;
          formValid = !!formData.name && !!formData.email && formData.agreeToTerms;
          break;
        case "retailer":
          formData = retailerForm;
          formValid = !!formData.name && !!formData.email && formData.agreeToTerms;
          break;
        default:
          formValid = false;
      }
      
      if (!formValid) {
        toast({
          title: "Error",
          description: "Please fill all required fields and agree to terms",
          variant: "destructive",
        });
        return;
      }
      
      // Success toast and redirect
      toast({
        title: "Registration Successful",
        description: `Welcome to NexQ! Your ${activeRole} account has been created.`,
      });
      
      if (activeRole) {
        navigate(`/${activeRole}/dashboard`);
      }
    }, 1000);
  };
  
  const handleUpdateLoginForm = (field: string, value: any) => {
    setLoginForm(prev => ({ ...prev, [field]: value }));
  };
  
  const renderForm = () => {
    if (!activeRole) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-500">Select a role to register or sign in</p>
        </div>
      );
    }
    
    if (isLogin) {
      return (
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold mb-6">Sign In as {roleToTitle(activeRole)}</h2>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email ID</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={loginForm.email}
              onChange={(e) => handleUpdateLoginForm("email", e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={loginForm.password}
              onChange={(e) => handleUpdateLoginForm("password", e.target.value)}
              required
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={loginForm.rememberMe}
                onCheckedChange={(checked) => 
                  handleUpdateLoginForm("rememberMe", checked === true)
                }
              />
              <Label htmlFor="rememberMe" className="text-sm">Remember Me</Label>
            </div>
            <a href="#" className="text-sm text-nexq-purple hover:underline">
              Forgot Password?
            </a>
          </div>
          
          <Button
            type="submit"
            className="nexq-button-primary w-full"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
          
          <p className="text-sm text-center text-gray-500">
            New to NexQ?{" "}
            <button
              type="button"
              className="text-nexq-purple hover:underline"
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </p>
        </form>
      );
    }
    
    // Role-specific registration forms
    switch(activeRole) {
      case "manufacturer":
        return renderManufacturerForm();
      case "distributor":
        return renderDistributorForm();
      case "wholesaler":
        return renderWholesalerForm();
      case "retailer":
        return renderRetailerForm();
      default:
        return null;
    }
  };
  
  const renderManufacturerForm = () => {
    return (
      <form onSubmit={handleRegisterSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold mb-6">Register as Manufacturer</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name*</Label>
            <Input
              id="companyName"
              placeholder="Your Company Name"
              value={manufacturerForm.companyName}
              onChange={(e) => setManufacturerForm({...manufacturerForm, companyName: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyType">Type of Company*</Label>
            <Select
              onValueChange={(value) => setManufacturerForm({...manufacturerForm, companyType: value})}
              value={manufacturerForm.companyType}
            >
              <SelectTrigger id="companyType">
                <SelectValue placeholder="Select company type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="sole_proprietorship">Sole Proprietorship</SelectItem>
                  <SelectItem value="pvt_ltd">Private Limited</SelectItem>
                  <SelectItem value="llp">Limited Liability Partnership (LLP)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactPerson">Contact Person*</Label>
            <Input
              id="contactPerson"
              placeholder="Full Name"
              value={manufacturerForm.contactPerson}
              onChange={(e) => setManufacturerForm({...manufacturerForm, contactPerson: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email*</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={manufacturerForm.email}
              onChange={(e) => setManufacturerForm({...manufacturerForm, email: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone*</Label>
            <Input
              id="phone"
              placeholder="10-digit number"
              value={manufacturerForm.phone}
              onChange={(e) => setManufacturerForm({...manufacturerForm, phone: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="productTypes">Number of Product Types*</Label>
            <Select
              onValueChange={(value) => setManufacturerForm({...manufacturerForm, productTypes: value})}
              value={manufacturerForm.productTypes}
            >
              <SelectTrigger id="productTypes">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1-5">1-5</SelectItem>
                  <SelectItem value="6-10">6-10</SelectItem>
                  <SelectItem value="20+">20+</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="gstNumber">GST Number*</Label>
            <Input
              id="gstNumber"
              placeholder="15-digit GST Number"
              value={manufacturerForm.gstNumber}
              onChange={(e) => setManufacturerForm({...manufacturerForm, gstNumber: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="panNumber">PAN Number*</Label>
            <Input
              id="panNumber"
              placeholder="10-digit PAN Number"
              value={manufacturerForm.panNumber}
              onChange={(e) => setManufacturerForm({...manufacturerForm, panNumber: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="licenseNumber">License Number*</Label>
            <Input
              id="licenseNumber"
              placeholder="License Number"
              value={manufacturerForm.licenseNumber}
              onChange={(e) => setManufacturerForm({...manufacturerForm, licenseNumber: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Manufacturing Location*</Label>
            <Input
              id="location"
              placeholder="City, State"
              value={manufacturerForm.location}
              onChange={(e) => setManufacturerForm({...manufacturerForm, location: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="capacity">Production Capacity*</Label>
            <Input
              id="capacity"
              placeholder="e.g., 10,000 units/month"
              value={manufacturerForm.capacity}
              onChange={(e) => setManufacturerForm({...manufacturerForm, capacity: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="moq">Minimum Order Quantity (MOQ)*</Label>
            <Input
              id="moq"
              placeholder="e.g., 1000"
              value={manufacturerForm.moq}
              onChange={(e) => setManufacturerForm({...manufacturerForm, moq: e.target.value})}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="paymentTerms">Payment Terms*</Label>
          <Select
            onValueChange={(value) => setManufacturerForm({...manufacturerForm, paymentTerms: value})}
            value={manufacturerForm.paymentTerms}
          >
            <SelectTrigger id="paymentTerms">
              <SelectValue placeholder="Select payment terms" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="advance">Advance</SelectItem>
                <SelectItem value="credit_30">Credit 30 Days</SelectItem>
                <SelectItem value="cod">Cash on Delivery (COD)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="useQr"
            checked={manufacturerForm.useQr}
            onCheckedChange={(checked) => 
              setManufacturerForm({...manufacturerForm, useQr: checked === true})
            }
          />
          <Label htmlFor="useQr">Use QR code for inventory tracking</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="agreeToTerms"
            checked={manufacturerForm.agreeToTerms}
            onCheckedChange={(checked) => 
              setManufacturerForm({...manufacturerForm, agreeToTerms: checked === true})
            }
            required
          />
          <Label htmlFor="agreeToTerms" className="text-sm">
            I agree to NexQ's <a href="#" className="text-nexq-purple hover:underline">Terms of Service</a> and <a href="#" className="text-nexq-purple hover:underline">Privacy Policy</a>
          </Label>
        </div>
        
        <Button
          type="submit"
          className="nexq-button-primary w-full"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register as Manufacturer"}
        </Button>
        
        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <button
            type="button"
            className="text-nexq-purple hover:underline"
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
        </p>
      </form>
    );
  };
  
  // Similar forms for other roles
  const renderDistributorForm = () => {
    return (
      <form onSubmit={handleRegisterSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold mb-6">Register as Distributor</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Distributor Name*</Label>
            <Input
              id="name"
              placeholder="Your Business Name"
              value={distributorForm.name}
              onChange={(e) => setDistributorForm({...distributorForm, name: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactPerson">Contact Person*</Label>
            <Input
              id="contactPerson"
              placeholder="Full Name"
              value={distributorForm.contactPerson}
              onChange={(e) => setDistributorForm({...distributorForm, contactPerson: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone*</Label>
            <Input
              id="phone"
              placeholder="10-digit number"
              value={distributorForm.phone}
              onChange={(e) => setDistributorForm({...distributorForm, phone: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email*</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={distributorForm.email}
              onChange={(e) => setDistributorForm({...distributorForm, email: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="region">Region*</Label>
            <Select
              onValueChange={(value) => setDistributorForm({...distributorForm, region: value})}
              value={distributorForm.region}
            >
              <SelectTrigger id="region">
                <SelectValue placeholder="Select region" />
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
          
          <div className="space-y-2">
            <Label htmlFor="address">Address*</Label>
            <Input
              id="address"
              placeholder="Street, City, State, PIN"
              value={distributorForm.address}
              onChange={(e) => setDistributorForm({...distributorForm, address: e.target.value})}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="gstNumber">GST Number*</Label>
            <Input
              id="gstNumber"
              placeholder="15-digit GST Number"
              value={distributorForm.gstNumber}
              onChange={(e) => setDistributorForm({...distributorForm, gstNumber: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="panNumber">PAN Number*</Label>
            <Input
              id="panNumber"
              placeholder="10-digit PAN Number"
              value={distributorForm.panNumber}
              onChange={(e) => setDistributorForm({...distributorForm, panNumber: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="capacity">Stock Capacity*</Label>
            <Input
              id="capacity"
              placeholder="e.g., 1000 units"
              value={distributorForm.capacity}
              onChange={(e) => setDistributorForm({...distributorForm, capacity: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="moq">MOQ Accepted*</Label>
            <Input
              id="moq"
              placeholder="e.g., 100"
              value={distributorForm.moq}
              onChange={(e) => setDistributorForm({...distributorForm, moq: e.target.value})}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="paymentTerms">Payment Terms*</Label>
          <Select
            onValueChange={(value) => setDistributorForm({...distributorForm, paymentTerms: value})}
            value={distributorForm.paymentTerms}
          >
            <SelectTrigger id="paymentTerms">
              <SelectValue placeholder="Select payment terms" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="advance">Advance</SelectItem>
                <SelectItem value="credit_30">Credit 30 Days</SelectItem>
                <SelectItem value="cod">Cash on Delivery (COD)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="useQr"
            checked={distributorForm.useQr}
            onCheckedChange={(checked) => 
              setDistributorForm({...distributorForm, useQr: checked === true})
            }
          />
          <Label htmlFor="useQr">Use QR code for inventory tracking</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="agreeToTerms"
            checked={distributorForm.agreeToTerms}
            onCheckedChange={(checked) => 
              setDistributorForm({...distributorForm, agreeToTerms: checked === true})
            }
            required
          />
          <Label htmlFor="agreeToTerms" className="text-sm">
            I agree to NexQ's <a href="#" className="text-nexq-purple hover:underline">Terms of Service</a> and <a href="#" className="text-nexq-purple hover:underline">Privacy Policy</a>
          </Label>
        </div>
        
        <Button
          type="submit"
          className="nexq-button-primary w-full"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register as Distributor"}
        </Button>
        
        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <button
            type="button"
            className="text-nexq-purple hover:underline"
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
        </p>
      </form>
    );
  };
  
  const renderWholesalerForm = () => {
    // For brevity, reusing distributor form structure
    return (
      <form onSubmit={handleRegisterSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold mb-6">Register as Wholesaler</h2>
        
        {/* Similar fields as distributor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Wholesaler Name*</Label>
            <Input
              id="name"
              placeholder="Your Business Name"
              value={wholesalerForm.name}
              onChange={(e) => setWholesalerForm({...wholesalerForm, name: e.target.value})}
              required
            />
          </div>
          
          {/* Other fields similar to distributor */}
          <div className="space-y-2">
            <Label htmlFor="contactPerson">Contact Person*</Label>
            <Input
              id="contactPerson"
              placeholder="Full Name"
              value={wholesalerForm.contactPerson}
              onChange={(e) => setWholesalerForm({...wholesalerForm, contactPerson: e.target.value})}
              required
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="agreeToTerms"
            checked={wholesalerForm.agreeToTerms}
            onCheckedChange={(checked) => 
              setWholesalerForm({...wholesalerForm, agreeToTerms: checked === true})
            }
            required
          />
          <Label htmlFor="agreeToTerms" className="text-sm">
            I agree to NexQ's <a href="#" className="text-nexq-purple hover:underline">Terms of Service</a> and <a href="#" className="text-nexq-purple hover:underline">Privacy Policy</a>
          </Label>
        </div>
        
        <Button
          type="submit"
          className="nexq-button-primary w-full"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register as Wholesaler"}
        </Button>
        
        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <button
            type="button"
            className="text-nexq-purple hover:underline"
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
        </p>
      </form>
    );
  };
  
  const renderRetailerForm = () => {
    // For brevity, reusing distributor form structure
    return (
      <form onSubmit={handleRegisterSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold mb-6">Register as Retailer</h2>
        
        {/* Similar fields as distributor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Retailer Name*</Label>
            <Input
              id="name"
              placeholder="Your Business Name"
              value={retailerForm.name}
              onChange={(e) => setRetailerForm({...retailerForm, name: e.target.value})}
              required
            />
          </div>
          
          {/* Other fields similar to distributor */}
          <div className="space-y-2">
            <Label htmlFor="contactPerson">Contact Person*</Label>
            <Input
              id="contactPerson"
              placeholder="Full Name"
              value={retailerForm.contactPerson}
              onChange={(e) => setRetailerForm({...retailerForm, contactPerson: e.target.value})}
              required
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="agreeToTerms"
            checked={retailerForm.agreeToTerms}
            onCheckedChange={(checked) => 
              setRetailerForm({...retailerForm, agreeToTerms: checked === true})
            }
            required
          />
          <Label htmlFor="agreeToTerms" className="text-sm">
            I agree to NexQ's <a href="#" className="text-nexq-purple hover:underline">Terms of Service</a> and <a href="#" className="text-nexq-purple hover:underline">Privacy Policy</a>
          </Label>
        </div>
        
        <Button
          type="submit"
          className="nexq-button-primary w-full"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register as Retailer"}
        </Button>
        
        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <button
            type="button"
            className="text-nexq-purple hover:underline"
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
        </p>
      </form>
    );
  };
  
  const roleToTitle = (role: UserRole) => {
    const roleMap: Record<UserRole, string> = {
      manufacturer: "Manufacturer",
      distributor: "Distributor",
      wholesaler: "Wholesaler",
      retailer: "Retailer",
    };
    
    return roleMap[role];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Left side */}
          <div className="w-full lg:w-1/2 p-8 bg-gradient-to-br from-nexq-green to-nexq-purple">
            <h1 className="text-3xl font-bold text-white mb-8">Join NexQ</h1>
            
            <div className="space-y-4">
              {roleOptions.map((role) => {
                const Icon = role.icon;
                return (
                  <div key={role.id} className="flex items-center">
                    <motion.button
                      className={`flex-1 p-4 flex items-center rounded-l-md ${
                        activeRole === role.id 
                          ? "bg-white text-gray-800" 
                          : "bg-white/20 text-white"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleRoleClick(role.id)}
                    >
                      <Icon className="mr-2" size={20} />
                      <span>{role.label}</span>
                    </motion.button>
                    
                    {activeRole === role.id && (
                      <div className="p-2 rounded-r-md bg-white flex items-center">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Register</span>
                          <Switch
                            checked={isLogin}
                            onCheckedChange={() => setIsLogin(!isLogin)}
                          />
                          <span className="text-sm text-gray-600">Login</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-12">
              <h3 className="text-xl font-medium text-white mb-4">Why Join NexQ?</h3>
              <ul className="space-y-2 text-white/90">
                <li className="flex items-start">
                  <div className="mr-2">✓</div>
                  <span>Real-time stock management across your supply chain</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2">✓</div>
                  <span>Fast deliveries with optimized logistics</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2">✓</div>
                  <span>Smart discounts to drive growth</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2">✓</div>
                  <span>Connect directly with partners in the supply chain</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Right side */}
          <div className="w-full lg:w-1/2 p-8">
            {renderForm()}
          </div>
        </div>
      </div>
    </div>
  );
}
