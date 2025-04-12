
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
}

export default function FeatureCard({ icon: Icon, title, description, onClick }: FeatureCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="feature-card cursor-pointer"
      onClick={onClick}
    >
      <div className="mb-4 p-3 bg-accent rounded-full">
        <Icon size={24} className="text-nexq-green" />
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </motion.div>
  );
}
