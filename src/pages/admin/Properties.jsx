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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
        <Link
          to="/admin/properties/new"
          className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Property
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Building className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No properties found.</p>
          <p className="text-sm text-gray-400 mt-2">Click "Add Property" to create your first property.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-100 relative">
                {property.imageUrl ? (
                  <img src={property.imageUrl} alt={property.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Building className="w-12 h-12 text-gray-300" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{property.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{property.address}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-emerald-600 font-medium">
                    ${property.value?.toLocaleString() || 'N/A'}
                  </span>
                  <div className="flex gap-2">
                    <Link
                      to={"/admin/properties/" + property.id + "/edit"}
                      className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(property.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
