import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { ArrowLeft, Save } from 'lucide-react';

export default function PropertyForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { properties, addProperty, updateProperty } = useData();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: '', address: '', type: 'Office', sqft: '', occupancy: '', floors: '' });

  useEffect(() => {
        if (id) {
                const property = properties.find(p => p.id === id);
                if (property) setForm(property);
        }
  }, [id, properties]);

  const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
                if (id) {
                          await updateProperty(id, form);
                } else {
                          await addProperty({ ...form, sqft: Number(form.sqft), occupancy: Number(form.occupancy), floors: Number(form.floors) });
                }
                navigate('/admin/properties');
        } catch (error) {
                console.error('Error saving property:', error);
        }
        setLoading(false);
  };

  return (
        <div className="max-w-2xl mx-auto">
              <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
                      <ArrowLeft className="w-5 h-5" /> Back
              </button>button>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <h1 className="text-2xl font-bold text-gray-900 mb-6">{id ? 'Edit Property' : 'Add Property'}</h1>h1>
                      <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Property Name</label>label>
                                            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                                </div>div>
                                <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>label>
                                            <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                                </div>div>
                                <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>label>
                                                          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                                                                          <option>Office</option>option><option>Retail</option>option><option>Industrial</option>option><option>Mixed Use</option>option>
                                                          </select>select>
                                            </div>div>
                                            <div>
                                                          <label className="block text-sm font-medium text-gray-700 mb-1">Square Feet</label>label>
                                                          <input type="number" value={form.sqft} onChange={(e) => setForm({ ...form, sqft: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                                            </div>div>
                                </div>div>
                                <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                          <label className="block text-sm font-medium text-gray-700 mb-1">Occupancy %</label>label>
                                                          <input type="number" max="100" value={form.occupancy} onChange={(e) => setForm({ ...form, occupancy: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                                            </div>div>
                                            <div>
                                                          <label className="block text-sm font-medium text-gray-700 mb-1">Floors</label>label>
                                                          <input type="number" value={form.floors} onChange={(e) => setForm({ ...form, floors: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                                            </div>div>
                                </div>div>
                                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50">
                                            <Save className="w-5 h-5" /> {loading ? 'Saving...' : 'Save Property'}
                                </button>button>
                      </form>form>
              </div>div>
        </div>div>
      );
}</div>
