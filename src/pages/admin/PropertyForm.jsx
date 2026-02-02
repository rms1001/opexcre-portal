import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { ArrowLeft } from 'lucide-react';

export default function PropertyForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { properties, addProperty, updateProperty } = useData();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    type: 'Office',
    sqft: '',
    units: '',
    occupancy: '',
    rent: ''
  });

  useEffect(() => {
    if (isEditing && properties) {
      const property = properties.find(p => p.id === id);
      if (property) {
        setFormData({
          name: property.name || '',
          address: property.address || '',
          type: property.type || 'Office',
          sqft: property.sqft || '',
          units: property.units || '',
          occupancy: property.occupancy || '',
          rent: property.rent || ''
        });
      }
    }
  }, [id, isEditing, properties]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateProperty(id, formData);
      } else {
        await addProperty(formData);
      }
      navigate('/admin/properties');
    } catch (error) {
      console.error('Error saving property:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/admin/properties')} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Property' : 'Add New Property'}
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select name="type" value={formData.type} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
              <option value="Office">Office</option>
              <option value="Retail">Retail</option>
              <option value="Industrial">Industrial</option>
              <option value="Mixed Use">Mixed Use</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Square Feet</label>
            <input type="number" name="sqft" value={formData.sqft} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Units</label>
            <input type="number" name="units" value={formData.units} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={() => navigate('/admin/properties')} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">{isEditing ? 'Update' : 'Create'} Property</button>
        </div>
      </form>
    </div>
  );
}
