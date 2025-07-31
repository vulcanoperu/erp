'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  subtitle?: string;
}

export default function MetricCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  iconColor = 'text-blue-600',
  iconBgColor = 'bg-blue-100',
  subtitle
}: MetricCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getChangePrefix = () => {
    if (change === undefined) return '';
    if (change > 0) return '+';
    return '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            <div className={clsx(
              "p-2 rounded-lg",
              iconBgColor
            )}>
              <Icon className={clsx("w-5 h-5", iconColor)} />
            </div>
          </div>
          
          <div className="flex items-end space-x-2">
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change !== undefined && (
              <div className={clsx(
                "flex items-center text-sm font-medium",
                getChangeColor()
              )}>
                <span>{getChangePrefix()}{change}%</span>
              </div>
            )}
          </div>
          
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}