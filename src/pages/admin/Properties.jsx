import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { Building, Plus, Edit2, Trash2 } from 'lucide-react';

export default function AdminProperties() {
    const { properties, fetchProperties, deleteProperty } = useData();
    const [loading, setLoading] = useState(true);

  useEffect(() => {
        fetchProperties().then(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
                await deleteProperty(id);
        }
  };

  if (loading) {
        return (
                <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>div>
                </div>div>
              );
  }
  
    return (
          <div className="space-y-6">
                <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">Properties</h1>h1>
                        <Link to="/admin/properties/new" className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                                  <Plus className="w-5 h-5" /> Add Property
                        </Link>Link>
                </div>div>
          
            {properties.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                              <Building className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                              <p className="text-gray-500 mb-4">No properties yet</p>p>
                              <Link to="/admin/properties/new" className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg">
                                          <Plus className="w-5 h-5" /> Add Your First Property
                              </Link>Link>
                    </div>div>
                  ) : (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                              <table className="w-full">
                                          <thead className="bg-gray-50 border-b border-gray-200">
                                                        <tr>
                                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Property</th>th>
                                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>th>
                                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>th>
                                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Occupancy</th>th>
                                                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>th>
                                                        </tr>tr>
                                          </thead>thead>
                                          <tbody className="divide-y divide-gray-200">
                                            {properties.map((property) => (
                                      <tr key={property.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4">
                                                                            <div className="font-medium text-gray-900">{property.name}</div>div>
                                                                            <div className="text-sm text-gray-500">{property.address}</div>div>
                                                        </td>td>
                                                        <td className="px-6 py-4 text-sm text-gray-500">{property.type}</td>td>
                                                        <td className="px-6 py-4 text-sm text-gray-500">{property.sqft?.toLocaleString()} SF</td>td>
                                                        <td className="px-6 py-4">
                                                                            <span className="text-sm font-medium text-emerald-600">{property.occupancy}%</span>span>
                                                        </td>td>
                                                        <td className="px-6 py-4 text-right space-x-2">
                                                                            <Link to={`/admin/properties/${property.id}/edit`} className="text-gray-400 hover:text-gray-600">
                                                                                                  <Edit2 className="w-5 h-5 inline" />
                                                                            </Link>Link>
                                                                            <button onClick={() => handleDelete(property.id)} className="text-gray-400 hover:text-red-600">
                                                                                                  <Trash2 className="w-5 h-5 inline" />
                                                                            </button>button>
                                                        </td>td>
                                      </tr>tr>
                                    ))}
                                          </tbody>tbody>
                              </table>table>
                    </div>div>
                )}
          </div>div>
        );
}</div>
