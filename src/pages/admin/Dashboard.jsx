import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { Building, Users, FileText, TrendingUp, ArrowRight, Plus } from 'lucide-react';

function StatCard({ icon: Icon, title, value, subtitle, color }) {
  const colorClasses = {
    emerald: 'bg-emerald-50 text-emerald-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    amber: 'bg-amber-50 text-amber-600',
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-emerald-600 mt-1">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { userProfile } = useAuth();
  const { properties, clients, documents, loading } = useData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  const totalValue = properties.reduce((sum, p) => sum + (p.value || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {userProfile?.name || 'Admin'}</p>
        </div>
        <Link
          to="/admin/properties/new"
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Property
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Building}
          title="Total Properties"
          value={properties.length}
          subtitle="Active listings"
          color="emerald"
        />
        <StatCard
          icon={Users}
          title="Total Clients"
          value={clients.length}
          subtitle="Registered users"
          color="blue"
        />
        <StatCard
          icon={FileText}
          title="Documents"
          value={documents.length}
          subtitle="Files uploaded"
          color="purple"
        />
        <StatCard
          icon={TrendingUp}
          title="Portfolio Value"
          value={`$${(totalValue / 1000000).toFixed(1)}M`}
          subtitle="Total assets"
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Properties</h2>
            <Link to="/admin/properties" className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 text-sm">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {properties.slice(0, 5).map((property) => (
              <div key={property.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{property.name}</p>
                  <p className="text-sm text-gray-500">{property.address}</p>
                </div>
                <span className="text-sm font-medium text-emerald-600">
                  ${(property.value / 1000000).toFixed(1)}M
                </span>
              </div>
            ))}
            {properties.length === 0 && (
              <p className="text-gray-500 text-center py-4">No properties yet</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Clients</h2>
            <Link to="/admin/clients" className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 text-sm">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {clients.slice(0, 5).map((client) => (
              <div key={client.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{client.name}</p>
                  <p className="text-sm text-gray-500">{client.email}</p>
                </div>
                <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                  Active
                </span>
              </div>
            ))}
            {clients.length === 0 && (
              <p className="text-gray-500 text-center py-4">No clients yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
