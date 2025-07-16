'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'ENEL', value: 2, color: '#3B82F6' },
  { name: 'ESSALUD', value: 1, color: '#10B981' },
  { name: 'OSINERGMIN', value: 1, color: '#F59E0B' },
  { name: 'SUNASS', value: 1, color: '#8B5CF6' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel rounded-xl p-3 border-0">
        <p className="text-katrix-pearl-bush font-medium">
          {payload[0].name}: {payload[0].value} servicios
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex justify-center space-x-6 mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center space-x-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-katrix-pearl-bush/80 text-sm">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export function DistributionChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}