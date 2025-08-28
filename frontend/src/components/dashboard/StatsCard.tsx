import React from 'react';

interface StatsCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: React.ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'yellow';
  progress?: number;
}

const colorClasses: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  yellow: 'bg-yellow-100 text-yellow-600'
};

const StatsCard: React.FC<StatsCardProps> = ({ title, value, subtitle, icon, color = 'blue', progress }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-2 rounded-full ${colorClasses[color]}`}>{icon}</div>
      </div>
      {progress !== undefined && (
        <div className="mt-3 h-2 bg-gray-100 rounded-full">
          <div
            className={
              'h-full rounded-full ' +
              (color === 'blue'
                ? 'bg-blue-500'
                : color === 'green'
                ? 'bg-green-500'
                : color === 'purple'
                ? 'bg-purple-500'
                : 'bg-yellow-500')
            }
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default StatsCard;
