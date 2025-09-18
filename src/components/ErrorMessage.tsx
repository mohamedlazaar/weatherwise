'use client';

import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  error: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorMessage({ 
  error, 
  onRetry, 
  className = '' 
}: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`bg-red-50 border border-red-200 rounded-lg p-6 text-center ${className}`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-4"
      >
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
      </motion.div>
      
      <h3 className="text-lg font-semibold text-red-800 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-red-600 mb-4">
        {error}
      </p>
      
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
}
