import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { Building, MapPin, DollarSign, Calendar, FileText, ArrowLeft } from 'lucide-react';

export default function PropertyDetail() {
  const { id } = useParams();
  const { properties, documents, fetchProperties, fetchDocuments } = useData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchProperties(), fetchDocuments()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const property = properties.find(p => p.id === id);
  const propertyDocs = documents.filter(d => d.propertyId === id);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Property not found</h2>
        <Link to="/portal/properties" className="text-blue-600 hover:underline mt-4 inline-block">
          Back to properties
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link to="/portal/properties" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">{property.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Property Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{property.address || 'Not specified'}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <DollarSign className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Monthly Rent</p>
                <p className="font-medium">{property.rentAmount ? `$${property.rentAmount.toLocaleString()}` : 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Documents</h2>
          {propertyDocs.length === 0 ? (
            <p className="text-gray-500 text-sm">No documents available</p>
          ) : (
            <ul className="space-y-3">
              {propertyDocs.map(doc => (
                <li key={doc.id} className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <span className="text-sm">{doc.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
