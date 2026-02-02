import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function AdminReports() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">Reports and analytics will be available here.</p>
        <p className="text-sm text-gray-400 mt-2">Track occupancy rates, revenue, and portfolio performance.</p>
      </div>
    </div>
  );
}
