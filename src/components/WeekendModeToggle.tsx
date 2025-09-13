'use client';

import React from 'react';

interface WeekendModeToggleProps {
  isWeekendMode: boolean;
  onToggle: (isWeekendMode: boolean) => void;
}

export const WeekendModeToggle: React.FC<WeekendModeToggleProps> = ({
  isWeekendMode,
  onToggle
}) => {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4">
        <div className="flex items-center space-x-6">
          {/* Weekday Mode */}
          <button
            onClick={() => onToggle(false)}
            className={`
              flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 transform
              ${!isWeekendMode 
                ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white shadow-lg scale-105' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-102'
              }
            `}
          >
            <div className="text-2xl">📅</div>
            <div className="text-left">
              <div className="font-semibold text-sm">Full Week</div>
              <div className="text-xs opacity-90">Monday - Sunday</div>
            </div>
          </button>

          {/* Divider */}
          <div className="w-px h-12 bg-gray-200" />

          {/* Weekend Mode */}
          <button
            onClick={() => onToggle(true)}
            className={`
              flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 transform
              ${isWeekendMode 
                ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white shadow-lg scale-105' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-102'
              }
            `}
          >
            <div className="text-2xl">🌈</div>
            <div className="text-left">
              <div className="font-semibold text-sm">Weekend Mode</div>
              <div className="text-xs opacity-90">Saturday & Sunday</div>
            </div>
          </button>
        </div>

        {/* Mode Description */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {isWeekendMode 
              ? '🎊 Focus on weekend activities and family time' 
              : '🎯 View your complete weekly schedule and tasks'
            }
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mt-3 flex items-center justify-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>Weekdays</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-pink-400" />
            <span>Weekends</span>
          </div>
        </div>
      </div>
    </div>
  );
};