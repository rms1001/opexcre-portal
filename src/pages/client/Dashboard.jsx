import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { Building, FileText, BarChart3 } from 'lucide-react';

export default function ClientDashboard() {
  const { userProfile } = useAuth();
  const { properties, documents, fetchProperties, fetchDocuments } = useData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchProperties(), fetchDocuments()]).then(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {userProfile?.name || 'Client'}</h1>
        <p className="text-gray-600">Access your properties, documents, and reports.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/portal/properties" className="bg-white rounded-xl border border-gray-200 p-6 hover:border-emerald-300 transition-colors">
          <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
            <Building className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Properties</h3>
          <p className="text-sm text-gray-500">{properties.length} properties assigned</p>
        </Link>

        <Link to="/portal/documents" className="bg-white rounded-xl border border-gray-200 p-6 hover:border-emerald-300 transition-colors">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Documents</h3>
          <p className="text-sm text-gray-500">{documents.length} documents available</p>
        </Link>

        <Link to="/portal/reports" className="bg-white rounded-xl border border-gray-200 p-6 hover:border-emerald-300 transition-colors">
          <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
            <BarChart3 className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Reports</h3>
          <p className="text-sm text-gray-500">View portfolio reports</p>
        </Link>
      </div>

      {properties.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Your Properties</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {properties.slice(0, 3).map((property) => (
              <Link key={property.id} to={`/portal/properties/${property.id}`} className="flex items-center gap-4 p-4 hover:bg-gray-50">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{property.name}</p>
                  <p className="text-sm text-gray-500">{property.address}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
