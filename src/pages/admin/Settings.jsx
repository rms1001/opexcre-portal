import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <SettingsIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">Portal settings and configuration options.</p>
        <p className="text-sm text-gray-400 mt-2">Manage notifications, branding, and portal preferences.</p>
      </div>
    </div>
  );
}
