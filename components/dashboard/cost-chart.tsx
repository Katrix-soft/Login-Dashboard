'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'ENEL', value: 1250, color: '#3B82F6' },
  { name: 'ESSALUD', value: 2100, color: '#10B981' },
  { name: 'OSINERGMIN', value: 890, color: '#F59E0B' },
  { name: 'SUNASS', value: 650, color: '#8B5CF6' },
];

export function CostChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(230, 223, 208, 0.1)" />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#e6dfd0', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#e6dfd0', fontSize: 12 }}
            tickFormatter={(value) => `S/ ${value}`}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}