import React, { useEffect, useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { BarChart3, TrendingUp, DollarSign, Building } from 'lucide-react';

export default function ClientReports() {
    const { userProfile } = useAuth();
    const { properties, fetchProperties } = useData();
    const [loading, setLoading] = useState(true);

  useEffect(() => {
        const loadData = async () => {
                await fetchProperties();
                setLoading(false);
        };
        loadData();
  }, []);

  const clientProperties = properties.filter(p => 
                                                 p.clientId === userProfile?.uid || p.assignedClients?.includes(userProfile?.uid)
                                               );

  const totalRent = clientProperties.reduce((sum, p) => sum + (p.rentAmount || 0), 0);

  if (loading) {
        return (
                <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>div>
                </div>div>
              );
  }
  
    return (
          <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Reports</h1>h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg shadow p-6">
                                  <div className="flex items-center">
                                              <div className="p-3 bg-blue-100 rounded-lg">
                                                            <Building className="h-6 w-6 text-blue-600" />
                                              </div>div>
                                              <div className="ml-4">
                                                            <p className="text-sm text-gray-500">Properties</p>p>
                                                            <p className="text-2xl font-bold">{clientProperties.length}</p>p>
                                              </div>div>
                                  </div>div>
                        </div>div>
                        <div className="bg-white rounded-lg shadow p-6">
                                  <div className="flex items-center">
                                              <div className="p-3 bg-green-100 rounded-lg">
                                                            <DollarSign className="h-6 w-6 text-green-600" />
                                              </div>div>
                                              <div className="ml-4">
                                                            <p className="text-sm text-gray-500">Monthly Rent</p>p>
                                                            <p className="text-2xl font-bold">${totalRent.toLocaleString()}</p>p>
                                              </div>div>
                                  </div>div>
                        </div>div>
                        <div className="bg-white rounded-lg shadow p-6">
                                  <div className="flex items-center">
                                              <div className="p-3 bg-purple-100 rounded-lg">
                                                            <TrendingUp className="h-6 w-6 text-purple-600" />
                                              </div>div>
                                              <div className="ml-4">
                                                            <p className="text-sm text-gray-500">Annual</p>p>
                                                            <p className="text-2xl font-bold">${(totalRent * 12).toLocaleString()}</p>p>
                                              </div>div>
                                  </div>div>
                        </div>div>
                </div>div>
                <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Property Summary</h2>h2>
                  {clientProperties.length === 0 ? (
                      <p className="text-gray-500">No properties to display.</p>p>
                    ) : (
                      <table className="min-w-full divide-y divide-gray-200">
                                  <thead>
                                                <tr>
                                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Property</th>th>
                                                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Rent</th>th>
                                                </tr>tr>
                                  </thead>thead>
                                  <tbody className="divide-y divide-gray-200">
                                    {clientProperties.map(p => (
                                        <tr key={p.id}>
                                                          <td className="px-4 py-3">{p.name}</td>td>
                                                          <td className="px-4 py-3 text-right">${(p.rentAmount || 0).toLocaleString()}</td>td>
                                        </tr>tr>
                                      ))}
                                  </tbody>tbody>
                      </table>table>
                        )}
                </div>div>
          </div>div>
        );
}</div>
