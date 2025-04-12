
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Scan, Download } from "lucide-react";

interface QRScannerProps {
  mode: 'generate' | 'scan';
  onScan?: (data: string) => void;
  data?: string;
}

export default function QRScanner({ mode, onScan, data = 'https://nexq.app' }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  
  // In a real app, we'd use a library like react-qr-reader
  // For this demo, we'll simulate scanning
  const startScanning = () => {
    setIsScanning(true);
    // Simulate successful scan after 2 seconds
    setTimeout(() => {
      setIsScanning(false);
      if (onScan) {
        onScan("PRODUCT_123_QTY_100");
      }
    }, 2000);
  };
  
  const downloadQR = () => {
    const canvas = document.getElementById('qr-code') as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'nexq-qrcode.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-white">
      {mode === 'generate' ? (
        <>
          <h3 className="text-lg font-medium mb-4">QR Code Generator</h3>
          <div className="mb-4">
            <QRCodeSVG 
              id="qr-code"
              value={data}
              size={200}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"L"}
              includeMargin={false}
            />
          </div>
          <Button 
            variant="default" 
            className="nexq-button-primary flex items-center"
            onClick={downloadQR}
          >
            <Download className="mr-2 h-4 w-4" />
            Download QR Code
          </Button>
        </>
      ) : (
        <>
          <h3 className="text-lg font-medium mb-4">QR Code Scanner</h3>
          {isScanning ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative w-64 h-64 border-2 border-gray-300 rounded-lg overflow-hidden mb-4"
            >
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <motion.div 
                  className="w-full h-1 bg-nexq-green"
                  animate={{ top: [0, 250, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ position: 'absolute' }}
                />
                <p className="text-sm text-gray-500">Scanning...</p>
              </div>
            </motion.div>
          ) : (
            <div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
              <p className="text-sm text-gray-500">QR Scanner Ready</p>
            </div>
          )}
          <Button 
            variant="default" 
            className={`nexq-button-primary flex items-center ${isScanning ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={startScanning}
            disabled={isScanning}
          >
            <Scan className="mr-2 h-4 w-4" />
            {isScanning ? 'Scanning...' : 'Start Scanning'}
          </Button>
        </>
      )}
    </div>
  );
}
