import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { Building, MapPin, DollarSign, Eye } from 'lucide-react';

export default function ClientProperties() {
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
                                                 p.clientId === userProfile?.uid || 
                                                 p.assignedClients?.includes(userProfile?.uid)
                                               );

  if (loading) {
        return (
                <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>div>
                </div>div>
              );
  }
  
    return (
          <div className="space-y-6">
                <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900">My Properties</h1>h1>
                        <span className="text-sm text-gray-500">{clientProperties.length} properties</span>span>
                </div>div>
          
            {clientProperties.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                              <Building className="mx-auto h-12 w-12 text-gray-400" />
                              <h3 className="mt-2 text-sm font-medium text-gray-900">No properties assigned</h3>h3>
                              <p className="mt-1 text-sm text-gray-500">
                                          Contact your administrator to get properties assigned to your account.
                              </p>p>
                    </div>div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {clientProperties.map((property) => (
                                  <div key={property.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                                                <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                                                <Building className="h-16 w-16 text-white opacity-50" />
                                                </div>div>
                                                <div className="p-4">
                                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.name}</h3>h3>
                                                                <div className="space-y-2 text-sm text-gray-600">
                                                                                  <div className="flex items-center">
                                                                                                      <MapPin className="h-4 w-4 mr-2" />
                                                                                    {property.address || 'Address not specified'}
                                                                                    </div>div>
                                                                                  <div className="flex items-center">
                                                                                                      <DollarSign className="h-4 w-4 mr-2" />
                                                                                    {property.rentAmount ? `$${property.rentAmount.toLocaleString()}/mo` : 'N/A'}
                                                                                    </div>div>
                                                                </div>div>
                                                                <div className="mt-4">
                                                                                  <Link
                                                                                                        to={`/portal/properties/${property.id}`}
                                                                                                        className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                                                                      >
                                                                                                      <Eye className="h-4 w-4 mr-1" />
                                                                                                      View Details
                                                                                    </Link>Link>
                                                                </div>div>
                                                </div>div>
                                  </div>div>
                                ))}
                    </div>div>
                )}
          </div>div>
        );
}</div>
