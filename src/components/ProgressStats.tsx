'use client';

import React from 'react';
import { Task, Weekday } from '@/types';
import { WEEKDAYS } from '@/lib/dateUtils';
import { getWeekendMotivation, getWeekdayMotivation } from '@/lib/weekendUtils';

interface ProgressStatsProps {
  tasks: Task[];
  selectedWeekday: Weekday;
  isWeekendMode: boolean;
}

export const ProgressStats: React.FC<ProgressStatsProps> = ({
  tasks,
  selectedWeekday,
  isWeekendMode
}) => {
  // Calculate overall stats
  const allTasks = tasks.filter(task => isWeekendMode ? task.isWeekend : true);
  const completedTasks = allTasks.filter(task => task.completed);
  const completionRate = allTasks.length > 0 ? Math.round((completedTasks.length / allTasks.length) * 100) : 0;

  // Calculate today's stats
  const todayTasks = tasks.filter(task => task.weekday === selectedWeekday);
  const todayCompleted = todayTasks.filter(task => task.completed);
  const todayRate = todayTasks.length > 0 ? Math.round((todayCompleted.length / todayTasks.length) * 100) : 0;

  // Get weekly breakdown
  const weeklyStats = WEEKDAYS.map(day => {
    const dayTasks = tasks.filter(task => task.weekday === day.key);
    const dayCompleted = dayTasks.filter(task => task.completed);
    const dayRate = dayTasks.length > 0 ? Math.round((dayCompleted.length / dayTasks.length) * 100) : 0;
    
    return {
      day: day.key,
      label: day.shortLabel,
      isWeekend: day.isWeekend,
      gradient: day.gradient,
      total: dayTasks.length,
      completed: dayCompleted.length,
      rate: dayRate
    };
  }).filter(stat => isWeekendMode ? stat.isWeekend : true);

  // Get motivation message
  const isSelectedWeekend = selectedWeekday === 'saturday' || selectedWeekday === 'sunday';
  const motivationMessage = isSelectedWeekend 
    ? getWeekendMotivation(todayCompleted.length)
    : getWeekdayMotivation(todayCompleted.length);

  // Get achievement level
  const getAchievementLevel = (rate: number) => {
    if (rate >= 90) return { emoji: '🏆', label: 'Champion', color: 'text-yellow-600 bg-yellow-100' };
    if (rate >= 75) return { emoji: '🥇', label: 'Excellent', color: 'text-green-600 bg-green-100' };
    if (rate >= 50) return { emoji: '🎯', label: 'Good', color: 'text-blue-600 bg-blue-100' };
    if (rate >= 25) return { emoji: '📈', label: 'Progress', color: 'text-purple-600 bg-purple-100' };
    return { emoji: '🌱', label: 'Starting', color: 'text-gray-600 bg-gray-100' };
  };

  const todayAchievement = getAchievementLevel(todayRate);
  const overallAchievement = getAchievementLevel(completionRate);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Today's Progress */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 flex items-center justify-center">
            <span className="text-3xl">{todayAchievement.emoji}</span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {selectedWeekday.charAt(0).toUpperCase() + selectedWeekday.slice(1)} Progress
          </h3>
          
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {todayRate}%
          </div>
          
          <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${todayAchievement.color}`}>
            <span>{todayAchievement.emoji}</span>
            <span>{todayAchievement.label}</span>
          </div>
          
          <p className="text-sm text-gray-600 mt-3">
            {todayCompleted.length} of {todayTasks.length} tasks completed
          </p>
          
          {/* Today's Progress Bar */}
          <div className="mt-4 w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 transition-all duration-700 ease-out"
              style={{ width: `${todayRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 flex items-center justify-center">
            <span className="text-3xl">{overallAchievement.emoji}</span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {isWeekendMode ? 'Weekend' : 'Week'} Overview
          </h3>
          
          <div className="text-3xl font-bold text-green-600 mb-2">
            {completionRate}%
          </div>
          
          <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${overallAchievement.color}`}>
            <span>{overallAchievement.emoji}</span>
            <span>{overallAchievement.label}</span>
          </div>
          
          <p className="text-sm text-gray-600 mt-3">
            {completedTasks.length} of {allTasks.length} total tasks
          </p>
          
          {/* Overall Progress Bar */}
          <div className="mt-4 w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 transition-all duration-700 ease-out"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Motivation & Weekly Breakdown */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
        {/* Motivation Message */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 flex items-center justify-center">
            <span className="text-2xl">✨</span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Daily Motivation
          </h3>
          
          <p className="text-sm text-purple-600 font-medium">
            {motivationMessage}
          </p>
        </div>

        {/* Mini Weekly Breakdown */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            {isWeekendMode ? 'Weekend Days' : 'Week at a Glance'}
          </h4>
          
          <div className="space-y-2">
            {weeklyStats.map((stat) => (
              <div
                key={stat.day}
                className={`
                  flex items-center justify-between p-2 rounded-lg transition-all duration-200
                  ${stat.day === selectedWeekday 
                    ? 'bg-purple-100 border border-purple-200' 
                    : 'bg-gray-50 hover:bg-gray-100'
                  }
                `}
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${stat.gradient.replace('bg-gradient-to-br', 'bg-gradient-to-r')}`} />
                  <span className="text-sm font-medium text-gray-700">
                    {stat.label}
                  </span>
                  {stat.isWeekend && (
                    <span className="text-xs">{stat.day === 'saturday' ? '🎉' : '😌'}</span>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    {stat.completed}/{stat.total}
                  </span>
                  <div className="w-8 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 transition-all duration-300"
                      style={{ width: `${stat.rate}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        {allTasks.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-green-50 text-green-700 p-2 rounded">
                <div className="font-bold">{completedTasks.length}</div>
                <div>Done</div>
              </div>
              <div className="bg-blue-50 text-blue-700 p-2 rounded">
                <div className="font-bold">{allTasks.length - completedTasks.length}</div>
                <div>To Do</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};