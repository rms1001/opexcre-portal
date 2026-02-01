import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { Building, Users, FileText, TrendingUp, Plus, ArrowRight } from 'lucide-react';

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
                                <p className="text-sm text-gray-500 mb-1">{title}</p>p>
                                <p className="text-3xl font-bold text-gray-900">{value}</p>p>
                        {subtitle && <p className="text-sm text-emerald-600 mt-1">{subtitle}</p>p>}
                      </div>div>
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
                                <Icon className="w-6 h-6" />
                      </div>div>
              </div>div>
        </div>div>
      );
}

export default function AdminDashboard() {
    const { userProfile } = useAuth();
    const { fetchProperties, fetchClients, fetchDocuments, properties, clients, documents } = useData();
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
          async function loadData() {
                  await Promise.all([fetchProperties(), fetchClients(), fetchDocuments()]);
                  setLoading(false);
          }
          loadData();
    }, []);
  
    const avgOccupancy = properties.length > 0
          ? (properties.reduce((sum, p) => sum + (p.occupancy || 0), 0) / properties.length).toFixed(1)
          : 0;
  
    if (loading) {
          return (
                  <div className="flex items-center justify-center h-64">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>div>
                  </div>div>
                );
    }
  
    return (
          <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                                  <h1 className="text-2xl font-bold text-gray-900">Welcome back, {userProfile?.name || 'Admin'}</h1>h1>
                                  <p className="text-gray-600">Here's what's happening with your portfolio today.</p>p>
                        </div>div>
                        <Link to="/admin/properties/new" className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                                  <Plus className="w-5 h-5" />
                                  Add Property
                        </Link>Link>
                </div>div>
          
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard icon={Building} title="Total Properties" value={properties.length} subtitle={properties.length > 0 ? "Under management" : null} color="emerald" />
                        <StatCard icon={Users} title="Active Clients" value={clients.length} color="blue" />
                        <StatCard icon={FileText} title="Documents" value={documents.length} color="purple" />
                        <StatCard icon={TrendingUp} title="Avg Occupancy" value={`${avgOccupancy}%`} color="amber" />
                </div>div>
          
                <div className="bg-white rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                  <h2 className="text-lg font-semibold text-gray-900">Recent Properties</h2>h2>
                                  <Link to="/admin/properties" className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                                              View all <ArrowRight className="w-4 h-4" />
                                  </Link>Link>
                        </div>div>
                        <div className="divide-y divide-gray-200">
                          {properties.length === 0 ? (
                        <div className="p-12 text-center">
                                      <Building className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                      <p className="text-gray-500 mb-4">No properties yet</p>p>
                                      <Link to="/admin/properties/new" className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                                                      <Plus className="w-5 h-5" />
                                                      Add Your First Property
                                      </Link>Link>
                        </div>div>
                      ) : (
                        properties.slice(0, 5).map((property) => (
                                        <div key={property.id} className="flex items-center gap-4 p-4 hover:bg-gray-50">
                                                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                                                          <Building className="w-8 h-8 text-gray-400" />
                                                        </div>div>
                                                        <div className="flex-1 min-w-0">
                                                                          <h3 className="font-medium text-gray-900 truncate">{property.name}</h3>h3>
                                                                          <p className="text-sm text-gray-500 truncate">{property.address}</p>p>
                                                        </div>div>
                                                        <div className="text-right">
                                                                          <p className="text-sm font-medium text-gray-900">{property.sqft?.toLocaleString()} SF</p>p>
                                                                          <p className="text-sm text-emerald-600">{property.occupancy}% occupied</p>p>
                                                        </div>div>
                                        </div>div>
                                      ))
                      )}
                        </div>div>
                </div>div>
          </div>div>
        );
}</div>
